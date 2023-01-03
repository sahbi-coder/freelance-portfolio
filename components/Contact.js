import styles from "../styles/Contact.module.css";
import useMobile from "../hooks/useMobile";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import axios from "axios";
import uniqid from "uniqid";
import Map from "./Map";
import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";

gsap.registerPlugin(ScrollTrigger);

function Contact({ t }) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      message: "",
      email: "",
    },
    validationSchema: yup.object({
      name: yup
        .string(15, t("contact:name-error-message"))
        .required(t("contact:required"))
        .max(15, t("contact:name-error-message")),
      lastName: yup
        .string(20, t("contact:lastName-error-message"))
        .required(t("contact:required"))
        .max(20, t("contact:lastName-error-message")),
      message: yup
        .string(5000, t("contact:message-error-message"))
        .required(t("contact:required"))
        .max(5000, t("contact:message-error-message")),
      email: yup
        .string(30, t("contact:email-length"))
        .email(t("contact:email-error-message"))
        .required(t("contact:required")).max(30,t("contact:email-length")),
    }),
    onSubmit: async (values) => {
      try {
        setIsFetching(true);
        setDone(false);
        setError(false);
        const { data } = await axios.post("/api/contact", values);
        setDone(true);
        setError(false);
        setIsFetching(false);
      } catch {
        setError(true);
        setDone(false);
        setIsFetching(false);
      }
    },
  });

  const isMobile = useMobile();
  const lettersRefs = useRef([]);
  const inputsRefs = useRef([]);
  const containerRef = useRef(null);
  const catchRef = useRef(null);
  const formRef = useRef(null);

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
        start: isMobile?'top center':"20% center" ,
    
      },
    });
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: isMobile?'top center':"20% center" ,
      },
    });

    lettersRefs.current.forEach((letter, index) => {
      gsap.to(letter, { opacity: 1, duration: 1 });
    });
    inputsRefs.current.forEach((input, index) => {
      t.to(input, { y: 0, opacity: 1, duration: 0.5 });
    });
    t1.to(catchRef.current, { x: 0 });
  }, []);
  return (
    <div className={styles.container} style={{marginTop:router.pathname==='/'?10:0}}>
      <div className={styles.left} ref={containerRef}>
        <div className={styles.title}>
          {t("contact:contact")
            .split("")
            .map((c, index) => {
              return (
                <span ref={setLettersRefs} key={uniqid()}>
                  {c}
                </span>
              );
            })}
        </div>
        <div className={styles.phone}>
          <PhoneIcon />:<span style={{ marginLeft: 10 }}> +216 92 999 589</span>
        </div>

        <form
          className={styles.form}
          ref={formRef}
          onSubmit={formik.handleSubmit}
          onChange={formik.handleChange}
        >
          <div className={styles.row}>
            <div className={styles.column}>
              <input
                className={styles.input}
                id="name"
                type="text"
                placeholder={t("contact:name_placeholder")}
                name="name"
                ref={(el) => {
                  setInputsRefs(el, 0);
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <p className={styles.error}>{formik.errors.name}</p>
              ) : null}
            </div>
            <div className={styles.column}>
              <input
                id="lastName"
                type="text"
                name="lastName"
                className={styles.input}
                placeholder={t("contact:lastname_placeholder")}
                ref={(el) => {
                  setInputsRefs(el, 1);
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <p className={styles.error}>{formik.errors.lastName}</p>
              ) : null}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.twoColumns}>
              <input
                className={styles.input}
                placeholder={t("contact:email_placeholder")}
                id="email"
                type="email"
                name="email"
                ref={(el) => {
                  setInputsRefs(el, 2);
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className={styles.error}>{formik.errors.email}</p>
              ) : null}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.twoColumns}>
              <textarea
                id="message"
                className={styles.input}
                placeholder={t("contact:message_placeholder")}
                name="message"
                ref={(el) => {
                  setInputsRefs(el, 3);
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
              />
              {formik.touched.message && formik.errors.message ? (
                <p className={styles.error}>{formik.errors.message}</p>
              ) : null}
            </div>
          </div>
          <button
            className="submit"
            type="submit"
            ref={(el) => {
              setInputsRefs(el, 4);
            }}
            disabled={isFetching}
            style={{ cursor: isFetching ? "not-allowed" : "pointer" }}
          >
            {t("canvas:send")}
          </button>
          <div style={{ padding: 10 }}>
            {done && (
              <span style={{ color: "#08fdd8", padding: 2 }}>
                {t("contact:success-message")}
              </span>
            )}
            {error && (
              <span style={{ color: "red", padding: 2 }}>
                {t("contact:failure-message")}
              </span>
            )}
          </div>
        </form>
      </div>
      <div className={styles.right}>
        <Map />
    
      </div>
    </div>
  );
}

export default Contact;
