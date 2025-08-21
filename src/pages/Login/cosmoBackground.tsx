import React, { useRef, useEffect } from "react";

const CosmosBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Estrelas fixas
    const numStars = 200;
    const stars: { x: number; y: number; radius: number; speed: number }[] = [];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5 + 0.2,
      });
    }

    // Estrelas cadentes
    type ShootingStar = {
      x: number;
      y: number;
      length: number;
      speed: number;
      size: number;
      active: boolean;
    };
    const shootingStars: ShootingStar[] = [];

    const spawnShootingStar = () => {
      shootingStars.push({
        x: width - Math.random() * (width * 0.2), // lado direito
        y: Math.random() * (height / 3), // parte de cima
        length: Math.random() * 80 + 100,
        speed: Math.random() * 6 + 4,
        size: Math.random() * 2 + 1,
        active: true,
      });
    };

    const drawStars = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "white";
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const updateStars = () => {
      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
      });
    };

    const drawShootingStars = () => {
      shootingStars.forEach((s, i) => {
        if (!s.active) return;

        ctx.strokeStyle = "white";
        ctx.lineWidth = s.size;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.length, s.y + s.length / 2);
        ctx.stroke();

        // Atualizar posição
        s.x += -s.speed;
        s.y += s.speed / 2;

        // Se saiu da tela, remover
        if (s.x < -s.length || s.y > height + s.length) {
          shootingStars.splice(i, 1);
        }
      });
    };

    const animate = () => {
      drawStars();
      updateStars();
      drawShootingStars();
      requestAnimationFrame(animate);
    };

    animate();

    // Criar estrelas cadentes a cada 2 e 3 segundos
    const interval2s = setInterval(() => spawnShootingStar(), 2000);
    const interval3s = setInterval(() => spawnShootingStar(), 3000);

    // Ajustar tamanho ao redimensionar
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval2s);
      clearInterval(interval3s);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default CosmosBackground;
