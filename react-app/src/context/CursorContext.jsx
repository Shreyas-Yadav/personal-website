import { useState, useCallback } from 'react';
import { CursorContext } from './CursorContextValue';

export function CursorProvider({ children }) {
    const [isHovered, setIsHovered] = useState(false);

    const setHover = useCallback((hover) => {
        setIsHovered(hover);
    }, []);

    return (
        <CursorContext.Provider value={{ isHovered, setHover }}>
            {children}
        </CursorContext.Provider>
    );
}
