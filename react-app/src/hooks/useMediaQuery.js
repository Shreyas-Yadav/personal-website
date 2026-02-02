import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);

        // Set initial value
        setMatches(mediaQuery.matches);

        // Create event listener
        const handler = (event) => {
            setMatches(event.matches);
        };

        // Add listener
        mediaQuery.addEventListener('change', handler);

        return () => mediaQuery.removeEventListener('change', handler);
    }, [query]);

    return matches;
}

// Pre-defined breakpoints
export function useIsMobile() {
    return useMediaQuery('(max-width: 768px)');
}

export function useIsTablet() {
    return useMediaQuery('(max-width: 1024px)');
}

export function useIsDesktop() {
    return useMediaQuery('(min-width: 1025px)');
}

export function usePrefersReducedMotion() {
    return useMediaQuery('(prefers-reduced-motion: reduce)');
}
