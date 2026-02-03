import { useState, useCallback } from 'react';
import { galleryProjects } from '../../../data/projects';
import { useCursorHover } from '../../../context/CursorContext';
import { ProjectsToggle } from '../ProjectsToggle';
import styles from './MagneticGallery.module.css';

// Icon helper
function getIcon(name) {
    const icons = {
        'users': (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
        ),
        'building': (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                <line x1="9" y1="22" x2="9" y2="22.01"></line>
                <line x1="15" y1="22" x2="15" y2="22.01"></line>
                <line x1="12" y1="22" x2="12" y2="22.01"></line>
                <line x1="12" y1="2" x2="12" y2="4"></line>
                <line x1="8" y1="2" x2="8" y2="4"></line>
                <line x1="16" y1="2" x2="16" y2="4"></line>
            </svg>
        ),
        'cpu': (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                <rect x="9" y="9" width="6" height="6"></rect>
                <line x1="9" y1="1" x2="9" y2="4"></line>
                <line x1="15" y1="1" x2="15" y2="4"></line>
                <line x1="9" y1="20" x2="9" y2="23"></line>
                <line x1="15" y1="20" x2="15" y2="23"></line>
                <line x1="20" y1="9" x2="23" y2="9"></line>
                <line x1="20" y1="14" x2="23" y2="14"></line>
                <line x1="1" y1="9" x2="4" y2="9"></line>
                <line x1="1" y1="14" x2="4" y2="14"></line>
            </svg>
        ),
        'activity': (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
        ),
        'bot': (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                <circle cx="12" cy="5" r="2"></circle>
                <path d="M12 7v4"></path>
                <line x1="8" y1="16" x2="8" y2="16"></line>
                <line x1="16" y1="16" x2="16" y2="16"></line>
            </svg>
        ),
        'code': (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
        ),
        'bar-chart': (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="20" x2="12" y2="10"></line>
                <line x1="18" y1="20" x2="18" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="16"></line>
            </svg>
        ),
        'cloud': (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
            </svg>
        ),
        'video': (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
        ),
        'zap': (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
        ),
        'wifi': (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                <line x1="12" y1="20" x2="12.01" y2="20"></line>
            </svg>
        )
    };

    return icons[name] || null;
}

function ProjectCard({ project, categoryFilter }) {
    const cursorHoverProps = useCursorHover();

    const isVisible = categoryFilter === 'all' ||
        project.category.split(' ').includes(categoryFilter);

    return (
        <div
            className={`${styles.card} ${!isVisible ? styles.hidden : ''}`}
            {...cursorHoverProps}
        >
            <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>{getIcon(project.icon)}</div>
                <a href={project.link} className={styles.cardLink}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                </a>
            </div>
            <div className={styles.cardContent}>
                <h4 className={styles.cardTitle}>{project.title}</h4>
                <p className={styles.cardDesc}>{project.description}</p>
                <div className={styles.cardTags}>
                    {project.tags.map(tag => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function MagneticGallery() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');

    const handleToggle = useCallback(() => {
        setIsExpanded(prev => !prev);
    }, []);

    const handleCategoryChange = useCallback((category) => {
        setActiveCategory(category);
    }, []);

    return (
        <>
            <ProjectsToggle
                isExpanded={isExpanded}
                onToggle={handleToggle}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
            />
            <section className={`${styles.gallery} ${isExpanded ? styles.expanded : ''}`}>
                <div className={styles.grid}>
                    {galleryProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            categoryFilter={activeCategory}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}
