import { useCursorHover } from '../../../context/useCursor';
import styles from './ProjectsToggle.module.css';

export function ProjectsToggle({ isExpanded, onToggle }) {
    const cursorHoverProps = useCursorHover();

    return (
        <div className={styles.wrapper}>
            <button
                className={`${styles.toggle} ${isExpanded ? styles.expanded : ''}`}
                onClick={onToggle}
                {...cursorHoverProps}
            >
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
            </button>
        </div>
    );
}
