import React from "react";
import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import styles from "../styles/Modal.module.css";
import { useAppContext } from "../context/state";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { NavigateBefore } from "@mui/icons-material";
function Modal(props, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const { state, ACTIONS } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);
 
  const getNextImage = () => {
    if (currentIndex < props.scrambledImages.length - 1) {
      setImgSrc(props.scrambledImages[currentIndex + 1].img);
      setCurrentIndex(currentIndex + 1);
    }
  };
  const getBeforeImage = () => {
    if (currentIndex > 0) {
      setImgSrc(props.scrambledImages[currentIndex - 1].img);
      setCurrentIndex(currentIndex - 1);
    }
  };
  useImperativeHandle(ref, () => ({
    openModal: (img) => {
      setIsOpen(true);
      setImgSrc(img);
      props.scrambledImages.forEach((item, index) => {
        if (img === item.img) {
          setCurrentIndex(index);
         
        }
      });
    },
  }));
  return isOpen ? (
    <div className={styles.modal}>
      <div className={styles.modalBody}>
        <NavigateBefore style={{ cursor: "pointer" }} onClick={getBeforeImage}/>
        <img src={imgSrc} className={styles.modalImg} />
        <NavigateNextIcon style={{ cursor: "pointer" }} onClick={getNextImage}/>
      </div>

      <button
        onClick={() => {
          setIsOpen(false);
        }}
        className={styles.modalButton}
      >
        {state.language === ACTIONS.EN && "close"}
        {state.language === ACTIONS.FR && "fermer"}
      </button>
    </div>
  ) : null;
}

export default forwardRef(Modal);
