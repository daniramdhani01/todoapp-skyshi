import { useEffect } from "react";

export function useClickOutside(ref, handleClose) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref?.current && !ref?.current.contains(event.target)) {
        //   alert("You clicked outside of me!");
        handleClose()
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }