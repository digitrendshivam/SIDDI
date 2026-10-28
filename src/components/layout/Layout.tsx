import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingActions } from '../common/FloatingActions';

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F3EF] text-[#171719] max-w-full overflow-x-clip">
      <Header />
      <main className="flex-grow w-full max-w-full min-w-0 pt-[68px] overflow-x-clip">
        {children}
      </main>
      <Footer />
      {/* Persistent WhatsApp floating action */}
      <FloatingActions />
    </div>
  );
};

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Standardized responsive container matching the SIDDI design system:
 * - Mobile (<640px): 16px (px-4)
 * - Small (640px-768px): 24px (sm:px-6)
 * - Tablet (768px-1024px): 40px (md:px-10)
 * - Desktop (>=1024px): 64px (lg:px-16)
 * - Full content width: w-full mx-auto
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  as: Component = 'div',
  ...rest
}) => {
  return (
    <Component
      className={`w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-16 ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Layout;
