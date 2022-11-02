
import { useAppContext } from "../context/state";
import { useEffect } from "react";

function useChangeLang() {
  const { state, ACTIONS } = useAppContext();
  useEffect(() => {
    if (state.language === ACTIONS.FR) {
      document.documentElement.setAttribute("lang", "fr");
      return;
    }
    document.documentElement.setAttribute("lang", "en");
  }, [state]);
}

export default useChangeLang;
