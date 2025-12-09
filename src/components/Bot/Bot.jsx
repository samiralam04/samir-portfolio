import { useState, useEffect, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "../Bot/Bot.css";

const Bot = () => {
  const [message, setMessage] = useState({ text: "", visible: false });
  const [botPosition, setBotPosition] = useState({ top: null, left: null });
  const [botSize, setBotSize] = useState({ width: 180, height: 180 });
  const [messageSize, setMessageSize] = useState({ width: 300, fontSize: 16 });
  const [isBotVisible, setIsBotVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [botReaction, setBotReaction] = useState("default");
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  const messageTimeoutRef = useRef(null);
  const botContainerRef = useRef(null);
  const reactionTimeoutRef = useRef(null);

  // Check if it's user's first visit and get location
  useEffect(() => {
    // Check if user has visited before
    const visitedBefore = localStorage.getItem('portfolioVisited');
    setIsFirstVisit(!visitedBefore);

    if (!visitedBefore) {
      localStorage.setItem('portfolioVisited', 'true');
    }

    // Get approximate location based on IP
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        setUserLocation({
          city: data.city,
          country: data.country_name
        });
      })
      .catch(error => {
        console.log("Location detection failed:", error);
      });
  }, []);

  // Calculate bot size based on screen width
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

  // Bot position and message handling
  useEffect(() => {
    const sections = {
      "#home": {
        text: isFirstVisit
          ? (userLocation
            ? `👋 Hello from ${userLocation.city}, ${userLocation.country}! Welcome to my portfolio.`
            : "👋 Hi there! Welcome to my portfolio.")
          : (userLocation
            ? `👋 Welcome back! Hope you're having a great day in ${userLocation.city}!`
            : "👋 Welcome back! Great to see you again!"),
        styles: getHomeStyles()
      },
      "#project": {
        text: "🚀 Check out my latest projects here!",
        styles: getProjectStyles()
      },
      "#skills": {
        text: "💪 Here are some of the skills I use to build amazing things.",
        styles: getSkillsStyles()
      },
      "#service": {
        text: "🛠️ Here are the services I offer.",
        styles: getServiceStyles()
      },
      "#coding-progress": {
        text: "💻 Here is my LeetCode progress and GitHub contributions.",
        styles: getCodingProgressStyles()
      },
      "#footer": {
        text: "📬 Want to collaborate or just say hello? Feel free to get in touch!",
        styles: getFooterStyles()
      }
    };

    const handleScroll = () => {
      if (isMinimized) return;

      const botHeight = botSize.height;
      const botWidth = botSize.width;

      let currentSectionId = "";
      for (const id of Object.keys(sections)) {
        const element = document.querySelector(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight * 0.5 &&
            rect.bottom >= window.innerHeight * 0.5
          ) {
            currentSectionId = id;
            break;
          }
        }
      }

      if (currentSectionId) {
        const { text, styles } = sections[currentSectionId];
        const currentElement = document.querySelector(currentSectionId);
        const rect = currentElement.getBoundingClientRect();
        let top, left;

        // Calculate top position
        if (styles.top !== undefined) {
          top = rect.top + window.scrollY + styles.top;
        } else if (styles.bottom !== undefined) {
          top = rect.bottom + window.scrollY - botHeight - styles.bottom;
        }

        // Calculate left position
        if (styles.left !== undefined) {
          left = rect.left + window.scrollX + styles.left;
        } else if (styles.right !== undefined) {
          left = rect.right + window.scrollX - botWidth - styles.right;
        }

        // Update message and bot position
        if (message.text !== text) {
          setMessage((prev) => ({ ...prev, visible: false }));
          clearTimeout(messageTimeoutRef.current);
          messageTimeoutRef.current = setTimeout(() => {
            setMessage({ text: text, visible: true });
          }, 300);
        }

        if (botPosition.top !== top || botPosition.left !== left) {
          setIsBotVisible(true);
          setBotPosition({ top, left });
        }
      } else if (message.visible) {
        setMessage((prev) => ({ ...prev, visible: false }));
        setIsBotVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    if (!isMinimized) {
      setTimeout(() => handleScroll(), 100);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(messageTimeoutRef.current);
    };
  }, [message.text, message.visible, botPosition, botSize, isMinimized, isFirstVisit, userLocation]);

  // Handle bot reactions
  const handleBotInteraction = (type) => {
    // Clear any existing reaction timeout
    if (reactionTimeoutRef.current) {
      clearTimeout(reactionTimeoutRef.current);
    }

    // Set reaction based on interaction type
    if (type === 'hover') {
      setBotReaction('happy');
    } else if (type === 'click') {
      setBotReaction('excited');

      // Return to default after 2 seconds
      reactionTimeoutRef.current = setTimeout(() => {
        setBotReaction('default');
      }, 2000);
    }
  };

  // Reset reaction when mouse leaves
  const handleMouseLeave = () => {
    if (reactionTimeoutRef.current) {
      clearTimeout(reactionTimeoutRef.current);
    }

    if (botReaction !== 'default') {
      reactionTimeoutRef.current = setTimeout(() => {
        setBotReaction('default');
      }, 1000);
    }
  };

  // Toggle minimize state
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (!isMinimized) {
      setMessage({ text: "", visible: false });
    }
  };

  // Helper functions for section styles
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
    return { bottom: 20, right: 20 };
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
    return { bottom: 30, left: 1236 };
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
    return { top: 150, left: 1285 };
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

  // Get appropriate animation based on reaction state
  const getAnimationSrc = () => {
    switch (botReaction) {
      case 'happy':
        return "https://lottie.host/8a18c70a-2d75-4d13-bf9e-6f8e0d7c5b1c/5pQz3X9D9N.lottie";
      case 'excited':
        return "https://lottie.host/0fc1028d-7c5a-401f-a7b2-517e0187d3b6/CB8FM3ePLF.lottie";
      default:
        return "https://lottie.host/0fc1028d-7c5a-401f-a7b2-517e0187d3b6/CB8FM3ePLF.lottie";
    }
  };

  return (
    <>
      {/* Minimized bot icon */}
      {isMinimized && (
        <div
          className="minimized-bot"
          onClick={toggleMinimize}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 1000,
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{ width: '40px', height: '40px' }}>
            <DotLottieReact
              src="https://lottie.host/0fc1028d-7c5a-401f-a7b2-517e0187d3b6/CB8FM3ePLF.lottie"
              loop
              autoplay
            />
          </div>
        </div>
      )}

      {/* Main bot container */}
      <div
        ref={botContainerRef}
        className={`bot-container ${isBotVisible && !isMinimized ? "visible" : "hidden"}`}
        style={{
          transform:
            botPosition.top !== null
              ? `translate(${botPosition.left}px, ${botPosition.top}px)`
              : "none",
        }}
      >
        {/* Message Popup with close button */}
        <div
          className={`message-popup ${message.visible ? "visible" : ""}`}
          style={{
            width: `${messageSize.width}px`,
            fontSize: `${messageSize.fontSize}px`,
          }}
        >
          {message.text}
          <button
            className="minimize-btn"
            onClick={toggleMinimize}
            aria-label="Minimize bot"
          >
            x
          </button>

        </div>

        {/* Bot Animation */}
        <div
          className="bot-animation"
          style={{ width: `${botSize.width}px`, height: `${botSize.height}px` }}
          onMouseEnter={() => handleBotInteraction('hover')}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleBotInteraction('click')}
        >
          <DotLottieReact
            src={getAnimationSrc()}
            loop={botReaction === 'default'}
            autoplay
          />
        </div>
        {/* Thinking Bubbles */}


      </div>
    </>
  );
};

export default Bot;