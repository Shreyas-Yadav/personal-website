import { useMemo, useEffect, useState, useRef } from "react";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";
import styles from "./Hero.module.css";

export function Hero() {
  const nameText = "Shreyas Yadav";
  const heroTitleRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const [filledChars, setFilledChars] = useState(new Set());
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { isIntersecting } = useIntersectionObserver(heroTitleRef, {
    threshold: 0.3,
    triggerOnce: false,
  });

  useEffect(() => {
    if (isIntersecting) {
      setTitleVisible(true);
      setFilledChars(new Set()); // Reset filled chars when re-entering
    } else {
      setTitleVisible(false);
      setFilledChars(new Set()); // Reset when leaving
    }
  }, [isIntersecting]);

  // Mark chars as filled after animation
  useEffect(() => {
    if (!titleVisible) return;

    const fullText = "Backend Systems";
    let charIdx = 0;
    const timeouts = [];

    for (let i = 0; i < fullText.length; i++) {
      if (fullText[i] !== " ") {
        const delay = 500 + charIdx * 80 + 2000; // matches CSS
        const timeout = setTimeout(() => {
          setFilledChars((prev) => new Set([...prev, i]));
        }, delay);
        timeouts.push(timeout);
        charIdx++;
      }
    }

    return () => timeouts.forEach(clearTimeout);
  }, [titleVisible]);

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

  // Split hero title into lines and characters
  const titleLines = useMemo(() => {
    const lines = [
      { text: "Backend", word: "Backend" },
      { text: "Systems", word: "Systems" },
    ];

    let globalCharIndex = 0;

    return lines.map((line, lineIndex) => {
      const chars = line.text.split("").map((char, i) => {
        if (char === " ") {
          return {
            char: "\u00A0",
            index: i,
            charIndex: -1,
            globalIndex: globalCharIndex++,
          };
        }
        const result = {
          char,
          index: i,
          charIndex: globalCharIndex,
          globalIndex: globalCharIndex,
        };
        globalCharIndex++;
        return result;
      });

      return {
        ...line,
        chars,
        lineIndex,
      };
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
        <h1
          ref={heroTitleRef}
          className={`${styles.heroTitle} ${titleVisible ? styles.visible : ""}`}
        >
          {titleLines.map(({ word, chars, lineIndex }) => (
            <span key={lineIndex} className={styles.line}>
              <span className={styles.word} data-text={word}>
                {chars.map(({ char, index, charIndex, globalIndex }) => (
                  <span
                    key={index}
                    className={`${styles.heroChar} ${filledChars.has(globalIndex) ? styles.filled : ""}`}
                    style={{ "--char-index": charIndex >= 0 ? charIndex : 0 }}
                    data-char={char}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </span>
          ))}
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
