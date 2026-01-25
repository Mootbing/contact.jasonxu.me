
"use client"

import Image from 'next/image';
import styles from './contactJason.module.css';
import { useEffect, useRef, useState } from 'react';
import contactCardList from '@/app/data/contactCardList';
import * as constants from './contactJason.constants';


function ContactBalls({ imgSrc, link, hoverText, ballSize, ...props }) {
  const [isHovered, setIsHovered] = useState(false);
  const ballStyle = {
    width: ballSize,
    height: ballSize,
    minWidth: constants.BALL_MIN_SIZE,
    minHeight: constants.BALL_MIN_SIZE,
    maxWidth: constants.BALL_MAX_SIZE,
    maxHeight: constants.BALL_MAX_SIZE,
  };
  return (
    <div
      className={styles.contactBallContainer}
      {...props}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={link} target="_blank" rel="noopener noreferrer" className={styles.contactBallLink} aria-label={hoverText}>
        <div className={styles.contactBall} style={ballStyle}>
          <div className={styles.contactBallBlur} style={ballStyle}></div>
          <Image src={imgSrc} alt={hoverText} className={styles.contactBallImage} style={{ ...ballStyle, filter: isHovered ? "brightness(3)" : "brightness(1)" }} width={ballSize} height={ballSize} />
          <p className={isHovered ? `${styles.contactBallText} ${styles.hovered}` : styles.contactBallText}>{hoverText}</p>
        </div>
      </a>
    </div>
  );
}

function CircularCarousel({ width, height, contactCardList, ...props }) {
  const angleStep = (2 * Math.PI) / contactCardList.length;
  const radius = Math.min(constants.MAX_DIMENSION, Math.min(height, width)) * constants.SMALL_ORBITAL_SCALE / 2;
  const [rotationAngle, setRotationAngle] = useState(0);
  const animationRef = useRef();

  useEffect(() => {
    function rotateCarousel() {
      setRotationAngle((prevAngle) => {
        const newAngle = prevAngle + constants.ROTATION_SPEED;
        return newAngle >= 2 * Math.PI ? newAngle - 2 * Math.PI : newAngle;
      });
      animationRef.current = requestAnimationFrame(rotateCarousel);
    }
    animationRef.current = requestAnimationFrame(rotateCarousel);
    return () => cancelAnimationFrame(animationRef.current);
  }, [width, height]);

  const ballSize = Math.max(constants.BALL_MIN_SIZE, Math.min(constants.BALL_MAX_SIZE, width / constants.BALLS_PER_ROW));
  return (
    <div
      className={styles.contactCardContainer}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
      {...props}
    >
      {contactCardList.map((item, index) => {
        const x = radius * Math.cos(rotationAngle + index * angleStep) + width / 2;
        const y = radius * Math.sin(rotationAngle + index * angleStep) + height / 2;
        const cardStyle = {
          position: "absolute",
          left: `${x}px`,
          top: `${y}px`,
          transform: "translate(-50%, -50%)",
          zIndex: 100 - index,
          opacity: 0,
          animation: `${styles.fadeIn} 1s ease-in-out forwards ${index * constants.ANIMATION_STEP + constants.ANIMATION_BASE_DELAY}s 1`,
        };
        return (
          <ContactBalls
            style={cardStyle}
            key={item.id || item.link || index}
            imgSrc={item.image}
            link={item.link}
            hoverText={item.title}
            ballSize={ballSize}
          />
        );
      })}
    </div>
  );
}
  



export default function ContactJason({ ...props }) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    function handleResize() {
      if (typeof window !== 'undefined') {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (width === 0 || height === 0) {
    return null;
  }

  const minDim = Math.min(constants.MAX_DIMENSION, Math.min(height, width));

  return (
    <div className={styles.primalContainer} {...props}>
      <div className={styles.backgroundOrbitalsContainer}>
          <Image src="/images/contact/smallBackgrondOrbital.svg" alt="Small Orbital" width={minDim * constants.SMALL_ORBITAL_SCALE} height={minDim * constants.SMALL_ORBITAL_SCALE} style={{ '--final-opacity': width < 800 ? 0.25 : 1, animation: `${styles.fadeInToOpacity} 1s ease-in-out forwards` }} />
          <Image src="/images/contact/mediumBackgroundOrbital.svg" alt="Medium Orbital" width={minDim * constants.MEDIUM_ORBITAL_SCALE} height={minDim * constants.MEDIUM_ORBITAL_SCALE} style={{ '--final-opacity': width < 800 ? 0.25 : 1, animation: `${styles.fadeInToOpacity} 1s ease-in-out forwards 0.2s` }} />
          <Image src="/images/contact/largeBackgroundOrbital.svg" alt="Large Orbital" width={minDim * constants.LARGE_ORBITAL_SCALE} height={minDim * constants.LARGE_ORBITAL_SCALE} style={{ '--final-opacity': width < 800 ? 0.25 : 1, animation: `${styles.fadeInToOpacity} 1s ease-in-out forwards 0.4s` }} />
      </div>
      <div className={styles.titleContainer}>
        <div className={styles.titleImageSubContainer} style={{ marginTop: height > constants.SCREEN_HEIGHT_THRESHOLD ? 0 : 50 }}>
            <Image src="/images/jason/jason.svg" alt="Jason Xu" className={styles.jasonImage} width={Math.min(1, height / 1000) * constants.JASON_IMAGE_SIZE} height={Math.min(1, height / 1000) * constants.JASON_IMAGE_SIZE} style={{ opacity: 1, animation: `${styles.fadeInToOpacity} 1s ease-in-out forwards 1.2s`, '--final-opacity': width < 800 ? 0.25 : 1 }} />
            <h1 className={styles.nameTitle} style={{
              fontSize: Math.min(constants.TITLE_FONT_SIZE, constants.TITLE_FONT_SIZE * width / 600) * Math.min(1, height / 1000),
              marginTop: height < constants.SCREEN_HEIGHT_THRESHOLD ? constants.TITLE_MARGIN_TOP_SMALL : 0,
              maxWidth: height < constants.SCREEN_HEIGHT_THRESHOLD ? constants.TITLE_MAX_WIDTH_SMALL : constants.TITLE_MAX_WIDTH,
              '--final-opacity': width < 800 ? 0.25 : 1,
              animation: `${styles.fadeInToOpacity} 1s ease-in-out forwards 0.8s`,
            }}>
              JASON XU
            </h1>
            <p className={styles.nameSubtitle} style={{
              fontSize: Math.min(constants.SUBTITLE_FONT_SIZE, constants.SUBTITLE_FONT_SIZE * width / 500),
              display: 'block',
              '--final-opacity': width < 800 ? 0.25 : 1,
              animation: `${styles.fadeInToOpacity} 1s ease-in-out forwards 1s`,
            }}>
              <span className={styles.highlight}>ENTREPRENEUR, INNOVATOR, CREATIVE</span>
            </p>
        </div>
      </div>
      <CircularCarousel width={width} height={height} contactCardList={contactCardList} style={{ zIndex: 1000 }} />
    </div>
  );
}
