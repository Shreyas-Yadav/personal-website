import { useMemo } from 'react';
import { useMousePosition } from '../../../hooks/useMousePosition';
import { useIsMobile } from '../../../hooks/useMediaQuery';
import { useCursor } from '../../../context/CursorContext';
import styles from './CustomCursor.module.css';

export function CustomCursor() {
    const { smoothPosition } = useMousePosition(0.15);
    const { isHovered } = useCursor();
    const isMobile = useIsMobile();

    const cursorStyle = useMemo(() => ({
        left: smoothPosition.x,
        top: smoothPosition.y
    }), [smoothPosition.x, smoothPosition.y]);

    // Don't render on mobile
    if (isMobile) return null;

    return (
        <div
            className={`${styles.cursor} ${isHovered ? styles.hover : ''}`}
            style={cursorStyle}
        />
    );
}
