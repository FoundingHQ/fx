import {
  MutableRefObject,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export const useOnScreen = <T extends Element | undefined>(
  ref: MutableRefObject<T>,
  rootMargin: string = "0px"
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current as Element);
    };
  }, []);

  return [isIntersecting, setIntersecting];
};
