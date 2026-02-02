import { createContext, useContext, useState, useCallback } from 'react';

const CursorContext = createContext(null);

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

export function useCursor() {
    const context = useContext(CursorContext);
    if (!context) {
        throw new Error('useCursor must be used within a CursorProvider');
    }
    return context;
}

// HOC or hook for adding cursor hover to elements
export function useCursorHover() {
    const { setHover } = useCursor();

    return {
        onMouseEnter: () => setHover(true),
        onMouseLeave: () => setHover(false)
    };
}
