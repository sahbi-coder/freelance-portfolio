import React from "react";
import styles from "../styles/Services.module.css";
import ServicesEffects from "./ServicesEffects";
import useMobile from "../hooks/useMobile";
import Link from "next/link";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
function Services({ t }) {
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
  }, [isMobile]);
  return (
    <>
      {(isMobile === true || isMobile === false) && (
        <div
          className={styles.container}
          ref={containerRef}
          id="grid-animation"
        >
          <div className={styles.left}>
            <div className={styles.title} ref={introRef}>
              {t("services:services")}
            </div>
            <ul className={styles.list}>
              <li className={styles.item} ref={item1Ref}>
                {t("services:service-one")}
              </li>
              <li className={styles.item} ref={item2Ref}>
                {t("services:service-two")}
              </li>
              <li className={styles.item} ref={item3Ref}>
                {t("services:service-three")}
              </li>
            </ul>
            
            <Link href="/contact">
              <button className={styles.contact} ref={contactRef}>
              {t("services:contact")}
              </button>
            </Link>
          </div>
          <div className={styles.right}>
            <ServicesEffects/>
            <img
              src={isMobile ? "wave-haikei2.svg" : "wave-haikei.svg"}
              loading="lazy"
              className={styles.curves}
              alt={t("services:alt-phrase")}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Services;
