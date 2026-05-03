import { skills } from '../../../data/skills';
import styles from './TechStats.module.css';

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
        <section className={styles.techStatsScene} id="tech">
            <div className={styles.sticky}>
                <div className={styles.skillsSection}>
                    <div className={styles.skillsLabel}>Technologies</div>
                    <MarqueeRow items={row1} duration="45s" />
                    <MarqueeRow items={row2} reverse duration="38s" />
                    <MarqueeRow items={row3} duration="52s" />
                </div>
            </div>
        </section>
    );
}
