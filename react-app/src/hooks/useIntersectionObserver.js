import { useState, useEffect } from 'react';

export function useIntersectionObserver(ref, options = {}) {
    const { threshold = 0.3, rootMargin = '0px', triggerOnce = false } = options;
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [hasIntersected, setHasIntersected] = useState(false);

    useEffect(() => {
        const element = ref?.current;
        if (!element) return;

        // If already intersected and triggerOnce is true, don't observe again
        if (triggerOnce && hasIntersected) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const isCurrentlyIntersecting = entry.isIntersecting;
                setIsIntersecting(isCurrentlyIntersecting);

                if (isCurrentlyIntersecting && !hasIntersected) {
                    setHasIntersected(true);

                    // Disconnect if triggerOnce is enabled
                    if (triggerOnce) {
                        observer.disconnect();
                    }
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [ref, threshold, rootMargin, triggerOnce, hasIntersected]);

    return { isIntersecting: triggerOnce ? hasIntersected : isIntersecting, hasIntersected };
}
