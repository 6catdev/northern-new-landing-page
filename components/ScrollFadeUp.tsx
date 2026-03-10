'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollFadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: string;
  className?: string;
}

const ScrollFadeUp = ({ 
  children, 
  delay = 0, 
  duration = 1, 
  distance = '30px',
  className = '' 
}: ScrollFadeUpProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !elementRef.current) return;
    
    const element = elementRef.current;
    
    gsap.set(element, {
      y: distance,
      opacity: 0,
    });

    gsap.fromTo(
      element,
      {
        y: distance,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: duration,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'play none none reverse',
        },
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [delay, duration, distance]);

  return (
    <div ref={elementRef} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};

export default ScrollFadeUp;