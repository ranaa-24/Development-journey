import { useState } from "react"
import { motion } from "framer-motion"

export default function SparkleText() {
  const [isHovered, setIsHovered] = useState(false)
  const enhancerText = "Enhancer"
  const enhancerLetters = enhancerText.split("")

  return (
    <div >
      <h1 className="font-main text-3xl md:text-5xl font-black text-black text-center w-full animate-fade  animate-once">
        AI Image{" "}
        <span
          className="relative inline-block"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <span className="inline-block">
              {enhancerLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                  animate={{
                    opacity: [1, 0.8, 0.6],
                    x: Math.random() * 15- 10,
                    y: Math.random() * 15- 10,
                    rotate: Math.random() * 20 - 10,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="inline-block text-green-600"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ) : (
            <span className="sparkle-text text-green-600">{enhancerText}</span>
          )}
          {!isHovered && (
            <>
              <span className="absolute sparkle sparkle-1"></span>
              <span className="absolute sparkle sparkle-2"></span>
              <span className="absolute sparkle sparkle-3"></span>
            </>
          )}
        </span>
      </h1>

      <style>{`
        .sparkle-text {
          position: relative;
          display: inline-block;
        }
        
        .sparkle {
          position: absolute;
          background-color: #10b981;
          border-radius: 50%;
          animation: sparkle-animation 1.5s infinite;
        }
        
        .sparkle-1 {
          width: 8px;
          height: 8px;
          top: 0;
          right: 20%;
          animation-delay: 0s;
        }
        
        .sparkle-2 {
          width: 6px;
          height: 6px;
          top: 60%;
          right: 10%;
          animation-delay: 0.3s;
        }
        
        .sparkle-3 {
          width: 10px;
          height: 10px;
          top: 30%;
          right: -10%;
          animation-delay: 0.6s;
        }
        
        @keyframes sparkle-animation {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}
