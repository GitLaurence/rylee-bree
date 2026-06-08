import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

function seededRand(seed: number) {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return h >>> 0;
}

/** Soft twinkling star field — decorative background accent shared across cards. */
export const Twinkles: React.FC<{ count?: number; seed: string }> = ({ count = 40, seed }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const stars = useMemo(() => {
    const rand = seededRand(hash(seed));
    return Array.from({ length: count }, () => ({
      x: rand() * width,
      y: rand() * height,
      r: 1.5 + rand() * 3,
      phase: rand() * Math.PI * 2,
      speed: 0.06 + rand() * 0.08,
    }));
  }, [count, seed, width, height]);

  return (
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      viewBox={`0 0 ${width} ${height}`}
    >
      {stars.map((s, i) => {
        const tw = Math.sin(frame * s.speed + s.phase);
        const opacity = interpolate(tw, [-1, 1], [0.15, 0.95]);
        return <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={opacity} />;
      })}
    </svg>
  );
};
