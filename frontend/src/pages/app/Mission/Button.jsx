import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  width: 200px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  background: #333;
  text-align: center;
  z-index: 10;
  transition: 0.2s;
  cursor: pointer;
  color: #fff;
  box-shadow: 0px 1px 5px 2px #bfceef;
  &:active,
  &:hover,
  &:focus {
    outline: none !important;
    color: white;
  }
  &:active {
    transform: scale(0.9) translate(-55%, -55%);
  }
`;

const ParticlesContainer = styled.div`
  width: 200px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  overflow: visible;
`;

const Particle = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: boom ${(props) => props.duration}ms forwards;
  @keyframes boom {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(${(props) => props.x}px, ${(props) => props.y}px)
        scale(0);
    }
  }
`;

const ButtonComponent = () => {
  const [particles, setParticles] = useState([]);

  const handleBoom = (e) => {
    const colors = ["#ffb3f6", "#7aa0ff", "#333"];
    const numParticles = 30;
    const newParticles = [];

    for (let i = 0; i < numParticles; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 100;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      const duration = Math.random() * 500 + 500;

      newParticles.push({
        id: i,
        color,
        x,
        y,
        duration,
      });
    }

    setParticles(newParticles);

    setTimeout(() => {
      setParticles([]);
    }, 1000);
  };

  return (
    <ButtonContainer>
      <Button onClick={handleBoom}>Click Me!</Button>
      <ParticlesContainer>
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            color={particle.color}
            x={particle.x}
            y={particle.y}
            duration={particle.duration}
          />
        ))}
      </ParticlesContainer>
    </ButtonContainer>
  );
};

export default ButtonComponent;
