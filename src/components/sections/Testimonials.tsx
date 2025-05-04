"use client";

import { testimonials } from '@/constants/testimonials';
import { gsap, useGSAP } from "@/lib/animation";
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // GSAP animations
  useGSAP(() => {
    // Set initial state to ensure elements are visible if animation fails
    gsap.set(".testimonials-title, .testimonials-description, .testimonial-card", { 
      opacity: 1 
    });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      }
    });
    
    // Animate section title
    tl.from(".testimonials-title", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    });
    
    // Animate section description
    tl.from(".testimonials-description", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.3");
    
    // Animate testimonial cards
    tl.from(".testimonial-card", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.3");
    
  }, { scope: sectionRef });
  
  // Handle auto-rotation
  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        if (!isPaused && !isAnimating) {
          handleNext();
        }
      }, 5000);
    };
    
    const stopAutoPlay = () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
    
    startAutoPlay();
    
    return () => {
      stopAutoPlay();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, isAnimating]);
  
  // Navigate to previous testimonial
  const handlePrev = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => {
      const newIndex = prev === 0 ? testimonials.length - 1 : prev - 1;
      return newIndex;
    });
    
    // Delay to allow animation to complete
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  // Navigate to next testimonial
  const handleNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => {
      const newIndex = prev === testimonials.length - 1 ? 0 : prev + 1;
      return newIndex;
    });
    
    // Delay to allow animation to complete
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  // Jump to a specific testimonial
  const handleDotClick = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    
    setIsAnimating(true);
    setActiveIndex(index);
    
    // Delay to allow animation to complete
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const handleKeyDown = (event: React.KeyboardEvent, callback: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback();
    }
  };
  
  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="py-20 bg-gray-50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="testimonials-title text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="testimonials-description text-xl text-gray-600">
            Thousands of customers trust our platform for their lending needs.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Testimonial Carousel */}
          <div className="relative">
            <div className="testimonial-card bg-white rounded-xl shadow-sm p-8 relative">
              {/* Quote icon */}
              <div className="absolute top-8 right-8 text-primary/10">
                <Quote size={48} />
              </div>
              
              {/* Testimonial content */}
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden mr-4">
                    <div className="bg-gray-300 absolute inset-0 flex items-center justify-center">
                      {testimonials[activeIndex].image ? (
                        <Image 
                          src={testimonials[activeIndex].image} 
                          alt={testimonials[activeIndex].name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-xl font-semibold text-gray-600">
                          {testimonials[activeIndex].name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{testimonials[activeIndex].name}</h3>
                    <p className="text-gray-600">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
                
                <p className="text-lg text-gray-700 italic transition-opacity duration-300">
                  &quot;{testimonials[activeIndex].quote}&quot;
                </p>
              </div>
            </div>
            
            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handlePrev}
                  onKeyDown={(e) => handleKeyDown(e, handlePrev)}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  disabled={isAnimating}
                  tabIndex={0}
                >
                  <ChevronLeft size={20} />
                </button>
                
                <button
                  type="button"
                  onClick={handleNext}
                  onKeyDown={(e) => handleKeyDown(e, handleNext)}
                  aria-label="Next testimonial"
                  className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  disabled={isAnimating}
                  tabIndex={0}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              
              {/* Dots navigation */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleDotClick(index)}
                    onKeyDown={(e) => handleKeyDown(e, () => handleDotClick(index))}
                    aria-label={`Go to testimonial ${index + 1}`}
                    aria-current={index === activeIndex ? 'true' : 'false'}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all",
                      index === activeIndex
                        ? "bg-primary scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    )}
                    disabled={isAnimating}
                    tabIndex={0}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <p className="text-gray-600">Customer Satisfaction</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <p className="text-gray-600">Loans Approved</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">$250M+</div>
              <p className="text-gray-600">Funds Disbursed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 