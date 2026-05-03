import { useState, useEffect, useRef } from 'react';

export function useCounterAnimation(target, enabled = false, decimals = 0, duration = 1000) {
    const [value, setValue] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const animationRef = useRef(null);
    const startTimeRef = useRef(null);

    useEffect(() => {
        const reset = () => {
            animationRef.current = requestAnimationFrame(() => {
                setValue(0);
                setIsComplete(false);
            });
        };

        // Skip if target is null (e.g., static display text)
        if (target === null || target === undefined) {
            reset();
            return () => {
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                }
            };
        }

        if (!enabled) {
            reset();
            return () => {
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                }
            };
        }

        const animate = (timestamp) => {
            if (!startTimeRef.current) {
                startTimeRef.current = timestamp;
            }

            const elapsed = timestamp - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);

            // Linear (matches original implementation)
            const currentValue = target * progress;

            setValue(currentValue);

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
            } else {
                setValue(target);
                setIsComplete(true);
            }
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            startTimeRef.current = null;
        };
    }, [target, duration, enabled]);

    const displayValue = value.toFixed(decimals);

    return {
        value,
        displayValue,
        isComplete
    };
}
