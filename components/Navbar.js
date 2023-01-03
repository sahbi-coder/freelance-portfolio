import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.svg";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import ClearIcon from "@mui/icons-material/Clear";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import { useState, useEffect, useRef } from "react";
import useMobile from "../hooks/useMobile";
import Router from "next/router";
import LanguagesBox from "./LanguagesBox";

export default function Navbar({ t }) {
  const links = useRef([]);
  const [isShown, setIsShown] = useState(false);
  const isMobile = useMobile();
  const addLink = (el) => {
    if (el) {
      const list = el.children[0].href.split("/");
      const ele = list[list.length - 1];
      if ("/" + ele === Router.pathname) {
        el.children[0].style.color = "#08fdd8";
      }
      links.current.push(ele);
    }
  };
  useEffect(() => {
    if (isMobile === false) {
      setIsShown(true);
    }
  }, [isMobile, isShown]);

  return (
    <>
      <div className={styles.toggleContainer}>
        {isMobile && isShown && (
          <span
            className={styles.clear}
            onClick={() => {
              setIsShown(false);
            }}
          >
            <ClearIcon />
          </span>
        )}
        {isMobile && !isShown && (
          <span
            className={styles.toggleBars}
            onClick={() => {
              setIsShown(true);
            }}
          >
            <DensityMediumIcon />
          </span>
        )}
      </div>

      <header
        id="header"
        className={styles.navbar}
        style = {{ transform: isMobile?isShown?`translateX(0)`:`translateX(-100%)`:`translateX(0)`}}
      >
        <div className={styles.nav}>
          <div className={styles.logo}>
            <Link href={"/"}>
              <Image src={logo} height={80} width="100%" />
            </Link>
            <span>{t("navbar:electritian")}</span>
          </div>
          <div className={styles.navWrap}>
            <nav>
              <ul>
                <li
                  className={styles.link}
                  ref={(el) => {
                    addLink(el);
                  }}
                >
                  <Link href={"/about"}>About</Link>
                </li>
                <li
                  className={styles.link}
                  ref={(el) => {
                    addLink(el);
                  }}
                >
                  {" "}
                  <Link href={"/services"}>Services</Link>
                </li>
                <li
                  className={styles.link}
                  ref={(el) => {
                    addLink(el);
                  }}
                >
                  <Link href={"/galery"}>{t("navbar:work")}</Link>
                </li>
                <li
                  className={styles.link}
                  ref={(el) => {
                    addLink(el);
                  }}
                >
                  <Link href={"/contact"}>Contact</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <span title={t("navbar:facebook-page")}>
              <a
                href="https://www.facebook.com/profile.php?id=100082503682007&sk=photos"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookIcon className={styles.socialIcon} />
              </a>
            </span>
          </div>
          <div
            style={{
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <span>{t("navbar:developed-by")}</span>
            <a
              href="https://sahbi-coder.github.io/portfolio/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "white", margin: 3 }}
            >
              Sahbi Kardi
            </a>
          </div>
        </div>
        <LanguagesBox t={t} />
      </header>
    </>
  );
}
