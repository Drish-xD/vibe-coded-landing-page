"use client";

import { gsap, useGSAP } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Track mouse position for card effect
  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = card.getBoundingClientRect();

      // Calculate the center of the card
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate the distance from the center (-1 to 1 range)
      const ratioX = (clientX - centerX) / (rect.width / 2);
      const ratioY = (clientY - centerY) / (rect.height / 2);

      // Apply the transform with limited range for more subtle effect
      card.style.transform = `perspective(1000px) rotateX(${
        -ratioY * 5
      }deg) rotateY(${ratioX * 5}deg)`;
    };

    const handleMouseLeave = () => {
      // Reset the transform when mouse leaves
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    };

    window.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // GSAP animations using the official hook
  useGSAP(
    () => {
      // Set initial state to ensure elements are visible if animation fails
      gsap.set(".hero-title, .hero-subtitle, .hero-card, .hero-cta", {
        opacity: 1,
        y: 0,
      });

      const tl = gsap.timeline();

      // Animate heading
      tl.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate subtitle
      tl.from(
        ".hero-subtitle",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // Animate card
      tl.from(
        ".hero-card",
        {
          y: 40,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "-=0.6"
      );

      // Animate CTA button
      tl.from(
        ".hero-cta",
        {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.4"
      );
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-16 pb-24 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column: Text content */}
          <div>
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Fast, Transparent
              <br />
              <span className="text-primary">Loans</span> at Your Fingertips
            </h1>

            <p className="hero-subtitle mt-6 text-xl text-gray-600 max-w-lg">
              Get instant approval on loans with minimal paperwork and
              competitive interest rates. Apply now and receive funds in 24
              hours.
            </p>

            <div className="mt-8 flex flex-col items-center sm:flex-row gap-4">
              <Link
                href="#get-started"
                className={cn(
                  "hero-cta inline-flex items-center justify-center px-6 py-3 rounded-full",
                  "bg-primary text-white font-medium transition-all",
                  "hover:bg-primary/90 hover:shadow-lg"
                )}
              >
                Get Started <ArrowRight className="ml-2" size={18} />
              </Link>

              <Link
                href="#how-it-works"
                className="hero-cta inline-flex items-center justify-center px-6 py-3 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                How It Works
              </Link>
            </div>
          </div>

          {/* Right column: Credit card */}
          <div className="flex justify-center lg:justify-end">
            <div
              ref={cardRef}
              className="hero-card relative w-full max-w-md"
              style={{
                transformStyle: "preserve-3d",
                transition: "transform 0.1s ease-out",
              }}
            >
              <div className="w-full h-64 sm:h-80 bg-primary rounded-2xl shadow-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-primary-600 opacity-80"></div>

                {/* Card elements */}
                <div className="relative z-10 p-6 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <div className="text-white font-bold text-xl">LoanCred</div>
                    <div className="w-12 h-12 bg-white/20 rounded-full backdrop-blur-md"></div>
                  </div>

                  <div className="flex flex-col">
                    <div className="text-white/70 text-sm">Card Number</div>
                    <div className="text-white text-lg font-medium tracking-widest">
                      •••• •••• •••• 4242
                    </div>

                    <div className="mt-4 flex justify-between">
                      <div>
                        <div className="text-white/70 text-xs">Valid Thru</div>
                        <div className="text-white">12/26</div>
                      </div>
                      <div>
                        <div className="text-white/70 text-xs">CVC</div>
                        <div className="text-white">***</div>
                      </div>
                      <div>
                        <div className="text-white/70 text-xs">Name</div>
                        <div className="text-white">J. Smith</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/20 opacity-20 pointer-events-none"></div>
              </div>

              {/* Drop shadow element */}
              <div
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-5/6 h-6 bg-black/10 rounded-full blur-xl"
                style={{ zIndex: -1 }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-1/3 left-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-16 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
}
