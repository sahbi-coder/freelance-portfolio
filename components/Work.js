import useMobile from "../hooks/useMobile";
import { useState, useEffect, useRef } from "react";
import styles from "../styles/Work.module.css";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Flip from "gsap/dist/Flip";
import Modal from "../components/Modal";


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

export default function Work({t}) {
  const isMobile = useMobile();
  const gridRef = useRef(null);
  const gridItemsRefs = useRef([]);
  const modalRef = useRef(null);
  const [scrambledImages, setScrambledImages] = useState(itemData);

  const setRefs = (el, index) => {
    gridItemsRefs.current[index] = el;
  };
  const openModal = (img) => {
    modalRef.current.openModal(img);
  };

  useEffect(() => {
    gridItemsRefs.current.forEach((ref, index) => {
      gsap.to(ref, { x: Math.random() * 300 + -150, opacity: 0 });
    });

    const t = gsap.timeline({
      scrollTrigger: {
        trigger: gridRef.current,
        start: isMobile?'top center':"20% center" 
  
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
      <Modal ref={modalRef} scrambledImages={scrambledImages} t={t}/>
      <div className={styles.gridsContainer}>
        <div className={styles.grid} ref={gridRef}>
          {scrambledImages.map((item, index) => (
            <div
              className={styles.gridItem}
              key={index}
              ref={(el) => setRefs(el, index)}
            >
              <div className={styles.gridItemButtonWrapper}>
                <button
                  className={styles.gridItemButton}
                  onClick={() => {
                    openModal(item.img);
                  }}
                >
                   {t('work:see-work')}
                </button>
              </div>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                loading="lazy"
                style={{ objectFit: "cover", height: "100%", width: "100%" }}
                alt={t('work:example-alt')}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const itemData = [
  {
    img: "/images/img1.jpg",
    title: "Breakfast",
  },

  {
    img: "/images/img2.jpg",
    title: "Camera",
  },
  {
    img: "/images/img3.jpg",
    title: "Coffee",
  },
  {
    img: "/images/img4.jpg",
    title: "Hats",
  },
  {
    img: "/images/img5.jpg",
    title: "Honey",
  },
  {
    img: "/images/img6.jpg",
    title: "Basketball",
  },
  {
    img: "/images/img7.jpg",
    title: "Fern",
  },
  {
    img: "/images/img8.jpg",
    title: "Mushrooms",
  },
  {
    img: "/images/img9.jpg",
    title: "Tomato basil",
  },
  {
    img: "/images/img10.jpg",
    title: "Breakfast",
  },
  {
    img: "/images/img11.jpg",
    title: "Burger",
  },
  {
    img: "/images/img12.jpg",
    title: "Camera",
  },
  {
    img: "/images/img13.jpg",
    title: "Coffee",
  },
  {
    img: "/images/img14.jpg",
    title: "Hats",
  },
  {
    img: "/images/img15.jpg",
    title: "Honey",
  },
  {
    img: "/images/img16.jpg",
    title: "Basketball",
  },
  {
    img: "/images/img17.jpg",
    title: "Fern",
  },
  {
    img: "/images/img18.jpg",
    title: "Mushrooms",
  },
  {
    img: "/images/img9.jpg",
    title: "Tomato basil",
  },
];
