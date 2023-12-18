import clsx from "clsx";
import { useInView, motion } from "framer-motion";
import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const AnimatedText = ({ text, className, variants, stagger, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });
  stagger = stagger ? stagger : 0.01;
  delay = delay ? delay : 0.01;

  return (
    <p className={className}>
      <motion.span
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {text.split(" ").map((word, i) => {
          return (
            <>
              {[...word].map((char) => {
                return (
                  <motion.span
                    variants={variants}
                    className={clsx("inline-block", { className })}
                    key={uuidv4()}
                  >
                    {char}
                  </motion.span>
                );
              })}
              {/* only add spaces between words */}
              {i + 1 === text.split(" ").length ? (
                ""
              ) : (
                <span key={uuidv4()}>&nbsp;</span>
              )}
            </>
          );
        })}
      </motion.span>
    </p>
  );
};

export default AnimatedText;
