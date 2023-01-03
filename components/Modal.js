import React from "react";
import { useState, forwardRef, useImperativeHandle } from "react";
import styles from "../styles/Modal.module.css";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { NavigateBefore } from "@mui/icons-material";
function Modal(props, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);

  const getNextImage = () => {
    if (currentIndex < props.scrambledImages.length - 1) {
      setImgSrc(props.scrambledImages[currentIndex + 1].src);
      setCurrentIndex(currentIndex + 1);
    }
  };
  const getBeforeImage = () => {
    if (currentIndex > 0) {
      setImgSrc(props.scrambledImages[currentIndex - 1].src);
      setCurrentIndex(currentIndex - 1);
    }
  };
  useImperativeHandle(ref, () => ({
    openModal: (img) => {
      setIsOpen(true);
      setImgSrc(img);
      props.scrambledImages.forEach((item, index) => {
        if (img === item.src) {
          setCurrentIndex(index);
        }
      });
    },
  }));
  return isOpen && imgSrc ? (
    <div className={styles.modal}>
      <div className={styles.modalBody}>
        <button className={styles.modalNavButton}>
          <NavigateBefore
            style={{
              cursor: currentIndex === 0 ? "not-allowed" : "pointer",
              color: currentIndex === 0 ? "red" : "black",
            }}
            onClick={getBeforeImage}
          />
        </button>
        <img src={imgSrc} className={styles.modalImg} />
        <button className={styles.modalNavButton}>
          <NavigateNextIcon
            style={{
              cursor: currentIndex === (props.scrambledImages.length-1) ? "not-allowed" : "pointer",
              color: currentIndex === (props.scrambledImages.length-1) ? "red" : "black",
            }}
            onClick={getNextImage}
          />
        </button>
      </div>

      <button
        onClick={() => {
          setIsOpen(false);
        }}
        className={styles.modalButton}
      >
        {props.t("modal:close")}
      </button>
    </div>
  ) : null;
}

export default forwardRef(Modal);
