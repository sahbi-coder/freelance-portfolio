import { useEffect, useState } from "react";

function useGrid() {
  const [gridItemsCount, setGridItemsCount] = useState(0);

  useEffect(() => {
    const isTwoByOne = window.matchMedia("(max-width: 350px)").matches;
    const isTwoByTwo = window.matchMedia("(min-width: 351px)").matches;
    const isTwoByThree = window.matchMedia("(min-width: 701px)").matches;
    const isTwoByFour = window.matchMedia("(min-width: 1051px)").matches;
    if (isTwoByOne) setGridItemsCount(2);
    if (isTwoByTwo) setGridItemsCount(4);
    if (isTwoByThree) setGridItemsCount(6);
    if (isTwoByFour) setGridItemsCount(8);
    window.addEventListener("resize", function () {
      const isTwoByOne = window.matchMedia("(max-width: 350px)").matches;
      const isTwoByTwo = window.matchMedia("(min-width: 351px)").matches;
      const isTwoByThree = window.matchMedia("(min-width: 701px)").matches;
      const isTwoByFour = window.matchMedia("(min-width: 1051px)").matches;
      if (isTwoByOne) setGridItemsCount(2);
      if (isTwoByTwo) setGridItemsCount(4);
      if (isTwoByThree) setGridItemsCount(6);
      if (isTwoByFour) setGridItemsCount(8);
    });
   
    
  }, []);

  return gridItemsCount;
}

export default useGrid;
