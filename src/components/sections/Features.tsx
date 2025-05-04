"use client";

import { features } from '@/constants/features';
import { gsap, useGSAP } from "@/lib/animation";
import { useRef } from 'react';

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    // Set initial state to ensure elements are visible if animation fails
    gsap.set(".feature-card, .features-title, .features-description", { 
      opacity: 1 
    });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play none none none",
        // For debugging
        markers: false,
      }
    });
    
    // Animate section title
    tl.from(".features-title", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    });
    
    // Animate section description
    tl.from(".features-description", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.3");
    
    // Stagger animate feature cards
    tl.from(".feature-card", {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.3");
    
  }, { scope: sectionRef });
  
  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="py-20 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="features-title text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform
          </h2>
          <p className="features-description text-xl text-gray-600">
            We&apos;ve simplified the loan process to make financing accessible to everyone with transparent terms and fast approvals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="feature-card bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <feature.icon className="text-primary" size={24} />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 