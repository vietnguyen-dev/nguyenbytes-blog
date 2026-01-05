import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

interface Circle {
  x: number;
  y: number;
  alpha: number;
  scale: number;
}

const MouseTrail = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const circlesRef = useRef<Circle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Add new circle
      circlesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        alpha: 0.5,
        scale: 1,
      });

      // Limit the number of circles
      if (circlesRef.current.length > 15) {
        circlesRef.current.shift();
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Determine color based on theme (opposite of background)
      const isDark = theme === "black";
      const color = isDark ? "255, 255, 255" : "0, 0, 0"; // White for dark theme, black for light theme

      // Update and draw circles
      circlesRef.current = circlesRef.current.filter((circle) => {
        circle.alpha -= 0.02;
        circle.scale += 0.02;

        if (circle.alpha <= 0) return false;

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, 10 * circle.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${circle.alpha})`;
        ctx.fill();

        return true;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [theme]);

  const isDark = theme === "black";

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: isDark ? "screen" : "multiply" }}
    />
  );
};

export default MouseTrail;
