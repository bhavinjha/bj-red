import { type CSSProperties } from "react";

/**
 * Animated infinite symbol with rainbow gradient flowing through it.
 * Uses CSS custom properties for the animation.
 */
export function InfiniteIcon({
  className = "",
  style,
  size = "2.4rem",
}: {
  className?: string;
  style?: CSSProperties;
  size?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 50"
      className={`block h-auto w-auto ${className}`}
      style={{
        width: size,
        height: "auto",
        ...style,
      } as CSSProperties}
      aria-hidden="true"
      focusable="false"
      role="img"
      aria-label="Infinite ideas in progress"
    >
      <defs>
        <linearGradient id="infinite-rainbow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff2a34" />
          <stop offset="14%" stopColor="#ff6b2a" />
          <stop offset="28%" stopColor="#ffd72a" />
          <stop offset="42%" stopColor="#2aff5e" />
          <stop offset="56%" stopColor="#2ad9ff" />
          <stop offset="70%" stopColor="#2a6bff" />
          <stop offset="84%" stopColor="#a82aff" />
          <stop offset="100%" stopColor="#ff2a34" />
        </linearGradient>
        <linearGradient id="infinite-glow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff2a34" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#2ad9ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ff2a34" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {/* Outer glow ring */}
      <g filter="url(#infinite-blur)">
        <path
          d="M10 25 C10 11.2 21.2 0 35 0 C48.8 0 60 11.2 60 25 C60 38.8 48.8 50 35 50 C21.2 50 10 38.8 10 25 Z
             M65 25 C65 11.2 76.2 0 90 0 C103.8 0 115 11.2 115 25 C115 38.8 103.8 50 90 50 C76.2 50 65 38.8 65 25 Z"
          fill="url(#infinite-glow)"
          className="infinite-glow-ring"
        />
      </g>
      {/* Main infinity symbol - figure 8 path */}
      <path
        d="M10 25 C10 11.2 21.2 0 35 0 C48.8 0 60 11.2 60 25 C60 38.8 48.8 50 35 50 C21.2 50 10 38.8 10 25 Z
           M65 25 C65 11.2 76.2 0 90 0 C103.8 0 115 11.2 115 25 C115 38.8 103.8 50 90 50 C76.2 50 65 38.8 65 25 Z"
        fill="none"
        stroke="url(#infinite-rainbow)"
        strokeWidth="3"
        strokeLinecap="round"
        className="infinite-path"
      />
      {/* Animated rainbow sweep */}
      <path
        d="M10 25 C10 11.2 21.2 0 35 0 C48.8 0 60 11.2 60 25 C60 38.8 48.8 50 35 50 C21.2 50 10 38.8 10 25 Z
           M65 25 C65 11.2 76.2 0 90 0 C103.8 0 115 11.2 115 25 C115 38.8 103.8 50 90 50 C76.2 50 65 38.8 65 25 Z"
        fill="none"
        stroke="url(#infinite-rainbow)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="220"
        strokeDashoffset="0"
        className="infinite-sweep"
      />
      <defs>
        <filter id="infinite-blur">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <style>
        {`
          .infinite-path {
            animation: infinite-pulse 3s ease-in-out infinite;
          }
          .infinite-sweep {
            animation: infinite-sweep 4s linear infinite;
            filter: drop-shadow(0 0 8px currentColor);
          }
          .infinite-glow-ring {
            animation: infinite-glow 2.5s ease-in-out infinite;
          }
          @keyframes infinite-pulse {
            0%, 100% { stroke-width: 3; opacity: 0.9; }
            50% { stroke-width: 4; opacity: 1; }
          }
          @keyframes infinite-sweep {
            0% { stroke-dashoffset: 220; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes infinite-glow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }
        `}
      </style>
    </svg>
  );
}

/**
 * Alternative: CSS-based animated infinity using pure CSS (lighter weight)
 */
export function InfiniteIconCSS({
  className = "",
  style,
  size = "2.4rem",
}: {
  className?: string;
  style?: CSSProperties;
  size?: string;
}) {
  return (
    <span
      className={`infinite-css ${className}`}
      style={{
        fontSize: size,
        ...style,
      } as CSSProperties}
      aria-hidden="true"
      role="img"
      aria-label="Infinite ideas in progress"
    >
      <span className="infinite-symbol">∞</span>
      <style>
        {`
          .infinite-css {
            display: inline-block;
            background: linear-gradient(90deg, #ff2a34, #ff6b2a, #ffd72a, #2aff5e, #2ad9ff, #2a6bff, #a82aff, #ff2a34);
            background-size: 400% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: infinite-rainbow-flow 4s linear infinite, infinite-scale 3s ease-in-out infinite;
          }
          .infinite-symbol {
            display: inline-block;
            font-family: 'Anton', 'Bebas Neue', Impact, 'Arial Narrow', sans-serif;
            font-weight: 700;
            filter: drop-shadow(0 0 12px rgba(255, 42, 52, 0.6)) drop-shadow(0 0 24px rgba(42, 217, 255, 0.4));
            animation: infinite-glow-pulse 2.5s ease-in-out infinite;
          }
          @keyframes infinite-rainbow-flow {
            0% { background-position: 0% 50%; }
            100% { background-position: 400% 50%; }
          }
          @keyframes infinite-scale {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
          }
          @keyframes infinite-glow-pulse {
            0%, 100% { filter: drop-shadow(0 0 12px rgba(255, 42, 52, 0.6)) drop-shadow(0 0 24px rgba(42, 217, 255, 0.4)); }
            50% { filter: drop-shadow(0 0 20px rgba(255, 42, 52, 0.9)) drop-shadow(0 0 40px rgba(42, 217, 255, 0.7)); }
          }
        `}
      </style>
    </span>
  );
}