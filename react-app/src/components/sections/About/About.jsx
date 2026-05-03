import { useRef } from 'react';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import styles from './About.module.css';

const focusAreas = [
    {
        label: 'Now',
        text: 'MS Computer Science candidate at the University of San Francisco and Teaching Assistant for systems foundations.'
    },
    {
        label: 'Focus',
        text: 'Backend systems, distributed computing, REST APIs, microservices, concurrency, and cloud infrastructure.'
    },
    {
        label: 'Proof',
        text: 'Built a distributed MapReduce engine, AWS EKS deployments, AI video learning workflows, and production POS systems.'
    }
];

export function About() {
    const containerRef = useRef(null);
    const { isIntersecting } = useIntersectionObserver(containerRef, {
        threshold: 0.25,
        triggerOnce: true
    });

    return (
        <section className={styles.aboutScene} id="about">
            <div
                ref={containerRef}
                className={`${styles.section} ${isIntersecting ? styles.visible : ''}`}
            >
                <p className={styles.kicker}>About</p>
                <h2 className={styles.title}>
                    Backend-focused engineer building scalable systems from infrastructure to application logic.
                </h2>
                <p className={styles.lead}>
                    My resume centers on distributed systems, cloud infrastructure, and production backend
                    work: custom MapReduce orchestration in Go, Spring Boot and FastAPI services, AWS
                    deployments, and AI-powered workflows using LLMs, RAG, embeddings, and vector databases.
                </p>
                <div className={styles.focusGrid}>
                    {focusAreas.map(item => (
                        <div key={item.label} className={styles.focusItem}>
                            <span className={styles.focusLabel}>{item.label}</span>
                            <p>{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
