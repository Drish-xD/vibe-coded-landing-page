"use client";

import { processSteps } from '@/constants/process-steps';
import { gsap, useGSAP } from '@/lib/animation';
import { useRef } from 'react';

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    // Set initial state to ensure elements are visible if animation fails
    gsap.set(".how-title, .how-description, .timeline-line, .process-step, .step-number", { 
      opacity: 1 
    });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none none",
      }
    });
    
    // Animate section title
    tl.from(".how-title", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    });
    
    // Animate section description
    tl.from(".how-description", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.3");
    
    // Animate timeline line
    tl.from(".timeline-line", {
      scaleY: 0,
      transformOrigin: "top",
      duration: 1,
      ease: "power2.inOut"
    }, "-=0.3");
    
    // Stagger animate process steps
    tl.from(".process-step", {
      x: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.7");
    
    // Animate step numbers
    tl.from(".step-number", {
      scale: 0.5,
      opacity: 0,
      duration: 0.4,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.8");
    
  }, { scope: sectionRef });
  
  return (
    <section 
      id="how-it-works" 
      ref={sectionRef}
      className="py-20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="how-title text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="how-description text-xl text-gray-600">
            Our simple 3-step process makes it easy to get the funds you need in record time.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="timeline-line absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gray-200"></div>
          
          {/* Process steps */}
          <div className="relative space-y-12 md:space-y-24">
            {processSteps.map((step, index) => (
              <div 
                key={step.id}
                className={`process-step flex flex-col md:flex-row ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className="md:w-1/2 relative px-6 py-4 md:px-12">
                  <div className="bg-white rounded-xl shadow-sm p-6 relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <step.icon className="text-primary" size={24} />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {/* Timeline bubble */}
                <div className="step-number absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold z-20">
                  {step.step}
                </div>
                
                {/* Empty space for the other side */}
                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 