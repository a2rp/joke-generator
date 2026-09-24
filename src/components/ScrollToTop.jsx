import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import styles from "./scrollToTop.module.scss";

function ScrollToTop() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 220);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!visible) return null;
    return <button className={styles.button} type="button" aria-label="Back to top" title="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><FiArrowUp aria-hidden="true" /></button>;
}

export default ScrollToTop;
