import { useState } from 'react';
import { galleryProjects } from '../../../data/projects';
import { useIsMobile } from '../../../hooks/useMediaQuery';
import { useCursorHover } from '../../../context/CursorContext';
import styles from './MagneticGallery.module.css';

function ProjectRow({ project, index }) {
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
            {/* Collapsed summary */}
            <div className={styles.summary}>
                <span className={styles.number}>
                    {String(index + 1).padStart(2, '0')}
                </span>
                <span className={styles.title}>{project.title}</span>
                <span className={styles.primaryTag}>{project.domain || project.tags[0]}</span>
            </div>

            {/* Expandable detail */}
            <div className={styles.expandWrap}>
                <div className={styles.expandInner}>
                    <p className={styles.description}>{project.description}</p>
                    <div className={styles.footer}>
                        <div className={styles.tags}>
                            {project.tags.map(tag => (
                                <span key={tag} className={styles.tag}>{tag}</span>
                            ))}
                        </div>
                        {project.repoUrl && (
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.repoLink}
                                onClick={e => e.stopPropagation()}
                            >
                                View Repo
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="7" y1="17" x2="17" y2="7" />
                                    <polyline points="7 7 17 7 17 17" />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </li>
    );
}

export function MagneticGallery() {
    return (
        <section className={styles.scene} id="projects">
            <div className={styles.sectionTitle}>Projects</div>
            <ul className={styles.list}>
                {galleryProjects.map((project, index) => (
                    <ProjectRow key={project.id} project={project} index={index} />
                ))}
            </ul>
        </section>
    );
}
