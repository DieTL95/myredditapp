const PlayIconComponent = ({ opacity }: { opacity?: string }) => {
  return (
    <svg viewBox="0 0 60 61" aria-hidden="true" className="group/btn">
      <g>
        <circle
          cx="30"
          cy="30.4219"
          fill="#99a1af"
          opacity={opacity || "0.4"}
          className="group-hover/btn:opacity-40"
          r="30"
        ></circle>
        <path
          d="M22.2275 17.1971V43.6465L43.0304 30.4218L22.2275 17.1971Z"
          fill="white"
        ></path>
      </g>
    </svg>
  );
};

export default PlayIconComponent;
