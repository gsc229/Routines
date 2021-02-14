import {useState, useEffect} from 'react'

export const  useComputedStyles = (querySelector) => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [computedStyles, setComputedStyles] = useState({});

  

  useEffect(() => {
    const element = document.querySelector( querySelector );
    const computed = element && getComputedStyle( element );
    setComputedStyles(computed)
    
  }, []); // Empty array ensures that effect is only run on mount

  return computedStyles;
}