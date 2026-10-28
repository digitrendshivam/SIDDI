import React, { useCallback, useEffect, useRef } from 'react';
import { getLenis } from '../../lib/motion';
import './ScrollExpand.css';

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

export interface ScrollExpandProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  mediaType?: 'image' | 'video';
  poster?: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  useWindowScroll?: boolean;
  enabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const ScrollExpand: React.FC<ScrollExpandProps> = ({
  src = '',
  mediaType = 'image',
  poster = '',
  alt = '',
  title = '',
  scrollHint = '',
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = false,
  enabled = true,
  children,
  className = '',
  style,
  ...rest
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const expandSpanRef = useRef(0);
  const maxScrollRef = useRef(0);

  const propsRef = useRef({
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled,
  });

  propsRef.current = {
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled,
  };

  const applyProgress = useCallback((p: number, formScroll: number) => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) return;
    const c = propsRef.current;

    const e = smoothstep(0, 1, p);

    const w = c.startWidth + (100 - c.startWidth) * e;
    const h = c.startHeight + (100 - c.startHeight) * e;
    const ix = Math.max(0, (100 - w) / 2);
    const iy = Math.max(0, (100 - h) / 2);
    const r = c.startRadius + (c.endRadius - c.startRadius) * e;
    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;

    media.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * e})`;

    if (scrimRef.current) scrimRef.current.style.opacity = `${c.overlayScrim * e}`;

    if (titleRef.current) {
      const out = smoothstep(0.1, 0.45, p);
      titleRef.current.style.opacity = `${1 - out}`;
      titleRef.current.style.transform = `translate3d(0, ${-36 * out}px, 0) scale(${1 + 0.06 * out})`;
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.1, p);
      hintRef.current.style.opacity = `${1 - gone}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;
    }

    if (overlayRef.current) {
      const inn = smoothstep(0.3, 0.65, p);
      overlayRef.current.style.opacity = `${inn}`;
      overlayRef.current.style.pointerEvents = inn > 0.3 ? 'auto' : 'none';
    }

    if (contentRef.current) {
      const inn = smoothstep(0.3, 0.65, p);
      const entranceY = 24 * (1 - inn);
      contentRef.current.style.transform = `translate3d(0, ${entranceY - formScroll}px, 0)`;
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let currentP = 0;
    let targetP = 0;
    let currentScroll = 0;
    let targetScroll = 0;
    let stageH = 0;
    let running = false;

    const measure = () => {
      const c = propsRef.current;
      stageH = c.useWindowScroll ? Math.max(400, window.innerHeight - 68) : root.clientHeight;
      if (stageH <= 0) return;
      stage.style.height = `${stageH}px`;

      const contentEl = contentRef.current;
      const contentH = contentEl ? contentEl.offsetHeight : 0;
      // Extra vertical travel needed so the entire form (including send button and notes) is reached
      const maxScroll = Math.max(0, contentH - stageH + 90);
      maxScrollRef.current = maxScroll;

      const expandSpan = stageH * Math.max(0.01, c.scrollDistance);
      expandSpanRef.current = expandSpan;

      const holdExtra = stageH * Math.max(0, c.holdDistance);
      track.style.height = `${stageH + expandSpan + maxScroll + holdExtra}px`;

      const w = root.clientWidth || stageH;
      stage.style.setProperty('--se-title-size', `${clamp(w * 0.075, 20, 84)}px`);
    };

    const readScroll = () => {
      const c = propsRef.current;
      if (!c.enabled) return { p: 1, formScroll: 0 };

      const expandSpan = expandSpanRef.current || 1;
      const maxScroll = maxScrollRef.current || 0;

      let scrolled = 0;
      if (c.useWindowScroll) {
        const top = track.getBoundingClientRect().top;
        scrolled = Math.max(0, 68 - top);
      } else {
        scrolled = root.scrollTop;
      }

      const p = clamp(scrolled / expandSpan, 0, 1);
      const afterExpand = Math.max(0, scrolled - expandSpan);
      const formScroll = clamp(afterExpand, 0, maxScroll);

      return { p, formScroll };
    };

    const tick = () => {
      const c = propsRef.current;
      const k = c.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * c.smoothing));
      currentP += (targetP - currentP) * k;
      currentScroll += (targetScroll - currentScroll) * k;

      if (Math.abs(targetP - currentP) < 0.0004 && Math.abs(targetScroll - currentScroll) < 0.4) {
        currentP = targetP;
        currentScroll = targetScroll;
        running = false;
      }
      applyProgress(currentP, currentScroll);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const { p, formScroll } = readScroll();
      targetP = p;
      targetScroll = formScroll;
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        currentP = targetP;
        currentScroll = targetScroll;
        applyProgress(currentP, currentScroll);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      const { p, formScroll } = readScroll();
      targetP = p;
      targetScroll = formScroll;
      currentP = targetP;
      currentScroll = targetScroll;
      applyProgress(currentP, currentScroll);
    };

    measure();
    const initial = readScroll();
    targetP = initial.p;
    targetScroll = initial.formScroll;
    currentP = targetP;
    currentScroll = targetScroll;
    applyProgress(currentP, currentScroll);

    const scroller = useWindowScroll ? window : root;
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    const ro = new ResizeObserver(onResize);
    ro.observe(root);
    if (contentRef.current) {
      ro.observe(contentRef.current);
    }

    const lenis = getLenis();
    if (useWindowScroll && lenis) {
      lenis.on('scroll', onScroll);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
      if (useWindowScroll && lenis) {
        lenis.off('scroll', onScroll);
      }
    };
  }, [applyProgress, useWindowScroll]);

  const media =
    mediaType === 'video' ? (
      <video
        ref={mediaRef as React.RefObject<HTMLVideoElement>}
        className="scroll-expand__media"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      <img
        ref={mediaRef as React.RefObject<HTMLImageElement>}
        className="scroll-expand__media"
        src={src}
        alt={alt}
        draggable={false}
      />
    );

  return (
    <div
      ref={rootRef}
      className={`scroll-expand ${useWindowScroll ? '' : 'scroll-expand--scroller'} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={trackRef} className="scroll-expand__track">
        <div ref={stageRef} className="scroll-expand__stage">
          <div ref={frameRef} className="scroll-expand__frame">
            {media}
            <div ref={scrimRef} className="scroll-expand__scrim" />
            {children ? (
              <div ref={overlayRef} className="scroll-expand__overlay">
                <div ref={contentRef} className="scroll-expand__content">
                  {children}
                </div>
              </div>
            ) : null}
          </div>
          {title ? (
            <div ref={titleRef} className="scroll-expand__title">
              {title}
            </div>
          ) : null}
          {scrollHint ? (
            <div ref={hintRef} className="scroll-expand__hint">
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ScrollExpand;
