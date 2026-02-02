import { useRef } from 'react';
import { skills, stats } from '../../../data/skills';
import { useCounterAnimation } from '../../../hooks/useCounterAnimation';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import styles from './TechStats.module.css';

function StatItem({ stat }) {
    const ref = useRef(null);
    const { isIntersecting } = useIntersectionObserver(ref, {
        threshold: 0.1,
        triggerOnce: false
    });

    const { displayValue } = useCounterAnimation(
        stat.value,
        isIntersecting,
        stat.decimals
    );

    const colorClass = stat.color === 'green' ? styles.green :
        stat.color === 'purple' ? styles.purple :
            stat.color === 'orange' ? styles.orange : '';

    return (
        <div ref={ref} className={styles.statItem}>
            <div className={`${styles.statNumber} ${colorClass}`}>
                {stat.displayText || displayValue}{stat.suffix || ''}
            </div>
            <div className={styles.statLabel}>{stat.label}</div>
        </div>
    );
}

export function TechStats() {
    // Duplicate skills for seamless marquee loop
    const marqueeContent = [...skills, ...skills];

    return (
        <section className={styles.techStatsScene} id="techStatsScene">
            <div className={styles.sticky}>
                {/* Skills Marquee */}
                <div className={styles.skillsSection}>
                    <div className={styles.skillsLabel}>Technologies</div>
                    <div className={styles.marquee}>
                        <div className={styles.marqueeContent}>
                            {marqueeContent.map((skill, index) => (
                                <span
                                    key={`${skill.name}-${index}`}
                                    className={styles.skillItem}
                                    style={{ '--skill-color': skill.color }}
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className={styles.statsSection}>
                    <div className={styles.statsGrid}>
                        {stats.map(stat => (
                            <StatItem key={stat.id} stat={stat} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
