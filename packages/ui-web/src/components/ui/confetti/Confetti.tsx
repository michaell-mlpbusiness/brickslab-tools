'use client';

import React, { useEffect, useRef } from "react";
import { ConfettiProps } from "./Confetti.type";

export function Confetti({
  particleCount = 50,
  angle = 90,
  spread = 45,
  startVelocity = 45,
  decay = 0.9,
  gravity = 1,
  drift = 0,
  flat = false,
  ticks = 200,
  origin = { x: 0.5, y: 0.5 },
  colors = ["#CC4A48", "#4ADE80", "#FBFBFB"],
  shapes = ["circle", "square"],
  zIndex = 9999,
  disableForReducedMotion = true,
  scalar = 1,
  className = "",
  onFire,
}: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (
      disableForReducedMotion &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    const dims = { w: window.innerWidth, h: window.innerHeight };
    canvas.width = dims.w * dpr;
    canvas.height = dims.h * dpr;
    ctx.scale(dpr, dpr);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      shape: string;
      color: string;
      size: number;
      rotation: number;
      rotationSpeed: number;
      wobble: number;
      wobbleSpeed: number;
    }

    const particles: Particle[] = [];
    const baseSize = 6 * scalar;

    for (let i = 0; i < particleCount; i++) {
      const angleRad =
        ((angle + spread * (Math.random() - 0.5)) * Math.PI) / 180;
      const velocity = startVelocity * (0.5 + Math.random() * 0.5);

      particles.push({
        x: dims.w * origin.x,
        y: dims.h * origin.y,
        vx: Math.cos(angleRad) * velocity + drift * (Math.random() - 0.5),
        vy: -Math.sin(angleRad) * velocity,
        life: 1,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: baseSize + Math.random() * baseSize,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: flat ? 0 : (Math.random() - 0.5) * 0.25,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: flat ? 0 : (Math.random() - 0.5) * 0.15,
      });
    }

    onFire?.({});

    let rafId: number;

    const animate = () => {
      ctx.clearRect(0, 0, dims.w, dims.h);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.vy += gravity * 0.5;
        p.vx *= decay;
        p.vy *= decay;
        p.wobble += p.wobbleSpeed;
        p.vx += Math.sin(p.wobble) * 0.3;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.life -= 1 / ticks;

        if (p.life <= 0 || p.y > dims.h + 20) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        // Stay fully opaque until the last third of life, then fade
        ctx.globalAlpha = Math.min(p.life * 1.5, 1);
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.shape === "circle") {
          // Ellipse (more natural than perfect circle)
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size / 3, p.size / 2, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "square") {
          // Thin rectangle: classic confetti strip shape
          ctx.fillRect(-p.size / 6, -p.size / 2, p.size / 3, p.size);
        } else if (p.shape === "star") {
          const spikes = 5;
          const outerRadius = p.size / 2;
          const innerRadius = p.size / 4;
          ctx.beginPath();
          for (let j = 0; j < spikes * 2; j++) {
            const radius = j % 2 === 0 ? outerRadius : innerRadius;
            const x = Math.cos((j * Math.PI) / spikes) * radius;
            const y = Math.sin((j * Math.PI) / spikes) * radius;
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }

      if (particles.length > 0) {
        rafId = requestAnimationFrame(animate);
      }
    };

    animate();

    const handleResize = () => {
      dims.w = window.innerWidth;
      dims.h = window.innerHeight;
      canvas.width = dims.w * dpr;
      canvas.height = dims.h * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: zIndex,
        pointerEvents: "none",
      }}
      className={className}
    />
  );
}
