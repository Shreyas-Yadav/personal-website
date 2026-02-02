import { useState, useEffect } from 'react';

export function useScrollProgress() {
    const [progress, setProgress] = useState(0);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            setProgress(scrollProgress);
            setScrollY(scrollTop);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { progress, scrollY };
}
