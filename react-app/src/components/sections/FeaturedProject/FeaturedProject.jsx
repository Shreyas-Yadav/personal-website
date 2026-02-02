import { useRef, useEffect, useState, useMemo } from 'react';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import { useMousePosition } from '../../../hooks/useMousePosition';
import { useIsTablet } from '../../../hooks/useMediaQuery';
import { useCursorHover } from '../../../context/CursorContext';
import styles from './FeaturedProject.module.css';

function ParallaxVisual({ icon, isVisible }) {
    const { smoothPosition } = useMousePosition(0.08);
    const containerRef = useRef(null);
    const [transform, setTransform] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (smoothPosition.x - centerX) / rect.width;
        const deltaY = (smoothPosition.y - centerY) / rect.height;

        setTransform({
            x: deltaX * 20,
            y: deltaY * 20
        });
    }, [smoothPosition]);

    return (
        <div ref={containerRef} className={styles.projectVisual}>
            <div
                className={styles.visualLayer1}
                style={{
                    transform: `translateZ(0px) rotateX(${-transform.y * 0.5}deg) rotateY(${transform.x * 0.5}deg)`
                }}
            />
            <div
                className={styles.visualLayer2}
                style={{
                    transform: `translateZ(50px) rotateX(${-transform.y * 0.8}deg) rotateY(${transform.x * 0.8}deg)`
                }}
            />
            <div
                className={styles.visualLayer3}
                style={{
                    transform: `translateZ(100px) rotateX(${-transform.y}deg) rotateY(${transform.x}deg)`
                }}
            >
                <span className={`${styles.visualIcon} ${isVisible ? styles.visible : ''}`}>
                    {icon}
                </span>
            </div>
        </div>
    );
}

function TerminalVisual({ lines, isVisible }) {
    const [visibleLines, setVisibleLines] = useState([]);

    useEffect(() => {
        if (!isVisible) {
            setVisibleLines([]);
            return;
        }

        const timeouts = [];
        lines.forEach((line, index) => {
            const timeout = setTimeout(() => {
                setVisibleLines(prev => [...prev, index]);
            }, line.delay || index * 400);
            timeouts.push(timeout);
        });

        return () => timeouts.forEach(clearTimeout);
    }, [isVisible, lines]);

    return (
        <div className={`${styles.terminalVisual} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.terminalHeader}>
                <span className={`${styles.terminalDot} ${styles.red}`} />
                <span className={`${styles.terminalDot} ${styles.yellow}`} />
                <span className={`${styles.terminalDot} ${styles.green}`} />
            </div>
            <div className={styles.terminalBody}>
                {lines.map((line, index) => (
                    <div
                        key={index}
                        className={`${styles.terminalLine} ${visibleLines.includes(index) ? styles.visible : ''}`}
                    >
                        {line.prefix === 'green' && <span className={styles.tGreen}>$</span>}
                        {line.color === 'dim' ? (
                            <span className={styles.tDim}>{line.text}</span>
                        ) : line.color === 'orange' ? (
                            <span className={styles.tOrange}>{line.text}</span>
                        ) : (
                            <span>{line.text}</span>
                        )}
                        {line.suffix && (
                            <span className={line.suffix.color === 'blue' ? styles.tBlue : line.suffix.color === 'dim' ? styles.tDim : ''}>
                                {line.suffix.text}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function FeaturedProject({ project, isFirst }) {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const cursorHoverProps = useCursorHover();
    const isTablet = useIsTablet();

    const { isIntersecting } = useIntersectionObserver(contentRef, {
        threshold: 0.3,
        triggerOnce: true
    });

    // Split title into characters
    const titleChars = useMemo(() => {
        let charIndex = 0;
        return project.title.split('').map((char, i) => {
            if (char === ' ') {
                return { char: '\u00A0', index: i, charIndex: -1 };
            }
            const result = { char, index: i, charIndex };
            charIndex++;
            return result;
        });
    }, [project.title]);

    return (
        <section
            ref={sectionRef}
            className={styles.scene}
            id={isFirst ? 'work' : undefined}
            data-project={project.number}
        >
            <div className={styles.sceneSticky}>
                <div className={styles.projectScene}>
                    <span className={styles.projectNumber}>{project.number}</span>
                    <div ref={contentRef} className={styles.projectContent}>
                        {project.award && (
                            <div className={`${styles.awardBadge} ${isIntersecting ? styles.visible : ''}`}>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                                {project.award.text}
                            </div>
                        )}
                        <div className={`${styles.projectLabel} ${isIntersecting ? styles.visible : ''}`}>
                            {project.label}
                        </div>
                        <h2 className={`${styles.projectTitle} ${isIntersecting ? styles.visible : ''}`}>
                            {titleChars.map(({ char, index, charIndex }) => (
                                <span
                                    key={index}
                                    className={styles.char}
                                    style={{ '--char-index': charIndex >= 0 ? charIndex : 0 }}
                                >
                                    {char}
                                </span>
                            ))}
                        </h2>
                        <p className={`${styles.projectDescription} ${isIntersecting ? styles.visible : ''}`}>
                            {project.description}
                        </p>
                        <div className={`${styles.projectTech} ${isIntersecting ? styles.visible : ''}`}>
                            {project.tech.map(tech => (
                                <span
                                    key={tech}
                                    className={styles.techItem}
                                    {...cursorHoverProps}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Visual - controlled by CSS responsiveness */}
                    {project.visual.type === 'parallax' && (
                        <ParallaxVisual
                            icon={project.visual.icon}
                            isVisible={isIntersecting}
                        />
                    )}
                    {project.visual.type === 'terminal' && (
                        <TerminalVisual
                            lines={project.visual.lines}
                            isVisible={isIntersecting}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
