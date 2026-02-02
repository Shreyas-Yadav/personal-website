import { useEffect, useRef, useCallback } from 'react';
import styles from './ProgressBar.module.css';

export function ProgressBar() {
    const barRef = useRef(null);
    const rafRef = useRef(null);
    const currentProgress = useRef(0);
    const targetProgress = useRef(0);

    const updateProgress = useCallback(() => {
        // Smooth easing towards target
        const ease = 0.1;
        currentProgress.current += (targetProgress.current - currentProgress.current) * ease;

        // Update DOM directly for smooth performance
        if (barRef.current) {
            barRef.current.style.width = `${currentProgress.current}%`;
        }

        // Continue animation if not at target
        if (Math.abs(targetProgress.current - currentProgress.current) > 0.01) {
            rafRef.current = requestAnimationFrame(updateProgress);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            targetProgress.current = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            // Start animation loop if not already running
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(updateProgress);
            }
        };

        // Animation loop
        const animate = () => {
            updateProgress();
            rafRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [updateProgress]);

    return (
        <div
            ref={barRef}
            className={styles.progressBar}
        />
    );
}
