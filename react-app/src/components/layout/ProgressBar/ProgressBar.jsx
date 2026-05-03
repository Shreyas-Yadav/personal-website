import { useEffect, useRef } from 'react';
import styles from './ProgressBar.module.css';

export function ProgressBar() {
    const barRef = useRef(null);
    const rafRef = useRef(null);
    const currentProgress = useRef(0);
    const targetProgress = useRef(0);

    useEffect(() => {
        const updateProgress = () => {
            const ease = 0.1;
            currentProgress.current += (targetProgress.current - currentProgress.current) * ease;

            if (barRef.current) {
                barRef.current.style.width = `${currentProgress.current}%`;
            }

            rafRef.current = requestAnimationFrame(updateProgress);
        };

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            targetProgress.current = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        rafRef.current = requestAnimationFrame(updateProgress);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={barRef}
            className={styles.progressBar}
        />
    );
}
