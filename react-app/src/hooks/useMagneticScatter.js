import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

function seededUnit(index, salt) {
    const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
    return value - Math.floor(value);
}

export function useMagneticScatter(galleryRef, cardCount, isExpanded = false) {
    const [progress, setProgress] = useState(0);
    const [isLanded, setIsLanded] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const targetProgressRef = useRef(0);
    const progressRef = useRef(0);
    const rafIdRef = useRef(null);
    const prefersReducedMotion = useRef(
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    // Generate scatter positions on mount
    const scatterPositions = useMemo(() => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
        const scatterMultiplier = isMobile ? 0.4 : 1;

        return Array.from({ length: cardCount }, (_, index) => {
            const angle = (index / cardCount) * Math.PI * 2 + seededUnit(index, 1) * 0.5;
            const distance = 300 + seededUnit(index, 2) * 300;

            return {
                x: Math.cos(angle) * distance * scatterMultiplier,
                y: Math.sin(angle) * distance * scatterMultiplier,
                rotation: (seededUnit(index, 3) - 0.5) * 60,
                z: isMobile ? 0 : (seededUnit(index, 4) - 0.5) * 400
            };
        });
    }, [cardCount]);

    // Easing function
    const easeOutCubic = useCallback((t) => {
        return 1 - Math.pow(1 - t, 3);
    }, []);

    // Scroll handler
    useEffect(() => {
        if (!isExpanded) {
            progressRef.current = 0;
            targetProgressRef.current = 0;
            rafIdRef.current = requestAnimationFrame(() => {
                setProgress(0);
                setIsLanded(false);
                setIsAnimating(false);
            });
            return () => {
                if (rafIdRef.current) {
                    cancelAnimationFrame(rafIdRef.current);
                }
            };
        }

        if (prefersReducedMotion.current) {
            rafIdRef.current = requestAnimationFrame(() => {
                setProgress(1);
                setIsLanded(true);
                setIsAnimating(false);
            });
            return () => {
                if (rafIdRef.current) {
                    cancelAnimationFrame(rafIdRef.current);
                }
            };
        }

        const handleScroll = () => {
            if (isLanded || !galleryRef.current) return;

            const rect = galleryRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            const scrollStart = viewportHeight * 0.9;
            const scrollEnd = viewportHeight * 0.1;
            const scrollDistance = scrollStart - scrollEnd;

            if (rect.top <= scrollStart && rect.top >= scrollEnd) {
                const currentScroll = scrollStart - rect.top;
                targetProgressRef.current = Math.min(1, Math.max(0, currentScroll / scrollDistance));
            } else if (rect.top > scrollStart) {
                targetProgressRef.current = 0;
            } else {
                targetProgressRef.current = 1;
            }
        };

        // Intersection observer for animating state
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsAnimating(true);
                } else if (!isLanded) {
                    setIsAnimating(false);
                }
            },
            { threshold: 0.1 }
        );

        if (galleryRef.current) {
            observer.observe(galleryRef.current);
        }

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Animation loop
        const update = () => {
            const ease = 0.08;
            progressRef.current += (targetProgressRef.current - progressRef.current) * ease;

            if (Math.abs(targetProgressRef.current - progressRef.current) < 0.001) {
                progressRef.current = targetProgressRef.current;
            }

            setProgress(progressRef.current);

            if (progressRef.current >= 0.98 && !isLanded) {
                setIsLanded(true);
                setIsAnimating(false);
            }

            rafIdRef.current = requestAnimationFrame(update);
        };

        rafIdRef.current = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, [galleryRef, isLanded, isExpanded]);

    // Calculate card styles based on progress
    const cardStyles = useMemo(() => {
        if (!isExpanded) return [];

        return scatterPositions.map((pos, index) => {
            const staggerOffset = (index / cardCount) * 0.15;
            const cardProgress = Math.min(1, Math.max(0, (progress - staggerOffset) / (1 - staggerOffset)));
            const easedProgress = easeOutCubic(cardProgress);

            // Interpolate from scattered position to final position
            const x = pos.x * (1 - easedProgress);
            const y = pos.y * (1 - easedProgress);
            const rotation = pos.rotation * (1 - easedProgress);
            const scale = 0.8 + 0.2 * easedProgress;
            const opacity = 0.3 + 0.7 * easedProgress;

            return {
                transform: `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`,
                opacity,
                transition: isLanded ? 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
            };
        });
    }, [scatterPositions, progress, cardCount, easeOutCubic, isExpanded, isLanded]);

    return {
        progress,
        isLanded,
        isAnimating,
        cardStyles,
        scatterPositions
    };
}
