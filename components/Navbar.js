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

export default function Navbar() {
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
      {isShown && (
        <header id="header" className={styles.navbar}>
          <div className={styles.nav}>
            <div className={styles.logo}>
              <Link href={"/"}>
                <Image src={logo} height={80} width="100%" />
              </Link>
              <span>Electritian</span>
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
                    <Link href={"/work"}>Work</Link>
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
              <span title="facebook page">
                <a
                  href="https://www.facebook.com/profile.php?id=100082503682007&sk=photos"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FacebookIcon className={styles.socialIcon} />
                </a>
              </span>
              <span title="personal facebook">
                <a
                  href="https://www.facebook.com/oussama.jedda"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FacebookIcon className={styles.socialIcon} />
                </a>
              </span>
            </div>
          </div>
          <LanguagesBox />
        </header>
      )}
    </>
  );
}
