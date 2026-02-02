import { useState, useCallback } from 'react';
import { galleryProjects } from '../../../data/projects';
import { useCursorHover } from '../../../context/CursorContext';
import { ProjectsToggle } from '../ProjectsToggle';
import styles from './MagneticGallery.module.css';

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
                <div className={styles.cardIcon}>{project.icon}</div>
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
