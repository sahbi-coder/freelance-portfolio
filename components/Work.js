import useMobile from "../hooks/useMobile";
import { useEffect, useRef } from "react";
import styles from "../styles/Work.module.css";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Flip from "gsap/dist/Flip";
import Modal from "../components/Modal";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

export default function Work({ t, images }) {
  const isMobile = useMobile();
  const gridRef = useRef(null);
  const gridItemsRefs = useRef([]);
  const modalRef = useRef(null);

  const setRefs = (el, index) => {
    gridItemsRefs.current[index] = el;
  };
  const openModal = (img) => {
    modalRef.current.openModal(img);
  };

  useEffect(() => {
    gridItemsRefs.current.forEach((ref, index) => {
      gsap.to(ref, { x: Math.random() * 300 - 150, opacity: 0 });
    });

    const t = gsap.timeline({
      scrollTrigger: {
        trigger: gridRef.current,
        start: isMobile ? "top center" : "20% center",
      },
    });
    gridItemsRefs.current.forEach((ref, index) => {
      t.to(ref, {
        x: 0,
        opacity: 1,
      });
    });
  }, [isMobile]);

  return (
    <>
      <Modal ref={modalRef} scrambledImages={images} t={t} />
      <div className={styles.gridsContainer}>
        <div className={styles.grid} ref={gridRef}>
          {images.map((item, index) => (
            <div
              className={styles.gridItem}
              key={item.id}
              ref={(el) => setRefs(el, index)}
            >
              <Image src={item.src} layout="fill" objectFit="cover" />
              <div className={styles.gridItemButtonWrapper}>
                <button
                  className={styles.gridItemButton}
                  onClick={() => {
                    openModal(item.src);
                  }}
                >
                  {t("work:see-work")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
