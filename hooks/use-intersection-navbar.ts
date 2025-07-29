"use client";

import { useEffect, useState, useRef } from "react";

export function useIntersectionNavbar() {
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    // Intersection Observer for detecting when hero section is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of the target is visible
        rootMargin: "-80px 0px 0px 0px", // Account for navbar height
      }
    );

    observer.observe(target);

    // Scroll listener for additional effects
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { isIntersecting, isScrolled, targetRef };
}
