import styles from "../styles/Contact.module.css";
import useMobile from "../hooks/useMobile";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/state";
import PhoneIcon from '@mui/icons-material/Phone';
import emailjs from "@emailjs/browser";
gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();
    setIsFetching(true);
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        formRef.current,
        process.env.NEXT_PUBLIC_PUBLIC_KEY
      )
      .then(
        (result) => {
          setDone(true);
          setError(false);
          setIsFetching(false);
        },
        (error) => {
          setDone(false);
          setError(true);
          setIsFetching(false);
        }
      );
  };
  const isMobile = useMobile();
  const lettersRefs = useRef([]);
  const inputsRefs = useRef([]);
  const containerRef = useRef(null);
  const catchRef = useRef(null);
  const formRef = useRef(null);
  const { state, dispatch, ACTIONS } = useAppContext();
  const setInputsRefs = (el, index) => {
    if (el) inputsRefs.current[index] = el;
  };
  const setLettersRefs = (el) => {
    el && lettersRefs.current.push(el);
  };

  useEffect(() => {
    inputsRefs.current.forEach((input) => {
      gsap.to(input, { y: 100, opacity: 0 });
    });
    lettersRefs.current.forEach((letter) => {
      gsap.to(letter, { opacity: 0 });
    });
    gsap.to(catchRef.current, { x: 300 });
    const t = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "40% center",
      },
    });
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "40% center",
      },
    });

    lettersRefs.current.forEach((letter, index) => {
      gsap.to(letter, { opacity: 1, duration: 1 });
    });
    inputsRefs.current.forEach((input, index) => {
      t.to(input, { y: 0, opacity: 1, duration: 0.5 });
    });
    t1.to(catchRef.current, { x: 0 });
  }, [state]);
  return (
    <div className={styles.container}>
      <div className={styles.left} ref={containerRef}>
        <div className={styles.overlay}></div>
        <div className={styles.title}>
          {state.language === ACTIONS.EN && (
            <>
              <span ref={setLettersRefs}>C</span>
              <span ref={setLettersRefs}>o</span>
              <span ref={setLettersRefs}>n</span>
              <span ref={setLettersRefs}>t</span>
              <span ref={setLettersRefs}>a</span>
              <span ref={setLettersRefs}>c</span>
              <span ref={setLettersRefs}>t</span>
              <span ref={setLettersRefs}> </span>
              <span ref={setLettersRefs}>m</span>
              <span ref={setLettersRefs}>e</span>
            </>
          )}
          {state.language === ACTIONS.FR && (
            <>
              <span ref={setLettersRefs}>C</span>
              <span ref={setLettersRefs}>o</span>
              <span ref={setLettersRefs}>n</span>
              <span ref={setLettersRefs}>t</span>
              <span ref={setLettersRefs}>a</span>
              <span ref={setLettersRefs}>c</span>
              <span ref={setLettersRefs}>t</span>
              <span ref={setLettersRefs}>e</span>
              <span ref={setLettersRefs}>z</span>
              <span ref={setLettersRefs}> </span>
              <span ref={setLettersRefs}>m</span>
              <span ref={setLettersRefs}>o</span>
              <span ref={setLettersRefs}>i</span>
            </>
          )}
        </div>
        <div className={styles.phone}><PhoneIcon/>:<span style={{color:'white',marginLeft:10}}>  92 999 589</span></div>
        {state.language === ACTIONS.FR && (
          <form className={styles.form} ref={formRef}>
            <div className={styles.row}>
              <div className={styles.column}>
                <input
                  className={styles.input}
                  placeholder="prenom"
                  ref={(el) => {
                    setInputsRefs(el, 0);
                  }}
                  name="from_name"
                />
              </div>
              <div className={styles.column}>
                <input
                  className={styles.input}
                  placeholder="nom"
                  ref={(el) => {
                    setInputsRefs(el, 1);
                  }}
                  name="from_lastname"
                />
              </div>
            </div>
            <div className={styles.row}>
              <input
                className={styles.input}
                placeholder="votre mail"
                type="email"
                ref={(el) => {
                  setInputsRefs(el, 2);
                }}
                name="from_email"
              />
            </div>
            <div className={styles.row}>
              <textarea
                className={styles.input}
                placeholder="message"
                ref={(el) => {
                  setInputsRefs(el, 3);
                }}
                name="message"
              />
            </div>
            <button
              className="submit"
              onClick={sendEmail}
              ref={(el) => {
                setInputsRefs(el, 4);
              }}
              style={{ cursor: isFetching ? "not-allowed" : "pointer" }}
            >
              envoyer message !
            </button>
            <div style={{ padding: 10 }}>
              {done && (
                <span style={{ color: "#08fdd8", padding: 2 }}>merci..</span>
              )}
              {error && (
                <span style={{ color: "red", padding: 2 }}>
                  oops ! un problème est survenu, réessayez...
                </span>
              )}
            </div>
          </form>
        )}
        {state.language === ACTIONS.EN && (
          <form className={styles.form} ref={formRef}>
            <div className={styles.row}>
              <div className={styles.column}>
                <input
                  className={styles.input}
                  placeholder="name"
                  name="from_name"
                  ref={(el) => {
                    setInputsRefs(el, 0);
                  }}
                />
              </div>
              <div className={styles.column}>
                <input
                  className={styles.input}
                  placeholder="last name"
                  name="from_lastname"
                  ref={(el) => {
                    setInputsRefs(el, 1);
                  }}
                />
              </div>
            </div>
            <div className={styles.row}>
              <input
                className={styles.input}
                placeholder="your email"
                type="email"
                name="from_email"
                ref={(el) => {
                  setInputsRefs(el, 2);
                }}
              />
            </div>
            <div className={styles.row}>
              <textarea
                className={styles.input}
                placeholder="message"
                name="message"
                ref={(el) => {
                  setInputsRefs(el, 3);
                }}
              />
            </div>
            <button
              className="submit"
              onClick={sendEmail}
              ref={(el) => {
                setInputsRefs(el, 4);
              }}
              disabled={isFetching}
              style={{ cursor: isFetching ? "not-allowed" : "pointer" }}
            >
              send message !
            </button>
            <div style={{ padding: 10 }}>
              {done && (
                <span style={{ color: "#08fdd8", padding: 2 }}>
                  Thank you..
                </span>
              )}
              {error && (
                <span style={{ color: "red", padding: 2 }}>
                  oops ! something went wrong...
                </span>
              )}
            </div>
          </form>
        )}
      </div>
      <div className={styles.right}>
        <img
          src={isMobile ? "wave-haikei3.svg" : "wave-haikei.svg"}
          loading="lazy"
          className={styles.curves}
        />

        <div className={styles.catch} ref={catchRef}>
          {state.language === ACTIONS.EN &&
            "Always ready for your projects, feel free to contact me, now."}
          {state.language === ACTIONS.FR &&
            "Toujours prêt pour vos projets, n'hésitez pas à me contacter."}
        </div>
      </div>
    </div>
  );
}

export default Contact;
