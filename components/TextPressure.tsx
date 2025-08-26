'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
// import { useTheme } from 'next-themes';

interface TextPressureProps {
    text?: string;
    fontFamily?: string;
    fontUrl?: string;
    width?: boolean;
    weight?: boolean;
    italic?: boolean;
    alpha?: boolean;
    flex?: boolean;
    stroke?: boolean;
    scale?: boolean;
    textColor?: string;
    strokeColor?: string;
    className?: string;
    minFontSize?: number;
    autoColorMode?: boolean;
}

const TextPressure: React.FC<TextPressureProps> = ({
    text = 'Compressa',
    fontFamily = 'Compressa VF',
    fontUrl = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',
    width = true,
    weight = true,
    italic = true,
    alpha = false,
    flex = true,
    stroke = false,
    scale = false,
    textColor,
    strokeColor,
    className = '',
    minFontSize = 24,
    autoColorMode = true,
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

    const mouseRef = useRef({ x: 0, y: 0 });
    const cursorRef = useRef({ x: 0, y: 0 });

    const [fontSize, setFontSize] = useState(minFontSize);
    const [scaleY, setScaleY] = useState(1);
    const [lineHeight, setLineHeight] = useState(1);
    const [isDark, setIsDark] = useState(false);

    const chars = text.split('');

    // 简单的主题检测 hook
    useEffect(() => {
        const detectTheme = () => {
            const computedStyle = getComputedStyle(document.documentElement);
            const bgColor = computedStyle.getPropertyValue('--background');
            const isDarkMode = bgColor.includes('3.9%') || 
                             document.documentElement.classList.contains('dark') ||
                             document.documentElement.getAttribute('data-theme') === 'dark';
            setIsDark(isDarkMode);
        };

        detectTheme();

        const observer = new MutationObserver(detectTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class', 'data-theme']
        });

        return () => observer.disconnect();
    }, []);

    // 根据主题获取动态颜色
    const getTextColor = () => {
        if (textColor && !autoColorMode) {
            return textColor;
        }
        return isDark ? '#FFFFFF' : '#000000';
    };

    const getStrokeColor = () => {
        if (strokeColor && !autoColorMode) {
            return strokeColor;
        }
        return isDark ? '#FF6B6B' : '#FF0000';
    };

    const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    // useTheme hook 已经处理了主题变化的监听

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorRef.current.x = e.clientX;
            cursorRef.current.y = e.clientY;
        };
        const handleTouchMove = (e: TouchEvent) => {
            const t = e.touches[0];
            cursorRef.current.x = t.clientX;
            cursorRef.current.y = t.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        if (containerRef.current) {
            const { left, top, width, height } = containerRef.current.getBoundingClientRect();
            mouseRef.current.x = left + width / 2;
            mouseRef.current.y = top + height / 2;
            cursorRef.current.x = mouseRef.current.x;
            cursorRef.current.y = mouseRef.current.y;
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    const setSize = useCallback(() => {
        if (!containerRef.current || !titleRef.current) return;

        const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();

        let newFontSize = containerW / (chars.length / 2);
        newFontSize = Math.max(newFontSize, minFontSize);

        setFontSize(newFontSize);
        setScaleY(1);
        setLineHeight(1);

        requestAnimationFrame(() => {
            if (!titleRef.current) return;
            const textRect = titleRef.current.getBoundingClientRect();

            if (scale && textRect.height > 0) {
                const yRatio = containerH / textRect.height;
                setScaleY(yRatio);
                setLineHeight(yRatio);
            }
        });
    }, [chars.length, minFontSize, scale]);

    useEffect(() => {
        setSize();
        window.addEventListener('resize', setSize);
        return () => window.removeEventListener('resize', setSize);
    }, [setSize]);

    useEffect(() => {
        let rafId: number;
        const animate = () => {
            mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
            mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

            if (titleRef.current) {
                const titleRect = titleRef.current.getBoundingClientRect();
                const maxDist = titleRect.width / 2;

                spansRef.current.forEach((span) => {
                    if (!span) return;

                    const rect = span.getBoundingClientRect();
                    const charCenter = {
                        x: rect.x + rect.width / 2,
                        y: rect.y + rect.height / 2,
                    };

                    const d = dist(mouseRef.current, charCenter);

                    const getAttr = (distance: number, minVal: number, maxVal: number) => {
                        const val = maxVal - Math.abs((maxVal * distance) / maxDist);
                        return Math.max(minVal, val + minVal);
                    };

                    const wdth = width ? Math.floor(getAttr(d, 5, 200)) : 100;
                    const wght = weight ? Math.floor(getAttr(d, 100, 900)) : 400;
                    const italVal = italic ? getAttr(d, 0, 1).toFixed(2) : 0;
                    const alphaVal = alpha ? getAttr(d, 0, 1).toFixed(2) : 1;

                    span.style.opacity = alphaVal.toString();
                    span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
                });
            }

            rafId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(rafId);
    }, [width, weight, italic, alpha, chars.length]);

    const dynamicClassName = [className, flex ? 'flex' : '', stroke ? 'stroke' : '']
        .filter(Boolean)
        .join(' ');

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                background: 'transparent',
            }}
        >
            <style>{`
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}');
          font-style: normal;
        }

        .flex {
          display: flex;
          justify-content: space-between;
        }

        .stroke span {
          position: relative;
          color: ${getTextColor()};
        }
        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: 3px;
          -webkit-text-stroke-color: ${getStrokeColor()};
        }

        .text-pressure-title {
          color: ${getTextColor()};
        }
      `}</style>

            <h1
                ref={titleRef}
                className={`text-pressure-title ${dynamicClassName}`}
                style={{
                    fontFamily,
                    textTransform: 'uppercase',
                    fontSize: fontSize,
                    lineHeight,
                    transform: `scale(1, ${scaleY})`,
                    transformOrigin: 'center top',
                    margin: 0,
                    textAlign: 'center',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                    fontWeight: 100,
                    width: '100%',
                }}
            >
                {chars.map((char, i) => (
                    <span
                        key={i}
                        ref={(el) => { spansRef.current[i] = el }}
                        data-char={char}
                        style={{
                            display: 'inline-block',
                            color: stroke ? undefined : getTextColor()
                        }}
                    >
                        {char}
                    </span>
                ))}
            </h1>
        </div>
    );
};

export default TextPressure;
