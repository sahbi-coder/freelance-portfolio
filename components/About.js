import styles from "../styles/About.module.css";
import useMobile from "../hooks/useMobile";
import Link from "next/link";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function About({ t }) {
  const isMobile = useMobile();
  const containerRef = useRef(null);
  const introRef = useRef(null);
  const blockRef = useRef(null);
  const contactRef = useRef(null);
  useEffect(() => {
    gsap.to(introRef.current, { opacity: 0 });
    gsap.to(blockRef.current, { opacity: 0 });
    gsap.to(contactRef.current, { opacity: 0.5, x: -300 });
    const t = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
      },
    });
    t.to(introRef.current, { opacity: 1 });
    t.to(blockRef.current, { opacity: 1, duration: 0.15 });
    t.to(contactRef.current, { opacity: 1, x: 0, duration: 0.5 });
  }, []);
  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.left}>
        <div className={styles.title} ref={introRef}>
          {t("about:who-am-i")}
        </div>
        <div ref={blockRef} className={styles.block}>{t("about:main-intro")}</div>
        <Link href="/contact">
          <button className={styles.contact} ref={contactRef}>
            {t("about:contact-me")}
          </button>
        </Link>
      </div>
      <div className={styles.right}>
        <img
          src="/images/oussama.jpg"
          loading="lazy"
          style={{ objectFit: "cover" }}
          width="100%"
          height="100%"
          alt={t("about:oussama-photo")}
        />
        <div className={styles.overlay}></div>
        <img
          src={isMobile ? "wave-haikei2.svg" : "wave-haikei.svg"}
          loading="lazy"
          className={styles.curves}
          alt={t("about:layout-photo")}
        />
      </div>
    </div>
  );
}

export default About;
