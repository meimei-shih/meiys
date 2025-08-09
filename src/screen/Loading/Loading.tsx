import React, { useRef, useEffect } from "react";
import { useTrail, animated } from '@react-spring/web';
import './Loading.css';

const LETTERS = ['L', 'O', 'A', 'D', 'I', 'N', 'G']

const Loading: React.FC = () => {
  const [trail, api] = useTrail(LETTERS.length, () => ({
    rotateX: 0,
  }));

  const isFlipped = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isFlipped.current) {
        api.start({
          rotateX: 0,
        })
        isFlipped.current = false
      } else {
        api.start({
          rotateX: 180,
        })
        isFlipped.current = true
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="loading-page">
      <div className="loader-container">
        {trail.map(({ rotateX }, i) => (
          <div className="letter-box" key={i}>
            <animated.div
              className="front-box"
              style={{
                transform: rotateX.to(val => `perspective(600px) rotateX(${val}deg)`),
                transformStyle: 'preserve-3d',
              }}>
              {LETTERS[i]}
            </animated.div>
            <animated.div
              className="back-box"
              style={{
                transform: rotateX.to(val => `perspective(600px) rotateX(${180 - val}deg)`),
                transformStyle: 'preserve-3d',
              }}>
              {LETTERS[i]}
            </animated.div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loading;