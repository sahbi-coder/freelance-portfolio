import React from "react";
import styles from "../styles/Services.module.css";
import ServicesEffects from "./ServicesEffects";
import useMobile from "../hooks/useMobile";
import Link from "next/link";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useAppContext } from "../context/state";

gsap.registerPlugin(ScrollTrigger);
function Services() {
  const { state, dispatch, ACTIONS } = useAppContext();
  const isMobile = useMobile();
  const containerRef = useRef(null);
  const introRef = useRef(null);
  const item1Ref = useRef(null);
  const item2Ref = useRef(null);
  const item3Ref = useRef(null);
  const contactRef = useRef(null);
  useEffect(() => {
    gsap.to(introRef.current, { opacity: 0 });
    gsap.to(item1Ref.current, { x: -600 });
    gsap.to(item2Ref.current, { x: -600 });
    gsap.to(item3Ref.current, { x: -600 });
    gsap.to(contactRef.current, { opacity: 0.5, x: -300 });
    const t = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
      },
    });
    t.to(introRef.current, { opacity: 1 });
    t.to(item1Ref.current, { x: 0, duration: 0.15 });
    t.to(item2Ref.current, { x: 0, duration: 0.15 });
    t.to(item3Ref.current, { x: 0, duration: 0.15 });
    t.to(contactRef.current, { opacity: 1, x: 0 });
  }, [state,isMobile]);
  return (
    <>
      {state.language === ACTIONS.EN && (isMobile===true||isMobile===false) && (
        <div className={styles.container} ref={containerRef} id='grid-animation'>
          <div className={styles.left}>
            <div className={styles.title} ref={introRef}>
              My Services:
            </div>
            <ul className={styles.list}>
              <li className={styles.item} ref={item1Ref}>
                Domestic and industrial electricity.
              </li>
              <li className={styles.item} ref={item2Ref}>
                Installation of security cameras.
              </li>
              <li className={styles.item} ref={item3Ref}>
                Troubleshooting electrical issues.
              </li>
            </ul>
            <Link href="/contact">
              <div className={styles.contact} ref={contactRef}>
                contact me.
              </div>
            </Link>
          </div>
          <div className={styles.right}>
            <ServicesEffects />
            <img
              src={isMobile ? "wave-haikei2.svg" : "wave-haikei.svg"}
              loading="lazy"
              className={styles.curves}
            />
          </div>
        </div>
      )}
      {state.language === ACTIONS.FR && (isMobile===true||isMobile===false) && (
        <div className={styles.container} ref={containerRef}>
          <div className={styles.left}>
            <div className={styles.title} ref={introRef}>
              Mes services:
            </div>
            <ul className={styles.list}>
              <li className={styles.item} ref={item1Ref}>
                Électricité domestique et industrielle.
              </li>
              <li className={styles.item} ref={item2Ref}>
                Installation de caméras de sécurité.
              </li>
              <li className={styles.item} ref={item3Ref}>
              réparation des problèmes électriques.
              </li>
            </ul>
            <Link href="/contact">
              <div className={styles.contact} ref={contactRef}>
              Contactez moi.
              </div>
            </Link>
          </div>
          <div className={styles.right}>
            <ServicesEffects />
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

export default Services;
