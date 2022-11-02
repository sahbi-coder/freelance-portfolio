import styles from "../styles/About.module.css";
import useMobile from "../hooks/useMobile";
import Link from "next/link";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useAppContext } from "../context/state";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const { state, dispatch, ACTIONS } = useAppContext();
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
  }, [state]);
  return (
    <>
      {state.language === ACTIONS.EN && (
        <div className={styles.container} ref={containerRef}>
          <div className={styles.left}>
            <div className={styles.title} ref={introRef}>
              Who am I?
            </div>
            <div ref={blockRef}>
              Professional electrician with over three years of hands on
              experience, in both domestic and industrial sites, always ready to
              tackle any problem.
            </div>
            <Link href="/contact">
              <div className={styles.contact} ref={contactRef}>
                contact me.
              </div>
            </Link>
          </div>
          <div className={styles.right}>
            <img
              src="/images/oussama.jpg"
              loading="lazy"
              style={{ objectFit: "cover" }}
              width="100%"
              height="100%"
              alt="photo of oussama jedda"
            />
            <div className={styles.overlay}></div>
            <img
              src={isMobile ? "wave-haikei2.svg" : "wave-haikei.svg"}
              loading="lazy"
              className={styles.curves}
            />
          </div>
        </div>
      )}
      {state.language === ACTIONS.FR && (
        <div className={styles.container} ref={containerRef}>
          <div className={styles.left}>
            <div className={styles.title} ref={introRef}>
              À propos de moi
            </div>
            <div ref={blockRef}>
              Électricien professionnel avec plus de trois ans d&apos;expérience
              pratique, sur des sites domestiques et industriels, toujours prêt
              à résoudre n&apos;importe quel problème.
            </div>
            <Link href="/contact">
              <div className={styles.contact} ref={contactRef}>
              Contactez moi.
              </div>
            </Link>
          </div>
          <div className={styles.right}>
            <img
              src="/images/oussama.jpg"
              loading="lazy"
              style={{ objectFit: "cover" }}
              width="100%"
              height="100%"
              alt="photo de  jedda oussama"
            />
            <div className={styles.overlay}></div>
            <img
              src={isMobile ? "wave-haikei2.svg" : "wave-haikei.svg"}
              loading="lazy"
              className={styles.curves}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default About;
