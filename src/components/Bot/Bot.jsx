import { useState, useEffect, useRef, useCallback } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "../Bot/Bot.css";

// --- STATIC HELPERS ---
const tourSteps = ["#home", "#skills", "#project", "#service", "#coding-progress", "#footer"];

const getBrowserVoiceSettings = (emotion) => {
  switch (emotion) {
    case "angry": return { pitch: 0.6, rate: 1.3, volume: 1.0 }; // Deep and fast
    case "happy": return { pitch: 1.3, rate: 1.1, volume: 1.0 }; // High and bubbly
    case "excited": return { pitch: 1.4, rate: 1.25, volume: 1.0 }; // Higher and faster
    case "sad": return { pitch: 0.8, rate: 0.8, volume: 0.7 }; // Low and slow
    default: return { pitch: 1.0, rate: 1.0, volume: 1.0 };
  }
};

const getHomeStyles = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  if (width === 820 && height === 1180) return { bottom: 600, right: 40 };
  if (width === 1024 && height === 1366) return { bottom: 650, right: 60 };
  if (width === 912 && height === 1368) return { bottom: 640, right: 50 };
  if (width === 853 && height === 1280) return { bottom: 620, right: 55 };
  if (width < 480) return { bottom: 620, right: 35 };
  if (width < 768) return { bottom: 620, right: 25 };
  if (width < 820) return { bottom: 560, right: 35 };
  if (width < 853) return { bottom: 560, right: 38 };
  if (width < 912) return { bottom: 560, right: 40 };
  if (width < 1024) return { bottom: 560, right: 40 };
  return { bottom: 20, right: 13 };
};

const getProjectStyles = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  if (width === 820 && height === 1180) return { top: 350, left: 220 };
  if (width === 1024 && height === 1366) return { top: 250, left: 70 };
  if (width === 912 && height === 1368) return { top: 680, left: 240 };
  if (width === 853 && height === 1280) return { top: 290, left: 340 };
  if ([412, 414, 430].includes(width) && [914, 896, 932, 915].includes(height)) return { top: 170, left: 35 };
  if (width === 1080 && height === 2400) return { top: 170, left: 35 };
  if (width < 480) return { top: 215, left: 5 };
  if (width < 768) return { top: 450, left: 35 };
  if (width < 820) return { top: 450, left: 2 };
  if (width < 853) return { top: 450, left: 1 };
  if (width < 912) return { top: 450, left: 0 };
  if (width < 1024) return { top: 450, left: 0 };
  return { top: 120, left: 40 };
};

const getSkillsStyles = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  if (width === 820 && height === 1180) return { top: 500, right: 580 };
  if (width === 1024 && height === 1366) return { top: 650, right: 80 };
  if (width === 912 && height === 1368) return { top: 720, right: 90 };
  if (width === 853 && height === 1280) return { top: 650, right: 80 };
  if (width < 480) return { top: 520, right: 35 };
  if (width < 768) return { top: 470, right: 25 };
  if (width < 820) return { top: 520, right: 600 };
  if (width < 853) return { top: 520, right: 605 };
  if (width < 912) return { top: 2720, right: 510 };
  if (width < 1024) return { top: 520, right: 610 };
  return { top: 120, right: 1550 };
};

const getServiceStyles = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  if (width === 820 && height === 1180) return { bottom: 90, left: 540 };
  if (width === 1024 && height === 1366) return { bottom: -50, left: 680 };
  if (width === 912 && height === 1368) return { bottom: 100, left: 550 };
  if (width === 853 && height === 1280) return { bottom: 110, left: 545 };
  if (width < 480) return { bottom: 550, left: 230 };
  if (width < 768) return { bottom: 590, left: 240 };
  if (width < 820) return { bottom: 80, left: 550 };
  if (width < 853) return { bottom: 80, left: 555 };
  if (width < 912) return { bottom: 80, left: 560 };
  if (width < 1024) return { bottom: 80, left: 560 };
  return { bottom: 30, left: 1156 };
};

const getCodingProgressStyles = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  if (width === 820 && height === 1180) return { top: 710, left: 240 };
  if (width === 1024 && height === 1366) return { top: 1000, left: 660 };
  if (width === 912 && height === 1368) return { top: 1050, left: 600 };
  if (width === 853 && height === 1280) return { top: 830, left: 280 };
  if (width < 480) return { top: 275, left: 230 };
  if (width < 768) return { top: 250, left: 270 };
  if (width < 820) return { top: 730, left: 255 };
  if (width < 853) return { top: 730, left: 257 };
  if (width < 912) return { top: 730, left: 260 };
  if (width < 1024) return { top: 730, left: 260 };
  return { top: 150, left: 1200 };
};

const getFooterStyles = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  if (width === 820 && height === 1180) return { bottom: 680, left: 570 };
  if (width === 1024 && height === 1366) return { bottom: 140, left: 280 };
  if (width === 912 && height === 1368) return { bottom: 90, left: 275 };
  if (width === 853 && height === 1280) return { bottom: 85, left: 258 };
  if (width < 480) return { bottom: 700, left: 230 };
  if (width < 768) return { bottom: 700, left: 250 };
  if (width < 820) return { bottom: 680, left: 575 };
  if (width < 853) return { bottom: 680, left: 577 };
  if (width < 912) return { bottom: 680, left: 580 };
  if (width < 1024) return { bottom: 680, left: 580 };
  return { bottom: 160, left: 580 };
};

const Bot = () => {
  // --- 1. CORE STATE ---
  const [message, setMessage] = useState({ text: "", visible: false, actions: [] });
  const [botPosition, setBotPosition] = useState({ top: null, left: null });
  const [botSize, setBotSize] = useState({ width: 180, height: 180 });
  const [messageSize, setMessageSize] = useState({ width: 300, fontSize: 16 });

  // --- NEW: VOICE CONSISTENCY STATE ---
  const [availableVoices, setAvailableVoices] = useState([]);

  // --- 2. OTHER STATES ---
  const [isBotVisible, setIsBotVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [botReaction, setBotReaction] = useState("default");
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [tourActive, setTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [deferredMessage, setDeferredMessage] = useState(null); // New state for autoplay fallback

  const clickCountRef = useRef(0);
  const isPokingRef = useRef(false);
  const messageTimeoutRef = useRef(null);
  const botContainerRef = useRef(null);
  const reactionTimeoutRef = useRef(null);
  const clickResetTimeoutRef = useRef(null);

  // --- 3. VOICE LOADING EFFECT (Fixes Random Voices) ---
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
      }
    };
    // Chrome requires this event listener because voices load asynchronously
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices(); // Try immediately just in case they are already loaded

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // --- 4. CORE: BROWSER SPEECH FUNCTION ---
  const speakText = useCallback((text, emotion = "default") => {
    if (!isAudioEnabled) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const settings = getBrowserVoiceSettings(emotion);

    utterance.pitch = settings.pitch;
    utterance.rate = settings.rate;
    utterance.volume = settings.volume || 1.0;

    if (availableVoices.length > 0) {
      // 1. Prioritize specific high-quality male voices known on various OSs
      let preferredVoice = availableVoices.find(
        v => v.name.includes("Daniel") || // iOS/Mac
          v.name.includes("Google US English") || // Android/Chrome
          v.name.includes("Microsoft David") || // Windows
          v.name.includes("Fred") // Mac
      );

      // 2. Fallback to any voice explicitly labeled "Male"
      if (!preferredVoice) {
        preferredVoice = availableVoices.find(v => v.name.includes("Male"));
      }

      // 3. Last resort: just use the first available English voice if possible
      if (!preferredVoice) {
        preferredVoice = availableVoices.find(v => v.lang.startsWith("en"));
      }

      if (preferredVoice) utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
  }, [isAudioEnabled, availableVoices]);

  // --- 3.5. AUTOPLAY FALLBACK LISTENER (Moved below speakText) ---
  useEffect(() => {
    if (deferredMessage) {
      const handleInteraction = () => {
        // User interacted, now we can play!
        speakText(deferredMessage.text, deferredMessage.emotion);
        setDeferredMessage(null);
      };

      // Listen for any interaction (click, touch, key)
      window.addEventListener('click', handleInteraction, { once: true });
      window.addEventListener('touchstart', handleInteraction, { once: true });
      window.addEventListener('keydown', handleInteraction, { once: true });

      return () => {
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('touchstart', handleInteraction);
        window.removeEventListener('keydown', handleInteraction);
      };
    }
  }, [deferredMessage, speakText]);

  // --- LOGIC & HELPERS ---
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 5) return "Burning the midnight oil?";
    if (hour < 12) return "Good morning! ";
    if (hour < 18) return "Good afternoon! ";
    return "Good evening!";
  };

  const handleTourNext = useCallback(() => {
    const nextStep = tourStep + 1;
    if (nextStep < tourSteps.length) {
      setTourStep(nextStep);
      const element = document.querySelector(tourSteps[nextStep]);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      setTourActive(false);
      setTourStep(0);
      setBotReaction("happy");
      speakText("That was the tour! Thanks for watching.", "happy");
      setTimeout(() => setBotReaction("default"), 3000);
    }
  }, [tourStep, speakText]);

  const startTour = useCallback(() => {
    setTourActive(true);
    setTourStep(0);
    document.querySelector(tourSteps[0])?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const visitedBefore = localStorage.getItem('portfolioVisited');
    setIsFirstVisit(!visitedBefore);
    if (!visitedBefore) localStorage.setItem('portfolioVisited', 'true');

    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => setUserLocation({ city: data.city, country: data.country_name }))
      .catch(e => console.log("Location failed", e));
  }, []);

  //  INITIAL GREETING 
  useEffect(() => {
    // Small delay to allow location to load if possible, but don't block
    const timer = setTimeout(() => {
      const greeting = isFirstVisit
        ? "Hello! Welcome to my portfolio. I'm here to guide you."
        : "Welcome back! Good to see you again.";

      setMessage({ text: greeting, visible: true, actions: [] });
      speakText(greeting, "happy");
      setBotReaction("happy");

      // Ensure bot is visible initially
      setIsBotVisible(true);
      if (!botPosition.top) {
        // Default position if not yet set by scroll
        // We trust handleScroll to position it eventually
      }

      setTimeout(() => setBotReaction("default"), 3000);
    }, 1000); // 1 second delay for "site load" feel

    return () => clearTimeout(timer);
  }, [isFirstVisit, speakText, botPosition.top]); // Run once (effectively) or when visitation state settles

  useEffect(() => {
    const calculateBotSize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 480) return { width: 90, height: 90 };
      if (screenWidth < 768) return { width: 120, height: 120 };
      if (screenWidth < 820) return { width: 140, height: 140 };
      if (screenWidth < 853) return { width: 150, height: 150 };
      if (screenWidth < 912) return { width: 120, height: 120 };
      if (screenWidth < 1024) return { width: 170, height: 170 };
      if (screenWidth < 1280) return { width: 175, height: 175 };
      return { width: 180, height: 180 };
    };

    const calculateMessageSize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 480) return { width: 100, fontSize: 8 };
      if (screenWidth < 768) return { width: 200, fontSize: 10 };
      if (screenWidth < 1024) return { width: 260, fontSize: 11 };
      return { width: 200, fontSize: 12 };
    };

    const handleResize = () => {
      setBotSize(calculateBotSize());
      setMessageSize(calculateMessageSize());
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- SCROLL LOGIC ---
  useEffect(() => {
    const timeGreeting = getTimeGreeting();
    const locationText = userLocation ? `in ${userLocation.city}` : "there";

    const sections = {
      "#home": {
        text: isFirstVisit
          ? ` ${timeGreeting} Welcome to my portfolio ${locationText}!`
          : ` Welcome back! ${timeGreeting}`,
        actions: tourActive
          ? [{ label: "Next Step ➡", onClick: handleTourNext }]
          : [{ label: "Take a Tour ", onClick: startTour }],
        styles: getHomeStyles(),
        emotion: "happy"
      },
      "#project": {
        text: tourActive ? "Here are the projects I've built. Take a look!" : " Check out my latest projects here!",
        actions: tourActive ? [{ label: "Next ➡", onClick: handleTourNext }] : [],
        styles: getProjectStyles(),
        emotion: "excited"
      },
      "#skills": {
        text: " These are my tools of the trade.",
        actions: tourActive ? [{ label: "Next ➡", onClick: handleTourNext }] : [],
        styles: getSkillsStyles(),
        emotion: "default"
      },
      "#service": {
        text: " Here is how I can help you.",
        actions: tourActive ? [{ label: "Next ➡", onClick: handleTourNext }] : [],
        styles: getServiceStyles(),
        emotion: "default"
      },
      "#coding-progress": {
        text: "Consistent coding is key!",
        actions: tourActive ? [{ label: "Next ➡", onClick: handleTourNext }] : [],
        styles: getCodingProgressStyles(),
        emotion: "default"
      },
      "#footer": {
        text: tourActive ? "That's the tour! Feel free to contact me." : " Want to collaborate? Get in touch!",
        actions: tourActive
          ? [{ label: "Finish Tour 🎉", onClick: handleTourNext }]
          : [{ label: "Email Me 📧", onClick: () => window.location.href = "mailto:your@email.com" }],
        styles: getFooterStyles(),
        emotion: "happy"
      }
    };

    const handleScroll = () => {
      if (isMinimized) return;
      let currentSectionId = "";
      for (const id of Object.keys(sections)) {
        const element = document.querySelector(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
            currentSectionId = id;
            break;
          }
        }
      }

      if (currentSectionId) {
        const { text, styles, actions, emotion } = sections[currentSectionId];
        const currentElement = document.querySelector(currentSectionId);
        const rect = currentElement.getBoundingClientRect();

        let top, left;
        const botHeight = botSize.height;
        const botWidth = botSize.width;

        if (styles.top !== undefined) top = rect.top + window.scrollY + styles.top;
        else if (styles.bottom !== undefined) top = rect.bottom + window.scrollY - botHeight - styles.bottom;
        if (styles.left !== undefined) left = rect.left + window.scrollX + styles.left;
        else if (styles.right !== undefined) left = rect.right + window.scrollX - botWidth - styles.right;

        if (!isPokingRef.current && message.text !== text) {
          setMessage((prev) => ({ ...prev, visible: false }));
          clearTimeout(messageTimeoutRef.current);
          messageTimeoutRef.current = setTimeout(() => {
            if (!isPokingRef.current) {
              setMessage({ text: text, visible: true, actions: actions || [] });
              speakText(text, emotion);
            }
          }, 300);
        }

        if (botPosition.top !== top || botPosition.left !== left) {
          setIsBotVisible(true);
          setBotPosition({ top, left });
        }
      } else if (message.visible && !isPokingRef.current) {
        setMessage((prev) => ({ ...prev, visible: false }));
        setIsBotVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    if (!isMinimized) setTimeout(handleScroll, 100);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(messageTimeoutRef.current);
    };
  }, [message.text, message.visible, botPosition, isMinimized, tourActive, tourStep, isAudioEnabled, userLocation, botSize, handleTourNext, startTour, speakText, isFirstVisit]);

  // --- INTERACTIONS ---
  const handleBotClick = () => {
    setBotReaction('excited');
    if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current);
    reactionTimeoutRef.current = setTimeout(() => setBotReaction('default'), 2000);

    clickCountRef.current += 1;
    if (clickResetTimeoutRef.current) clearTimeout(clickResetTimeoutRef.current);
    clickResetTimeoutRef.current = setTimeout(() => { clickCountRef.current = 0; }, 1500);

    if (clickCountRef.current > 4) {
      isPokingRef.current = true;
      const angryText = "Hey! Stop poking me! ";
      setMessage({ text: angryText, visible: true, actions: [] });
      speakText(angryText, "angry");
      setBotReaction('default');
      clickCountRef.current = 0;
      setTimeout(() => { isPokingRef.current = false; }, 4000);
    }
  };

  const handleMouseEnter = () => setBotReaction('happy');
  const handleMouseLeave = () => setBotReaction('default');
  const toggleMinimize = () => { setIsMinimized(!isMinimized); if (!isMinimized) setMessage({ text: "", visible: false, actions: [] }); };
  const toggleAudio = (e) => { e.stopPropagation(); setIsAudioEnabled(!isAudioEnabled); };

  const getAnimationSrc = () => {
    switch (botReaction) {
      case 'happy': return "https://lottie.host/8a18c70a-2d75-4d13-bf9e-6f8e0d7c5b1c/5pQz3X9D9N.lottie";
      case 'excited': return "https://lottie.host/0fc1028d-7c5a-401f-a7b2-517e0187d3b6/CB8FM3ePLF.lottie";
      default: return "https://lottie.host/0fc1028d-7c5a-401f-a7b2-517e0187d3b6/CB8FM3ePLF.lottie";
    }
  };

  return (
    <>
      {isMinimized && (
        <div className="minimized-bot" onClick={toggleMinimize} style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000, cursor: 'pointer' }}>
          <div style={{ width: '60px', height: '60px' }}>
            <DotLottieReact src="https://lottie.host/0fc1028d-7c5a-401f-a7b2-517e0187d3b6/CB8FM3ePLF.lottie" loop autoplay />
          </div>
        </div>
      )}

      <div
        ref={botContainerRef}
        className={`bot-container ${isBotVisible && !isMinimized ? "visible" : "hidden"}`}
        style={{
          transform: botPosition.top !== null ? `translate(${botPosition.left}px, ${botPosition.top}px)` : "none",
          position: 'absolute',
          transition: 'transform 0.5s ease-out',
          zIndex: 999
        }}
      >
        <div
          className={`message-popup ${message.visible ? "visible" : ""}`}
          style={{
            width: `${messageSize.width}px`,
            fontSize: `${messageSize.fontSize}px`,
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '10px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            pointerEvents: 'auto',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div style={{ marginBottom: '8px', color: '#fff' }}>{message.text}</div>
          {message.actions && message.actions.length > 0 && (
            <div className="bot-actions" style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {message.actions.map((action, idx) => (
                <button key={idx} onClick={(e) => { e.stopPropagation(); action.onClick(); }} style={{ background: '#6c5ce7', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', fontSize: '0.8em', cursor: 'pointer' }}>
                  {action.label}
                </button>
              ))}
            </div>
          )}
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', display: 'flex', gap: '5px' }}>
            <button onClick={toggleAudio} style={{ background: isAudioEnabled ? '#00b894' : '#b2bec3', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', color: 'white', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title={isAudioEnabled ? "Mute" : "Enable Voice"}>
              {isAudioEnabled ? "🔊" : "🔇"}
            </button>
            <button onClick={toggleMinimize} style={{ background: '#ff7675', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', color: 'white', lineHeight: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ×
            </button>
          </div>
        </div>
        <div className="bot-animation" style={{ width: `${botSize.width}px`, height: `${botSize.height}px`, cursor: 'pointer' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleBotClick}>
          <DotLottieReact src={getAnimationSrc()} loop={botReaction === 'default'} autoplay />
        </div>
      </div>
    </>
  );
};

export default Bot;