import { useState, useEffect, useCallback } from 'react';
import { useScrollProgress } from '../../../hooks/useScrollProgress';
import { useIsMobile } from '../../../hooks/useMediaQuery';
import { useCursorHover } from '../../../context/CursorContext';
import styles from './Navigation.module.css';

export function Navigation() {
    const [isShrunk, setIsShrunk] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScrollProgress();
    const isMobile = useIsMobile();
    const cursorHoverProps = useCursorHover();

    // Shrink nav after scrolling past 100px (past the hero section start)
    useEffect(() => {
        setIsShrunk(scrollY > 100);
    }, [scrollY]);

    // Close mobile menu when resizing to desktop
    useEffect(() => {
        if (!isMobile && isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    }, [isMobile, isMobileMenuOpen]);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => !prev);
    }, []);

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    const handleSmoothScroll = (e, href) => {
        e.preventDefault();
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        }
    };

    const navLinks = [
        { href: '#work', label: 'Work' },
        { href: '#about', label: 'About' },
        { href: '#contact', label: 'Contact' }
    ];

    return (
        <>
            <div className={styles.navWrapper}>
                <nav className={`${styles.nav} ${isShrunk ? styles.shrunk : ''}`}>
                    {/* Animated border glow */}
                    <div className={styles.borderGlow} />

                    <div
                        className={styles.navLogo}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        style={{ cursor: 'pointer' }}
                        {...cursorHoverProps}
                    >
                        Shreyas Yadav
                    </div>
                    <div className={styles.navDivider} />
                    <ul className={styles.navLinks}>
                        {navLinks.map((link, index) => (
                            <li
                                key={link.href}
                                style={{ '--delay': `${0.05 * (index + 1)}s` }}
                            >
                                <a
                                    href={link.href}
                                    onClick={(e) => handleSmoothScroll(e, link.href)}
                                    {...cursorHoverProps}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <button
                        className={`${styles.navToggle} ${isMobileMenuOpen ? styles.active : ''}`}
                        onClick={toggleMobileMenu}
                        aria-label="Toggle navigation menu"
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </nav>
            </div>
            <div
                className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.active : ''}`}
                onClick={closeMobileMenu}
            >
                <nav className={styles.mobileNav}>
                    {navLinks.map((link, index) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={styles.mobileLink}
                            style={{ '--delay': `${0.1 * (index + 1)}s` }}
                            onClick={(e) => handleSmoothScroll(e, link.href)}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
        </>
    );
}
