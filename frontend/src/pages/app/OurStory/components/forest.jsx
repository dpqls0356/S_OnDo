import { styled, keyframes } from "styled-components";
import { useEffect, useRef } from "react";
import background from "../../../../assets/images/ourstory/forest.jpg";
import Character from "../../../../assets/images/ourstory/down_character.png";

// 페이드아웃 애니메이션 정의
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
const fadein = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const View = styled.div`
  height: 100%;
  width: 100%;
  background-image: url(${background});
  background-size: cover; /* 이미지가 컨테이너에 맞게 조정됨 */
  background-position: center; /* 이미지가 중앙에 위치함 */
  position: relative;
`;

const Black = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  animation: ${fadeOut} 2s ease-out forwards; /* 2초 동안 페이드아웃 애니메이션 */
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  animation: ${fadein} 2s ease-out forwards;
  position: absolute;
  left: 0;
  top: 0;
`;
const CharacterBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;
const CharacterImg = styled.img`
  position: absolute;
  top: 55%;
  width: 200px;
  height: 130px;
`;

const Btn = styled.button`
  position: absolute;
  top: 0;
  background-color: rgba(0, 0, 0, 0);
  width: 10%;
  height: fit-content;
  z-index: 20;
  pointer-events: all;
`;

export default function Forest({ clickCount, handleClick }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const arr = [];
    const num = 600;
    const tsc = 1;
    const sp = 1;
    const sc = 1.3;
    const mv = 20;
    const min = 1;

    class Flake {
      constructor() {
        this.y = Math.random() * (h + 50);
        this.x = Math.random() * w;
        this.t = Math.random() * (Math.PI * 2);
        this.sz = (100 / (10 + Math.random() * 100)) * sc;
        this.sp = Math.pow(this.sz * 0.8, 2) * 0.15 * sp;
        this.sp = this.sp < min ? min : this.sp;
      }

      draw() {
        this.g = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.sz
        );
        this.g.addColorStop(0, "hsla(255,255%,255%,1)");
        this.g.addColorStop(1, "hsla(255,255%,255%,0)");
        ctx.moveTo(this.x, this.y);
        ctx.fillStyle = this.g;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2, true);
        ctx.fill();
      }
    }

    for (let i = 0; i < num; ++i) {
      arr.push(new Flake());
    }

    const go = () => {
      ctx.clearRect(0, 0, w, h); // 캔버스 초기화, 배경색 없음 (투명 유지)

      for (let i = 0; i < arr.length; ++i) {
        const f = arr[i];
        f.t += 0.05;
        f.t = f.t >= Math.PI * 2 ? 0 : f.t;
        f.y += f.sp;
        f.x += Math.sin(f.t * tsc) * (f.sz * 0.3);
        if (f.y > h + 50) f.y = -10 - Math.random() * mv;
        if (f.x > w + mv) f.x = -mv;
        if (f.x < -mv) f.x = w + mv;
        f.draw();
      }

      requestAnimationFrame(go);
    };

    go();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderView = () => {
    switch (clickCount) {
      case 0:
        return (
          <View>
            <CharacterBox>
              <CharacterImg src={Character} />
            </CharacterBox>
            <Black />
            <Canvas ref={canvasRef} />
            <Btn
              onClick={() => {
                console.log("click");
              }}
            >
              Click!
            </Btn>
          </View>
        );
      default:
        return null;
    }
  };

  return <View>{renderView()}</View>;
}
