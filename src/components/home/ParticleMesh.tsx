"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  originX: number;
  originY: number;
}

export default function ParticleMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let landPoints: { x: number; y: number }[] = [];
    const maxParticles = 140; // Dense network to make the map outline crisp
    const connectionDist = 45; // Connection range
    const mouseDist = 130;
    
    // Offscreen canvas settings for analyzing the map silhouette
    const mapAnalysisSize = 200;
    let mapData: Uint8ClampedArray | null = null;
    let mapW = 0;
    let mapH = 0;
    let tintedCanvas: HTMLCanvasElement | null = null;

    const img = new Image();
    img.src = "/images/africa-map.png";
    img.onload = () => {
      const offCanvas = document.createElement("canvas");
      const offCtx = offCanvas.getContext("2d");
      if (!offCtx) return;

      // Maintain aspect ratio while resizing for analysis
      const scale = Math.min(mapAnalysisSize / img.width, mapAnalysisSize / img.height);
      mapW = Math.floor(img.width * scale);
      mapH = Math.floor(img.height * scale);
      offCanvas.width = mapW;
      offCanvas.height = mapH;
      offCtx.drawImage(img, 0, 0, mapW, mapH);

      const imgData = offCtx.getImageData(0, 0, mapW, mapH);
      mapData = imgData.data;

      // Extract points corresponding to Africa landmass (non-transparent, non-white)
      landPoints = [];
      for (let y = 0; y < mapH; y++) {
        for (let x = 0; x < mapW; x++) {
          const idx = (y * mapW + x) * 4;
          const r = mapData[idx];
          const g = mapData[idx + 1];
          const b = mapData[idx + 2];
          const a = mapData[idx + 3];

          // Exclude absolute transparent (a <= 50) and white elements
          if (a > 50 && !(r > 245 && g > 245 && b > 245)) {
            landPoints.push({ x: x / mapW, y: y / mapH });
          }
        }
      }

      // Pre-render a tinted version of the Africa image in the coordinate color (Cyan)
      tintedCanvas = document.createElement("canvas");
      const tintedCtx = tintedCanvas.getContext("2d");
      if (tintedCtx) {
        tintedCanvas.width = img.width;
        tintedCanvas.height = img.height;
        tintedCtx.fillStyle = "rgb(34, 211, 238)"; // Cyan tint matching coordinates
        tintedCtx.fillRect(0, 0, img.width, img.height);
        tintedCtx.globalCompositeOperation = "destination-in";
        tintedCtx.drawImage(img, 0, 0);
      }

      if (landPoints.length > 0) {
        setImageLoaded(true);
        resizeCanvas();
      }
    };

    const resizeCanvas = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      if (landPoints.length > 0) {
        initParticles();
      }
    };

    const getMapLayout = () => {
      if (!canvas) return { startX: 0, startY: 0, scaleX: 0, scaleY: 0 };
      const w = canvas.width;
      const h = canvas.height;
      const isMobile = w < 1024; // lg breakpoint in Tailwind is 1024px
      
      // Exclude top header height (approx. 80px) and bottom curved wave height (approx. 120px)
      const safeH = h - 200;
      
      if (isMobile) {
        // Center the map in the middle of the safe height
        const size = Math.min(w, safeH) * 0.75;
        const scaleX = size;
        const scaleY = size * (img.height / img.width);
        const startX = (w - scaleX) / 2;
        const startY = 80 + (safeH - scaleY) / 2;
        return { startX, startY, scaleX, scaleY };
      } else {
        // Shift map to the right half of the screen, inside the safe height
        const size = Math.min(w * 0.45, safeH) * 0.8;
        const scaleX = size;
        const scaleY = size * (img.height / img.width);
        const startX = w * 0.5 + (w * 0.5 - scaleX) / 2;
        const startY = 80 + (safeH - scaleY) / 2;
        return { startX, startY, scaleX, scaleY };
      }
    };

    const checkInsideMap = (cx: number, cy: number, startX: number, startY: number, scaleX: number, scaleY: number) => {
      if (!mapData) return false;
      const nx = (cx - startX) / scaleX;
      const ny = (cy - startY) / scaleY;

      if (nx < 0 || nx > 1 || ny < 0 || ny > 1) return false;

      const px = Math.floor(nx * mapW);
      const py = Math.floor(ny * mapH);

      if (px < 0 || px >= mapW || py < 0 || py >= mapH) return false;

      const idx = (py * mapW + px) * 4;
      const r = mapData[idx];
      const g = mapData[idx + 1];
      const b = mapData[idx + 2];
      const a = mapData[idx + 3];

      return a > 50 && !(r > 245 && g > 245 && b > 245);
    };

    const initParticles = () => {
      particles = [];
      const { startX, startY, scaleX, scaleY } = getMapLayout();
      if (landPoints.length === 0) return;

      for (let i = 0; i < maxParticles; i++) {
        const pt = landPoints[Math.floor(Math.random() * landPoints.length)];
        const rx = startX + pt.x * scaleX;
        const ry = startY + pt.y * scaleY;
        
        particles.push({
          x: rx,
          y: ry,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 2 + 1,
          originX: pt.x,
          originY: pt.y
        });
      }
    };

    const animate = () => {
      if (!ctx || !canvas || landPoints.length === 0) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { startX, startY, scaleX, scaleY } = getMapLayout();
      const mouse = mouseRef.current;

      // Draw background Africa map image tinted to coordinate color
      if (tintedCanvas) {
        ctx.globalAlpha = 0.14;
        ctx.drawImage(tintedCanvas, startX, startY, scaleX, scaleY);
      } else {
        ctx.globalAlpha = 0.18;
        ctx.drawImage(img, startX, startY, scaleX, scaleY);
      }
      ctx.globalAlpha = 1.0;

      // Update and draw particles
      particles.forEach((p) => {
        let nextX = p.x + p.vx;
        let nextY = p.y + p.vy;

        const isInside = checkInsideMap(nextX, nextY, startX, startY, scaleX, scaleY);
        if (!isInside) {
          p.vx *= -1;
          p.vy *= -1;
          nextX = p.x + p.vx;
          nextY = p.y + p.vy;

          if (!checkInsideMap(nextX, nextY, startX, startY, scaleX, scaleY)) {
            const pt = landPoints[Math.floor(Math.random() * landPoints.length)];
            p.x = startX + pt.x * scaleX;
            p.y = startY + pt.y * scaleY;
            return;
          }
        }

        p.x = nextX;
        p.y = nextY;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34, 211, 238, 0.75)"; // Cyan dots
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < connectionDist) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / connectionDist) * 0.22;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Mouse hover interaction
        if (mouse.active) {
          const distToMouse = Math.hypot(p1.x - mouse.x, p1.y - mouse.y);
          if (distToMouse < mouseDist) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            const alpha = (1 - distToMouse / mouseDist) * 0.4;
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Attach hover listener to window so it is captured transparently 
    // even though the canvas has pointer-events-none.
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only activate when cursor is within the Hero container bounds
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current.x = x;
        mouseRef.current.y = y;
        mouseRef.current.active = true;
      } else {
        mouseRef.current.active = false;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (container) {
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none bg-transparent overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none z-0" />
    </div>
  );
}
