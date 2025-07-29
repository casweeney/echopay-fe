"use client";

import { useEffect, useState, useRef } from "react";

export function useNavbarScroll() {
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateScrollState = () => {
      const scrollY = window.scrollY;

      // Check if scrolled past a threshold (e.g., 50px)
      setIsScrolled(scrollY > 10);

      lastScrollY.current = scrollY;
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScrollState);
        ticking.current = true;
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check
    updateScrollState();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { isScrolled };
}
