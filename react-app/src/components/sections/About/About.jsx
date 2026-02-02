import { useRef, useMemo, useState, useEffect } from 'react';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import styles from './About.module.css';

export function About() {
    const containerRef = useRef(null);
    const [highlightedWords, setHighlightedWords] = useState(new Set());

    const { isIntersecting } = useIntersectionObserver(containerRef, {
        threshold: 0.3,
        triggerOnce: true
    });

    const text = "I'm pursuing my Master's in Computer Science at the University of San Francisco, graduating May 2026. I build at the intersection of AI systems and security engineering. From real-time AI commentary that placed at hackathons, to container security tools contributing to Google's open source ecosystem. Currently in San Francisco, focused on production-grade systems that ship.";

    const words = useMemo(() => {
        return text.split(' ').map((word, index) => ({
            word,
            index
        }));
    }, []);

    // Highlight all words when section enters viewport
    useEffect(() => {
        if (!isIntersecting) return;

        const timeouts = [];
        words.forEach((_, index) => {
            const timeout = setTimeout(() => {
                setHighlightedWords(prev => new Set([...prev, index]));
            }, index * 50); // Staggered reveal
            timeouts.push(timeout);
        });

        return () => timeouts.forEach(clearTimeout);
    }, [isIntersecting, words]);

    return (
        <section className={styles.aboutScene} id="about">
            <div className={styles.sticky}>
                <div className={styles.section}>
                    <div ref={containerRef} className={styles.content}>
                        <p className={styles.text}>
                            {words.map(({ word, index }) => (
                                <span
                                    key={index}
                                    className={`${styles.word} ${highlightedWords.has(index) ? styles.highlighted : ''}`}
                                    style={{ '--word-index': index }}
                                >
                                    {word}{' '}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
