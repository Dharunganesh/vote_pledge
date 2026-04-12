import React, { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "../Components/Navbar";

import image1 from "../assets/Gallery/image1.jpeg";
import image2 from "../assets/Gallery/image2.jpeg";
import image3 from "../assets/Gallery/image3.jpeg";
import image4 from "../assets/Gallery/image4.jpeg";
import image5 from "../assets/Gallery/image5.jpeg";
import image6 from "../assets/Gallery/image6.jpeg";
import image7 from "../assets/Gallery/image7.jpeg";
import image8 from "../assets/Gallery/image8.jpeg";
import image9 from "../assets/Gallery/image9.jpeg";
import image10 from "../assets/Gallery/image10.jpeg";
import image11 from "../assets/Gallery/image11.jpeg";
import video1 from "../assets/Gallery/video1.mp4";
import video2 from "../assets/Gallery/video2.mp4";

const carouselImages = [image1, image2, image3, image4, image5, image6, image7, image8];
const gridImages = [image9, image10, image11];
const videos = [video1, video2];

const SectionDivider = ({ label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "clamp(1.5rem, 4vw, 2.5rem) 0 clamp(1rem, 3vw, 1.8rem)" }}>
    <div style={{ flex: 1, height: 1, background: "#d9c9b8" }} />
    <span style={{ color: "#8b1a1a", fontWeight: 700, fontSize: "clamp(0.72rem, 1.8vw, 0.88rem)", letterSpacing: "0.14em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
      {label}
    </span>
    <div style={{ flex: 1, height: 1, background: "#d9c9b8" }} />
  </div>
);

const PlayIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="28" cy="28" r="28" fill="rgba(139,26,26,0.88)" />
    <polygon points="22,17 42,28 22,39" fill="#fff" />
  </svg>
);

export default function Gallery() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const touchStartX = useRef(null);
  const autoPlayRef = useRef(null);

  const [lightbox, setLightbox] = useState(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const videoRef = useRef(null);

  const go = useCallback((dir) => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((prev) =>
        dir === "next"
          ? (prev + 1) % carouselImages.length
          : (prev - 1 + carouselImages.length) % carouselImages.length
      );
      setIsAnimating(false);
    }, 320);
  }, [isAnimating]);

  useEffect(() => {
    autoPlayRef.current = setInterval(() => go("next"), 4500);
    return () => clearInterval(autoPlayRef.current);
  }, [go]);

  const resetAutoplay = () => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => go("next"), 4500);
  };

  const handlePrev = () => { go("prev"); resetAutoplay(); };
  const handleNext = () => { go("next"); resetAutoplay(); };
  const handleDot = (i) => { setDirection(i > current ? "next" : "prev"); setCurrent(i); resetAutoplay(); };

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) { dx < 0 ? handleNext() : handlePrev(); }
    touchStartX.current = null;
  };

  const openLightbox = (src, index, pool) => setLightbox({ src, index, pool });
  const closeLightbox = () => setLightbox(null);
  const lbPrev = () => {
    if (!lightbox) return;
    const i = (lightbox.index - 1 + lightbox.pool.length) % lightbox.pool.length;
    setLightbox({ ...lightbox, src: lightbox.pool[i], index: i });
  };
  const lbNext = () => {
    if (!lightbox) return;
    const i = (lightbox.index + 1) % lightbox.pool.length;
    setLightbox({ ...lightbox, src: lightbox.pool[i], index: i });
  };

  useEffect(() => {
    const handler = (e) => {
      if (!lightbox) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lbPrev();
      if (e.key === "ArrowRight") lbNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  const switchVideo = (i) => {
    setActiveVideo(i);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => { });
    }
  };

  const navBtnStyle = (side) => ({
    position: "absolute", top: "50%", [side]: "clamp(8px, 2vw, 20px)",
    transform: "translateY(-50%)",
    background: "rgba(139,26,26,0.82)", color: "#fff", border: "none",
    borderRadius: "50%",
    width: "clamp(36px, 5vw, 52px)", height: "clamp(36px, 5vw, 52px)",
    fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)",
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    transition: "background 0.2s, transform 0.15s", lineHeight: 1, zIndex: 2,
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f8f6f2", fontFamily: "'Segoe UI', sans-serif" }}>
      <Navbar />

      {/* Header */}
      <header style={{
        background: "linear-gradient(135deg, #8b1a1a 0%, #b22222 60%, #cc3300 100%)",
        padding: "clamp(1.5rem, 4vw, 3rem) clamp(1rem, 4vw, 3rem)",
        textAlign: "center", color: "#fff", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 0, transparent 50%)", backgroundSize: "14px 14px" }} />
        <p style={{ margin: 0, fontSize: "clamp(0.75rem, 2vw, 0.9rem)", letterSpacing: "0.18em", opacity: 0.8, textTransform: "uppercase", position: "relative" }}>
          இராணிப்பேட்டை மாவட்டம்
        </p>
        <h1 style={{ margin: "0.4rem 0 0", fontSize: "clamp(1.4rem, 4vw, 2.4rem)", fontWeight: 700, letterSpacing: "0.02em", position: "relative" }}>
          எங்கள் பணிகள் / Gallery
        </h1>
      </header>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(0.5rem, 2vw, 2rem) clamp(0.75rem, 3vw, 2rem)", paddingBottom: "clamp(5rem, 12vw, 8rem)" }}>

        {/* ── Photos carousel ── */}
        <SectionDivider label="Photos" />

        <section style={{ marginBottom: "clamp(1rem, 3vw, 2rem)" }}>
          <div
            onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
            style={{ position: "relative", borderRadius: 18, overflow: "hidden", background: "#1a1a1a", boxShadow: "0 8px 40px rgba(139,26,26,0.18)", aspectRatio: "16/9", userSelect: "none" }}
          >
            <img
              key={current}
              src={carouselImages[current]}
              alt={`Gallery image ${current + 1}`}
              onClick={() => openLightbox(carouselImages[current], current, carouselImages)}
              style={{
                width: "100%", height: "100%", objectFit: "cover", display: "block", cursor: "zoom-in",
                animation: isAnimating ? (direction === "next" ? "slideInRight 0.32s ease" : "slideInLeft 0.32s ease") : "none",
              }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 40%)", pointerEvents: "none" }} />

            <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: "clamp(0.7rem, 1.5vw, 0.85rem)", padding: "4px 12px", borderRadius: 50, backdropFilter: "blur(6px)" }}>
              {current + 1} / {carouselImages.length}
            </div>

            {[{ label: "‹", side: "left", action: handlePrev }, { label: "›", side: "right", action: handleNext }].map(({ label, side, action }) => (
              <button key={side} onClick={action} aria-label={side === "left" ? "Previous" : "Next"} style={navBtnStyle(side)}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#b22222"; e.currentTarget.style.transform = "translateY(-50%) scale(1.08)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(139,26,26,0.82)"; e.currentTarget.style.transform = "translateY(-50%) scale(1)"; }}
              >{label}</button>
            ))}

            <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 7, zIndex: 2 }}>
              {carouselImages.map((_, i) => (
                <button key={i} onClick={() => handleDot(i)} aria-label={`Slide ${i + 1}`}
                  style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 50, border: "none", background: i === current ? "#fff" : "rgba(255,255,255,0.45)", cursor: "pointer", padding: 0, transition: "width 0.3s, background 0.3s" }} />
              ))}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div style={{ display: "flex", gap: "clamp(6px, 1.5vw, 10px)", marginTop: "clamp(8px, 2vw, 14px)", overflowX: "auto", paddingBottom: 4, scrollbarWidth: "thin" }}>
            {carouselImages.map((img, i) => (
              <button key={i} onClick={() => { setDirection(i > current ? "next" : "prev"); setCurrent(i); resetAutoplay(); }}
                style={{ flexShrink: 0, width: "clamp(52px, 9vw, 90px)", aspectRatio: "4/3", borderRadius: 8, overflow: "hidden", border: i === current ? "2.5px solid #b22222" : "2.5px solid transparent", padding: 0, cursor: "pointer", opacity: i === current ? 1 : 0.6, transition: "opacity 0.2s, border-color 0.2s" }}
              >
                <img src={img} alt={`thumb ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </button>
            ))}
          </div>
        </section>

        {/* ── More Photos grid ── */}
        <SectionDivider label="More Photos" />

        <section style={{ marginBottom: "clamp(1rem, 3vw, 2rem)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(clamp(140px, 28vw, 280px), 1fr))", gap: "clamp(10px, 2vw, 18px)" }}>
            {gridImages.map((img, i) => (
              <div key={i} onClick={() => openLightbox(img, i, gridImages)}
                style={{ borderRadius: 14, overflow: "hidden", aspectRatio: "4/3", cursor: "zoom-in", boxShadow: "0 2px 16px rgba(0,0,0,0.09)", transition: "transform 0.22s, box-shadow 0.22s", background: "#e8e0d4" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(139,26,26,0.18)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.09)"; }}
              >
                <img src={img} alt={`Photo ${i + 1}`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
        </section>

        {/* ── Videos ── */}
        <SectionDivider label="Videos" />

        <section style={{ marginBottom: "clamp(2rem, 5vw, 4rem)" }}>

          {/* Main player */}
          <div style={{ borderRadius: 18, overflow: "hidden", background: "#0d0d0d", boxShadow: "0 8px 40px rgba(139,26,26,0.18)", aspectRatio: "16/9", marginBottom: "clamp(10px, 2vw, 16px)" }}>
            <video
              ref={videoRef}
              key={activeVideo}
              controls
              style={{ width: "100%", height: "100%", display: "block", objectFit: "contain" }}
            >
              <source src={videos[activeVideo]} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Video selector thumbnails */}
          <div style={{ display: "flex", gap: "clamp(8px, 2vw, 14px)", flexWrap: "wrap" }}>
            {videos.map((vid, i) => (
              <button
                key={i}
                onClick={() => switchVideo(i)}
                style={{
                  position: "relative",
                  width: "clamp(100px, 22vw, 200px)",
                  aspectRatio: "16/9",
                  borderRadius: 10,
                  overflow: "hidden",
                  border: i === activeVideo ? "2.5px solid #b22222" : "2.5px solid rgba(0,0,0,0.15)",
                  padding: 0,
                  cursor: "pointer",
                  background: "#1a1a1a",
                  flexShrink: 0,
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  boxShadow: i === activeVideo ? "0 4px 18px rgba(139,26,26,0.3)" : "0 2px 8px rgba(0,0,0,0.18)",
                }}
              >
                {/* Video frame preview */}
                <video muted preload="metadata" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}>
                  <source src={`${vid}#t=0.5`} type="video/mp4" />
                </video>

                {/* Overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: i === activeVideo ? "rgba(139,26,26,0.3)" : "rgba(0,0,0,0.42)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5,
                  transition: "background 0.2s",
                }}>
                  <PlayIcon size={i === activeVideo ? 36 : 28} />
                  <span style={{ color: "#fff", fontSize: "clamp(0.62rem, 1.3vw, 0.76rem)", fontWeight: 600, letterSpacing: "0.04em" }}>
                    Video {i + 1}
                  </span>
                </div>

                {/* Now playing badge */}
                {i === activeVideo && (
                  <div style={{ position: "absolute", top: 6, left: 6, background: "#b22222", color: "#fff", fontSize: "0.6rem", fontWeight: 700, padding: "2px 7px", borderRadius: 50, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Playing
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={closeLightbox} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(12px, 3vw, 40px)", animation: "fadeIn 0.2s ease" }}>
          <button onClick={closeLightbox} style={{ position: "fixed", top: 16, right: 16, background: "rgba(255,255,255,0.12)", border: "none", color: "#fff", width: 40, height: 40, borderRadius: "50%", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          <button onClick={(e) => { e.stopPropagation(); lbPrev(); }} style={{ position: "fixed", left: "clamp(8px,2vw,24px)", top: "50%", transform: "translateY(-50%)", background: "rgba(139,26,26,0.8)", border: "none", color: "#fff", width: 44, height: 44, borderRadius: "50%", fontSize: "1.4rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
          <img src={lightbox.src} alt="Full size" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "90vw", maxHeight: "88vh", objectFit: "contain", borderRadius: 10, boxShadow: "0 20px 80px rgba(0,0,0,0.6)" }} />
          <button onClick={(e) => { e.stopPropagation(); lbNext(); }} style={{ position: "fixed", right: "clamp(8px,2vw,24px)", top: "50%", transform: "translateY(-50%)", background: "rgba(139,26,26,0.8)", border: "none", color: "#fff", width: 44, height: 44, borderRadius: "50%", fontSize: "1.4rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
          <div style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.65)", fontSize: "0.85rem" }}>
            {lightbox.index + 1} / {lightbox.pool.length}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInRight { from { opacity: 0; transform: translateX(6%); }  to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInLeft  { from { opacity: 0; transform: translateX(-6%); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeIn       { from { opacity: 0; }                              to { opacity: 1; } }
      `}</style>
    </div>
  );
}