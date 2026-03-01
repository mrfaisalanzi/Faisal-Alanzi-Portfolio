import { useEffect, useState } from "react";
import { motion } from "motion/react";

type TypewriterProps = {
  text: string;
  speed?: number;
  delay?: number;
  highlightWord?: string;
  highlightClassName?: string;
};

export function Typewriter({
  text,
  speed = 100,
  delay = 0,
  highlightWord,
  highlightClassName = "",
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const highlightStart = highlightWord ? text.indexOf(highlightWord) : -1;
  const hasHighlight = highlightStart >= 0 && !!highlightWord;
  const safeHighlightWord = hasHighlight ? highlightWord! : "";

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    
    setDisplayedText("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, started]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="inline-block"
    >
      {!hasHighlight && displayedText}
      {hasHighlight && (
        <>
          {displayedText.slice(0, highlightStart)}
          <span className={highlightClassName}>
            {displayedText.slice(
              highlightStart,
              Math.min(displayedText.length, highlightStart + safeHighlightWord.length),
            )}
          </span>
          {displayedText.slice(
            Math.min(displayedText.length, highlightStart + safeHighlightWord.length),
          )}
        </>
      )}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[2px] h-[1em] bg-current ml-1 align-middle"
      />
    </motion.span>
  );
}
