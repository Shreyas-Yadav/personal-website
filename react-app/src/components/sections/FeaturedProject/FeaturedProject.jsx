import { useState } from 'react';
import { useIsMobile } from '../../../hooks/useMediaQuery';
import { useCursorHover } from '../../../context/useCursor';
import styles from './FeaturedProject.module.css';

function FeaturedProjectRow({ project }) {
    const [expanded, setExpanded] = useState(false);
    const isMobile = useIsMobile();
    const cursorHoverProps = useCursorHover();

    const handleMouseEnter = () => { setExpanded(true); cursorHoverProps.onMouseEnter(); };
    const handleMouseLeave = () => { setExpanded(false); cursorHoverProps.onMouseLeave(); };
    const toggleExpanded = () => setExpanded(prev => !prev);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleExpanded();
        }
    };

    return (
        <li
            className={`${styles.row} ${expanded ? styles.expanded : ''}`}
            onMouseEnter={isMobile ? undefined : handleMouseEnter}
            onMouseLeave={isMobile ? undefined : handleMouseLeave}
        >
            {/* Collapsed summary */}
            <div
                className={styles.summary}
                role="button"
                tabIndex={0}
                aria-expanded={expanded}
                onClick={toggleExpanded}
                onKeyDown={handleKeyDown}
            >
                <span className={styles.number}>{project.number}</span>
                <span className={styles.title}>{project.title}</span>
                {(project.award || project.badges?.length > 0) && (
                    <div className={styles.badgeGroup}>
                        {project.award && (
                            <div className={styles.awardBadge}>
                                <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                                {project.award.text}
                            </div>
                        )}
                        {project.badges?.map(badge => (
                            <div key={badge} className={styles.extraBadge}>{badge}</div>
                        ))}
                    </div>
                )}
                <span className={styles.chevron} aria-hidden="true" />
            </div>

            {/* Expandable detail */}
            <div className={styles.expandWrap}>
                <div className={styles.expandInner}>
                    <p className={styles.description}>{project.description}</p>
                    {project.tech?.length > 0 && (
                        <div className={styles.techPills}>
                            {project.tech.map(tech => (
                                <span key={tech} className={styles.techPill}>{tech}</span>
                            ))}
                        </div>
                    )}
                    {project.repoUrl && (
                        <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.sourceLink}
                            onClick={e => e.stopPropagation()}
                        >
                            View Source
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="7" y1="17" x2="17" y2="7" />
                                <polyline points="7 7 17 7 17 17" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </li>
    );
}

export function FeaturedProjects({ projects }) {
    return (
        <section className={styles.scene} id="work">
            <div className={styles.sectionTitle}>Featured Projects</div>
            <ul className={styles.list}>
                {projects.map(project => (
                    <FeaturedProjectRow key={project.id} project={project} />
                ))}
            </ul>
        </section>
    );
}
