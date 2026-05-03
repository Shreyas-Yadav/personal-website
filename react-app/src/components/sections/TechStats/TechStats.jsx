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

function MarqueeRow({ items, reverse = false, duration = '45s' }) {
    const content = [...items, ...items];
    const getSkillStyle = (color) => {
        const colors = Array.isArray(color) ? color : [color];
        const fill = colors.length > 1
            ? `linear-gradient(135deg, ${colors.join(', ')})`
            : colors[0];

        return {
            '--skill-color': colors[0],
            '--skill-fill': fill
        };
    };

    return (
        <div className={styles.marquee}>
            <div
                className={`${styles.marqueeContent} ${reverse ? styles.marqueeReverse : ''}`}
                style={{ animationDuration: duration }}
            >
                {content.map((skill, index) => (
                    <span
                        key={`${skill.name}-${index}`}
                        className={styles.skillItem}
                        style={getSkillStyle(skill.color)}
                    >
                        {skill.name}
                    </span>
                ))}
            </div>
        </div>
    );
}

export function TechStats() {
    const row1 = skills.slice(0, 9);
    const row2 = skills.slice(9, 18);
    const row3 = skills.slice(18);

    return (
        <section className={styles.techStatsScene} id="techStatsScene">
            <div className={styles.sticky}>
                {/* Skills Marquee */}
                <div className={styles.skillsSection}>
                    <div className={styles.skillsLabel}>Technologies</div>
                    <MarqueeRow items={row1} duration="45s" />
                    <MarqueeRow items={row2} reverse duration="38s" />
                    <MarqueeRow items={row3} duration="52s" />
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
