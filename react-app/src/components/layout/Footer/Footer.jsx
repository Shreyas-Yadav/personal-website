import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <span className={styles.copyright}>© 2024 Shreyas Yadav</span>
            </div>
        </footer>
    );
}
