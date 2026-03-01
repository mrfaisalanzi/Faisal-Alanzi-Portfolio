import { useEffect, useRef } from "react";

type LetterGlitchProps = {
  glitchColors?: string[];
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
};

const CHARS = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*";

export function LetterGlitch({
  glitchColors = ["#7cff67"],
  glitchSpeed = 50,
  centerVignette = true,
  outerVignette = false,
  smooth = true,
}: LetterGlitchProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let lastTick = 0;
    let cols = 0;
    let drops: number[] = [];
    const fontSize = 16;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * window.devicePixelRatio));
      canvas.height = Math.max(1, Math.floor(rect.height * window.devicePixelRatio));
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      cols = Math.ceil(rect.width / fontSize);
      drops = Array.from({ length: cols }, () => Math.floor(Math.random() * 20));
    };

    const draw = (t: number) => {
      if (t - lastTick < glitchSpeed) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      lastTick = t;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      ctx.fillStyle = smooth ? "rgba(0, 0, 0, 0.08)" : "rgba(0, 0, 0, 0.22)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < cols; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const color = glitchColors[Math.floor(Math.random() * glitchColors.length)] || "#7cff67";
        ctx.fillStyle = color;
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }

      if (centerVignette) {
        const grad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.5,
          Math.min(width, height) * 0.15,
          width * 0.5,
          height * 0.5,
          Math.max(width, height) * 0.6,
        );
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(1, "rgba(0,0,0,0.38)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      if (outerVignette) {
        const grad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.5,
          Math.min(width, height) * 0.4,
          width * 0.5,
          height * 0.5,
          Math.max(width, height) * 0.8,
        );
        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(1, "rgba(0,0,0,0.55)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      rafId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [centerVignette, glitchColors, glitchSpeed, outerVignette, smooth]);

  return <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />;
}
