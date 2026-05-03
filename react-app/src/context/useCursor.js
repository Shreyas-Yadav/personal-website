import { useContext } from 'react';
import { CursorContext } from './CursorContextValue';

export function useCursor() {
    const context = useContext(CursorContext);
    if (!context) {
        throw new Error('useCursor must be used within a CursorProvider');
    }
    return context;
}

export function useCursorHover() {
    const { setHover } = useCursor();

    return {
        onMouseEnter: () => setHover(true),
        onMouseLeave: () => setHover(false)
    };
}
