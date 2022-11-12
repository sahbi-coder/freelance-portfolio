import { useState, useLayoutEffect } from "react";

function useMobile() {
  const [isMobile, setIsMobile] = useState(null);
  useLayoutEffect(() => {
    const maches = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(maches);
    let req = window.addEventListener("resize", function () {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(isMobile);
    });
    return () => {
      window.removeEventListener("resize", req);
    };
  }, []);
  return isMobile;
}

export default useMobile;
