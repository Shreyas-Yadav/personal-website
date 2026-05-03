import { useState } from 'react';
import { experience } from '../../../data/experience';
import { useIsMobile } from '../../../hooks/useMediaQuery';
import { useCursorHover } from '../../../context/CursorContext';
import styles from './Experience.module.css';

function ExperienceRow({ role, index }) {
    const [expanded, setExpanded] = useState(false);
    const isMobile = useIsMobile();
    const cursorHoverProps = useCursorHover();

    const handleMouseEnter = () => { setExpanded(true); cursorHoverProps.onMouseEnter(); };
    const handleMouseLeave = () => { setExpanded(false); cursorHoverProps.onMouseLeave(); };

    return (
        <li
            className={`${styles.row} ${expanded ? styles.expanded : ''}`}
            onMouseEnter={isMobile ? undefined : handleMouseEnter}
            onMouseLeave={isMobile ? undefined : handleMouseLeave}
            onClick={isMobile ? () => setExpanded(prev => !prev) : undefined}
        >
            <div className={styles.summary}>
                <span className={styles.number}>
                    {String(index + 1).padStart(2, '0')}
                </span>
                <span className={styles.titleWrap}>
                    {role.role}
                    {role.period.includes('Present') && (
                        <span className={styles.currentBadge}>Current</span>
                    )}
                </span>
                <span className={styles.company}>{role.company}</span>
            </div>

            <div className={styles.expandWrap}>
                <div className={styles.expandInner}>
                    <p className={styles.meta}>{role.location} · {role.period}</p>
                    <ul className={styles.description}>
                        {role.description.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                    <div className={styles.tags}>
                        {role.tech.map(tech => (
                            <span key={tech} className={styles.tag}>{tech}</span>
                        ))}
                    </div>
                </div>
            </div>
        </li>
    );
}

export function Experience() {
    return (
        <section className={styles.scene} id="experience">
            <div className={styles.sectionTitle}>Experience</div>
            <ul className={styles.list}>
                {experience.map((role, index) => (
                    <ExperienceRow key={role.id} role={role} index={index} />
                ))}
            </ul>
        </section>
    );
}
