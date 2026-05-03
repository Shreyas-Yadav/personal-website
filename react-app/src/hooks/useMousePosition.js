import { useState, useEffect, useRef } from 'react';

export function useMousePosition(easingFactor = 0.15) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
    const animationRef = useRef(null);
    const positionRef = useRef({ x: 0, y: 0 });
    const smoothRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            positionRef.current = { x: e.clientX, y: e.clientY };
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            const { x: targetX, y: targetY } = positionRef.current;
            const { x: currentX, y: currentY } = smoothRef.current;

            const newX = currentX + (targetX - currentX) * easingFactor;
            const newY = currentY + (targetY - currentY) * easingFactor;

            smoothRef.current = { x: newX, y: newY };
            setSmoothPosition({ x: newX, y: newY });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [easingFactor]);

    return { position, smoothPosition };
}
