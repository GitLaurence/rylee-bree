import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { Twinkles } from './Twinkles';

export const EndCard: React.FC<{ storyId: string }> = ({ storyId }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const moonSpring = spring({ frame, fps, config: { damping: 12, mass: 0.7 } });
  const moonScale = interpolate(moonSpring, [0, 1], [0.4, 1]);
  const moonOpacity = interpolate(frame, [0, fps * 0.5], [0, 1], { extrapolateRight: 'clamp' });

  const textOpacity = interpolate(frame, [fps * 0.6, fps * 1.3], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: 'radial-gradient(120% 90% at 50% 70%, #1d0f3d 0%, #0a0118 70%)',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Baloo 2", "Nunito", sans-serif',
      }}
    >
      <Twinkles count={60} seed={`${storyId}-end`} />
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: 110,
            opacity: moonOpacity,
            transform: `scale(${moonScale})`,
            filter: 'drop-shadow(0 0 40px rgba(255,215,0,0.45))',
          }}
        >
          🌙
        </div>
        <div
          style={{
            marginTop: 22,
            color: '#fff',
            fontSize: 56,
            fontWeight: 800,
            opacity: textOpacity,
            textShadow: '0 6px 30px rgba(139,68,240,0.6)',
          }}
        >
          The End
        </div>
        <div
          style={{
            marginTop: 12,
            color: '#FFD700',
            fontSize: 28,
            opacity: textOpacity,
            letterSpacing: 2,
          }}
        >
          Sweet dreams ✦
        </div>
      </div>
    </AbsoluteFill>
  );
};
