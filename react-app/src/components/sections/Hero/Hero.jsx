import { useMemo, useEffect, useState } from "react";
import { LiquidFillText } from "../../common/LiquidFillText";
import styles from "./Hero.module.css";

export function Hero() {
  const nameText = "Shreyas Yadav";
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Split name into characters with index
  const nameChars = useMemo(() => {
    let charIndex = 0;
    return nameText.split("").map((char, i) => {
      if (char === " ") {
        return { char: "\u00A0", index: i, charIndex: -1 };
      }
      const result = { char, index: i, charIndex };
      charIndex++;
      return result;
    });
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroBg}>
        <div className={styles.gradientMesh} />
      </div>

      <div className={styles.dateTime}>
        <div className={styles.time}>
          {time.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </div>
        <div className={styles.date}>
          {time.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>
      <div className={styles.heroContent}>
        <h2 className={styles.heroName}>
          {nameChars.map(({ char, index, charIndex }) => (
            <span
              key={index}
              className={styles.nameChar}
              style={{ "--name-char-index": charIndex >= 0 ? charIndex : 0 }}
            >
              {char}
            </span>
          ))}
        </h2>
        <p className={styles.heroSubtitle}>Software Engineer</p>
        <h1 className={styles.heroTitle}>
          <span className={styles.line}>
            <LiquidFillText
              text="Backend"
              tag="span"
              charDelay={0.08}
              fillDelay={0.45}
              animationDuration={1.5}
            />
          </span>
          <span className={styles.line}>
            <LiquidFillText
              text="Systems"
              tag="span"
              charDelay={0.08}
              fillDelay={0.95}
              animationDuration={1.5}
            />
          </span>
        </h1>
        <p className={styles.heroMeta}>
          I build distributed services, REST APIs, cloud infrastructure, and
          AI-powered systems with Go, Java, Python, AWS, Docker, and Kubernetes.
        </p>
      </div>
      <a
        href="#experience"
        className={styles.scrollCue}
        aria-label="Scroll to experience"
      >
        <span />
      </a>
    </section>
  );
}
