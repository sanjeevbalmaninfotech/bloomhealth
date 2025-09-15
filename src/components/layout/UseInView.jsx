import { useEffect, useRef, useState } from "react";

export const useInView = (options) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // trigger once
        }
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options]);

  return [ref, isVisible];
};

export const AnimatedBlock = ({ children, delay = 0 }) => {
    const [ref, isVisible] = useInView({ threshold: 0.1 });
  
    return (
      <div
        ref={ref}
        className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ transitionDelay: `${delay}s` }}
      >
        {children}
      </div>
    );
};