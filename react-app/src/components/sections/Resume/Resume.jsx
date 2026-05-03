import { useRef } from 'react';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import { useCursorHover } from '../../../context/useCursor';
import styles from './Resume.module.css';

const RESUME_URL = import.meta.env.VITE_RESUME_URL;

export function Resume() {
    const cardRef = useRef(null);
    const { isIntersecting } = useIntersectionObserver(cardRef, {
        threshold: 0.2,
        triggerOnce: true
    });
    const cursorHoverProps = useCursorHover();

    const viewerUrl = `/resume.html?url=${encodeURIComponent(RESUME_URL)}`;

    return (
        <section className={styles.resumeScene} id="resume">
            <div className={styles.title}>Resume</div>

            <div
                ref={cardRef}
                className={styles.card}
                style={{
                    opacity: isIntersecting ? 1 : 0,
                    transform: isIntersecting ? 'translateY(0)' : 'translateY(24px)',
                    transition: 'all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
            >
                <div className={styles.cardLeft}>
                    <div className={styles.label}>Shreyas Yadav</div>
                    <div className={styles.sub}>Software Engineer — Backend / Systems</div>
                </div>
                <div className={styles.cardRight}>
                    <a
                        href={viewerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.viewBtn}
                        {...cursorHoverProps}
                    >
                        View Resume
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                        </svg>
                    </a>
                    <a
                        href={RESUME_URL}
                        download="Shreyas-Yadav-Resume.pdf"
                        className={styles.downloadBtn}
                        {...cursorHoverProps}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download
                    </a>
                </div>
            </div>

        </section>
    );
}
