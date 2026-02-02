import { useState, useCallback } from 'react';
import { categories } from '../../../data/projects';
import { useCursorHover } from '../../../context/CursorContext';
import styles from './ProjectsToggle.module.css';

export function ProjectsToggle({ isExpanded, onToggle, activeCategory, onCategoryChange }) {
    const cursorHoverProps = useCursorHover();

    return (
        <div className={styles.wrapper}>
            <button
                className={`${styles.toggle} ${isExpanded ? styles.expanded : ''}`}
                onClick={onToggle}
                {...cursorHoverProps}
            >
                {/* Animated border glow */}
                <div className={`${styles.borderGlow} ${isExpanded ? styles.expandedBorder : ''}`} />

                <div className={styles.toggleContent}>
                    <span className={styles.toggleText}>
                        {isExpanded ? 'Show Less' : 'Show More Projects'}
                    </span>
                    <span className={styles.toggleArrow}>
                        <svg viewBox="0 0 24 24">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </span>
                </div>
                <div className={`${styles.categoryPills} ${isExpanded ? styles.visible : ''}`}>
                    {categories.map(category => (
                        <span
                            key={category.id}
                            className={`${styles.categoryPill} ${activeCategory === category.id ? styles.active : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                onCategoryChange(category.id);
                            }}
                        >
                            {category.label}
                        </span>
                    ))}
                </div>
            </button>
        </div>
    );
}
