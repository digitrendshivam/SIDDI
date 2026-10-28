import React from 'react';

export interface DoorLeverProps {
  className?: string;
  flip?: boolean;
  size?: number | string;
  style?: React.CSSProperties;
}

/**
 * Architectural Door Lever Icon
 * Round rose escutcheon and rotating lever handle bar.
 * Rotates downwards on hover (32deg) and click/active (48deg).
 */
export const DoorLever: React.FC<DoorLeverProps> = ({
  className = '',
  flip = false,
  size = '1.25em',
  style,
}) => {
  return (
    <svg
      className={`door-lever ${flip ? 'door-lever--flip' : ''} ${className}`}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      style={{ overflow: 'visible', flexShrink: 0, ...style }}
    >
      {/* Rose Mount / Escutcheon Backplate */}
      <circle cx="6" cy="12" r="4.8" fill="currentColor" />

      {/* Lever Handle Bar (rotates downward around rose pivot at 6px, 12px) */}
      <rect
        className="door-lever-bar"
        x="6"
        y="10.2"
        width="16"
        height="3.6"
        rx="1.8"
        fill="currentColor"
      />
    </svg>
  );
};

export default DoorLever;
