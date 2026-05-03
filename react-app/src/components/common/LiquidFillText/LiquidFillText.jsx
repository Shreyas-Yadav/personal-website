import { useEffect, useState, useRef, useMemo } from 'react';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import styles from './LiquidFillText.module.css';

export function LiquidFillText({
    text,
    tag = 'span',
    className = '',
    charDelay = 0.08,
    fillDelay = 0.5,
    animationDuration = 2,
}) {
    const [isVisible, setIsVisible] = useState(false);
    const [filledChars, setFilledChars] = useState(new Set());
    const containerRef = useRef(null);

    // Use intersection observer to trigger animation
    const { isIntersecting } = useIntersectionObserver(containerRef, {
        threshold: 0.3,
        triggerOnce: false
    });

    useEffect(() => {
        if (isIntersecting) {
            setIsVisible(true);
            setFilledChars(new Set()); // Reset filled chars when re-entering
        } else {
            setIsVisible(false);
            setFilledChars(new Set()); // Reset when leaving
        }
    }, [isIntersecting]);

    // Calculate filled state after animation completes
    useEffect(() => {
        if (!isVisible) return;

        const timeouts = [];

        // Add filled class to each character after its animation completes
        let charIndex = 0;
        for (let i = 0; i < text.length; i++) {
            if (text[i] !== ' ') {
                const delay = (fillDelay + charIndex * charDelay + animationDuration) * 1000;
                const timeout = setTimeout(() => {
                    setFilledChars(prev => new Set([...prev, i]));
                }, delay);
                timeouts.push(timeout);
                charIndex++;
            }
        }

        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, [isVisible, text, charDelay, fillDelay, animationDuration]);

    // Split text into characters with proper indexing
    const characters = useMemo(() => {
        let charIndex = 0;
        return text.split('').map((char, i) => {
            if (char === ' ') {
                return { char: '\u00A0', index: i, charIndex: -1 }; // Non-breaking space
            }
            const result = { char, index: i, charIndex };
            charIndex++;
            return result;
        });
    }, [text]);

    const Tag = tag;

    return (
        <Tag
            ref={containerRef}
            className={`${styles.container} ${isVisible ? styles.visible : ''} ${className}`}
        >
            {characters.map(({ char, index, charIndex }) => (
                <span
                    key={index}
                    className={`${styles.char} ${filledChars.has(index) ? styles.filled : ''}`}
                    style={{
                        '--char-index': charIndex >= 0 ? charIndex : 0,
                        '--char-delay': `${charDelay}s`,
                        '--fill-delay': `${fillDelay}s`,
                        '--animation-duration': `${animationDuration}s`
                    }}
                    data-char={char}
                >
                    {char}
                </span>
            ))}
        </Tag>
    );
}
