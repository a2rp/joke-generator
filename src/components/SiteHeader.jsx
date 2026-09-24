import { useEffect, useState } from "react";
import { FiBookOpen, FiGithub, FiMenu, FiX } from "react-icons/fi";
import styles from "./siteHeader.module.scss";

function SiteHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let previousScroll = window.scrollY;
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setVisible(currentScroll <= 8 || currentScroll < previousScroll);
            previousScroll = currentScroll;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={`${styles.header} ${visible ? styles.visible : styles.hidden}`}>
            <div className={styles.inner}>
                <a className={styles.brand} href="#top" onClick={closeMenu}>
                    <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Ashish Ranjan logo" />
                    <span><strong>Joke Generator</strong><small>Find a quick laugh</small></span>
                </a>
                <nav className={`${styles.navigation} ${menuOpen ? styles.open : ""}`} aria-label="Page navigation">
                    <a href="#generator" onClick={closeMenu}><FiBookOpen aria-hidden="true" /> Generator</a>
                    <a href="#about" onClick={closeMenu}>How it works</a>
                    <a href="https://github.com/a2rp/joke-generator" target="_blank" rel="noopener noreferrer" onClick={closeMenu}><FiGithub aria-hidden="true" /> Source</a>
                </nav>
                <button className={styles.menuButton} type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((current) => !current)}>
                    {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
                </button>
            </div>
        </header>
    );
}

export default SiteHeader;
