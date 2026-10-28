import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import { DoorLever } from './DoorLever';

export const RollLabel: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span className="roll-wrapper">
    <span className="roll-label">{children}</span>
    <span className="roll-clone" aria-hidden="true">{children}</span>
  </span>
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'secondary' | 'dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  withArrow?: boolean;
  withLever?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size: _size,
  to,
  withArrow = false,
  withLever = true,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const isPrimary = variant === 'primary' || variant === 'secondary';
  const variantClass = isPrimary ? 'btn-primary' : 'btn-outline';

  const innerContent = (
    <span className="inline-flex items-center justify-center gap-2">
      <RollLabel>{children}</RollLabel>
      {withLever ? (
        <DoorLever className="shrink-0" />
      ) : withArrow ? (
        <ArrowRight
          size={16}
          weight="regular"
          className="link-arrow ml-1.5 shrink-0"
        />
      ) : null}
    </span>
  );

  const combinedClass = `btn-roll ${variantClass} ${disabled ? 'opacity-40 pointer-events-none' : ''} ${className}`;

  if (to && !disabled) {
    return (
      <Link to={to} className={combinedClass}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      type={props.type || 'button'}
      disabled={disabled}
      className={combinedClass}
      {...props}
    >
      {innerContent}
    </button>
  );
};

export const DoorButton = Button;
export { DoorLever };
export default Button;
