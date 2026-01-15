"use client"

import Image from 'next/image'
import styles from './contactJason.module.css'
import { useContext, useEffect, useRef, useState } from 'react'
import contactCardList from '@/app/data/contactCardList'

function ContactBalls ({imgSrc, link, hoverText, ...props}) {

    const [isHovered, setIsHovered] = useState(false)

    return <div className={styles.contactBallContainer} {...props} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <a href={link} target="_blank" className={styles.contactBallLink}>
            <div className={styles.contactBall}>
                <div className={styles.contactBallBlur}></div>
                <img src={imgSrc} className={styles.contactBallImage} style={{
                    //lighten the svg on hover
                    filter: isHovered ? "brightness(3)" : "brightness(1)"
                }}/>
                <p className={`${styles.contactBallText} ${isHovered ? styles.hovered : ''}`}>{hoverText}</p>
            </div>
        </a>
    </div>
}

function CircularCarousel({ width, height, contactCardList, ...props}) {
    const angleStep = (2 * Math.PI) / contactCardList.length;
    const radius = Math.min(1150, Math.min(globalThis?.window.innerHeight, globalThis?.window.innerWidth)) * 0.75 / 2; // Half of the diameter (850/2)
    const rotationSpeed = 0.0005; // Adjust the rotation speed as needed

    // console.log(radius)
  
    const [rotationAngle, setRotationAngle] = useState(0);
  
    useEffect(() => {
      const rotateCarousel = () => {
        setRotationAngle((prevAngle) => {
          const newAngle = prevAngle + rotationSpeed;
  
          if (newAngle >= 2 * Math.PI) {
            return newAngle - 2 * Math.PI;
          }
  
          return newAngle;
        });
  
        requestAnimationFrame(rotateCarousel);
      };
  
      const animationId = requestAnimationFrame(rotateCarousel);
  
      return () => {
        cancelAnimationFrame(animationId);
      };
    }, [rotationSpeed]);
  
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
            animation: `${styles.fadeIn} 1s ease-in-out forwards ${index * 0.1 + 0.5}s 1`,
          };
  
          return (
            <ContactBalls
              style={cardStyle}
              key={index}
              imgSrc={item.image}
              link={item.link}
              hoverText={item.title}
            />
          );
        })}
      </div>
    );
  }
  


export default function ContactJason ({...props}) {

    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        function handleResize() {
            setWidth(globalThis.window?.innerWidth)
            setHeight(globalThis.window?.innerHeight)
        }
        window.addEventListener('resize', handleResize)
        
        setWidth(globalThis.window?.innerWidth)
        setHeight(globalThis.window?.innerHeight)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if (width == 0 || height == 0) {
        return <></>
    }

    return <>
        <div className={styles.primalContainer} {...props} style={{
        }}>

            <div className={styles.backgroundOrbitalsContainer}>
                <img src="./images/contact/smallBackgrondOrbital.svg" style={{
                  width: 0.75 * Math.min(1150, Math.min(height, width)),
                  height:  0.75 * Math.min(1150, Math.min(height, width)),
                  /** Final target opacity for small ring */
                  '--final-opacity': '0.35'
                }} />
                <img src="./images/contact/mediumBackgroundOrbital.svg" style={{
                  width: 1 * Math.min(1150, Math.min(height, width)),
                  height:  1 * Math.min(1150, Math.min(height, width)),
                  /** Final target opacity for medium ring */
                  '--final-opacity': '0.25'
                }} />
                <img src="./images/contact/largeBackgroundOrbital.svg" style={{
                  width: 1.25 * Math.min(1150, Math.min(height, width)),
                  height:  1.25 * Math.min(1150, Math.min(height, width)),
                  /** Final target opacity for large ring */
                  '--final-opacity': '0.15'
                }} />
            </div>

            <div className={styles.titleContainer}>
                <div className={styles.titleImageSubContainer} style={{
                  marginTop: globalThis.window?.innerHeight > 600 ? 0 : 50
                }}>
                    {height > 600 && <img src="./images/jason/jason.svg" className={styles.jasonImage} style={{
                      width: Math.min(1, height / 1000) * 240
                    }}/>}
                    <h1 className={styles.nameTitle} style={{
                        fontSize: Math.min(75, 75 * width / 600) * Math.min(1, height / 1000),
                        marginTop: height < 600 ? 35 : 0,
                        maxWidth: height < 600 ? 250 : 600
                    }}>
                        JASON XU
                    </h1>
                    {globalThis.window?.innerHeight > 1000 && <p className={styles.nameSubtitle} style={{
                        fontSize: Math.min(20, 20 * width / 500)
                    }}>
                        <span className={styles.highlight}>ENTREPRENEUR, INNOVATOR, CREATIVE</span>
                    </p>}
                </div>
            </div>

            <CircularCarousel width={width} height={height} contactCardList={contactCardList} style={{
                zIndex: 1000
            }}/>
        </div>
    </>
}
