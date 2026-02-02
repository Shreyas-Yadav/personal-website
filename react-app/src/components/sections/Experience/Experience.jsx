import { useRef } from 'react';
import { experience } from '../../../data/experience';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import styles from './Experience.module.css';

function ExperienceCard({ role, index }) {
    const cardRef = useRef(null);
    const { isIntersecting } = useIntersectionObserver(cardRef, {
        threshold: 0.2,
        triggerOnce: true
    });

    return (
        <div
            ref={cardRef}
            className={styles.card}
            style={{
                opacity: isIntersecting ? 1 : 0,
                transform: isIntersecting ? 'translateX(0)' : 'translateX(20px)',
                transition: `all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.1}s`
            }}
        >
            <div className={styles.header}>
                <div className={styles.role}>{role.role}</div>
            </div>

            <div className={styles.subheader}>
                <span className={styles.company}>{role.company}</span>
                <span className={styles.location}>{role.location}</span>
            </div>

            <ul className={styles.description}>
                {role.description.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>

            <div className={styles.tags}>
                {role.tech.map(tech => (
                    <span key={tech} className={styles.tag}>
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    );
}

export function Experience() {
    return (
        <section className={styles.experienceScene} id="experience">
            <div className={styles.title}>Experience</div>
            <div className={styles.timeline}>
                {experience.map((role, index) => (
                    <ExperienceCard key={role.id} role={role} index={index} />
                ))}
            </div>
        </section>
    );
}
