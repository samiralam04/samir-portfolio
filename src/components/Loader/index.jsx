import React, { useMemo, useState, useEffect } from "react";
import "./styles.css";
import bot from "./bot.gif"

function Formula({ text, index }) {
  const animationDelay = index * 0.2;
  const positionStyle = {
    left: `${10 + (index * 15) % 80}%`,
    top: `${10 + (index * 25) % 70}%`,
    animationDelay: `${animationDelay}s`,
  };

  return (
    <div className="loader-formula" style={positionStyle}>
      {text}
    </div>
  );
}

function Shape({ type, index }) {
  const animationDelay = index * 0.5;
  const style = {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${animationDelay}s`,
  };

  return <div className={`loader-shape ${type}`} style={style} />;
}

export default function Loader({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing System");

  const formulas = useMemo(
    () => [
      // Math formulas
      "E = mc²", 
      "∫ eˣ dx = eˣ + C", 
      "Σ i=1ⁿ i = n(n+1)/2",
      "x = −b±√(b²−4ac)/2a", 
      "A = πr²",
      "e^{iπ} + 1 = 0",
      
      // Code snippets
      ":(){ :|:& };:", 
      "while(true) {}", 
      "git push --force", 
      "rm -rf /", 
      "404 Not Found",
      "500 Server Error",
      
      // Programming languages
      "Python",
      "JavaScript", 
      "java",  
      "React.js", 
      "Node.js",
      "SQL",
      "NoSQL",
      
      // Tech terms
      "Big O Notation", 
      "Blockchain", 
      "Machine Learning", 
      "API", 
      "REST", 
      "GraphQL",
      "WebAssembly",
      "Docker",
      "Kubernetes"
    ],
    []
  );

  const shapes = useMemo(
    () => ["square", "triangle", "hexagon", "circle"],
    []
  );

  // Update progress and loading text
  useEffect(() => {
    const texts = [
      "Initializing System",
      "Loading Components",
      "Compiling Assets",
      "Optimizing Performance",
      "Establishing Connection",
      "Finalizing Setup"
    ];
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
      
      // Change loading text based on progress
      const textIndex = Math.min(Math.floor(progress / 20), texts.length - 1);
      setLoadingText(texts[textIndex]);
    }, 30);

    return () => clearInterval(interval);
  }, [progress]);

  // Trigger fade and call onFinish
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onFinish, 1000);
    }, 3500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`loader-container ${fadeOut ? "fade-out" : ""}`}>
      {/* Binary rain background */}
      <div className="binary-rain">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="binary-digit"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </div>
        ))}
      </div>

      {/* Floating formulas and tech terms */}
      {formulas.map((f, i) => (
        <Formula key={i} text={f} index={i} />
      ))}

      {/* Floating geometric shapes */}
      {shapes.map((s, i) => (
        <Shape key={i} type={s} index={i} />
      ))}

      {/* Central tech logo */}
  <div className="tech-logo">
    <div className="logo-symbol">
      <img src={bot} alt="Tech Logo" />
    </div>


  <div className="logo-circle outer"></div>
  <div className="logo-circle middle"></div>
  <div className="logo-circle inner"></div>
</div>

      {/* Progress bar and text */}
      <div className="loader-progress-wrapper">
        <div
          className="loader-progress-bar"
          style={{ width: `${progress}%` }}
        />
        <div className="loader-progress-text">
          <span className="progress-value">{progress}</span>%
        </div>
      </div>

      <div className="loader-text">
        <span className="typing-text">{loadingText}</span>
        <span className="typing-cursor">_</span>
      </div>
    </div>
  );
}