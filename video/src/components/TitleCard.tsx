import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';
import { Story } from '../stories';
import { charLabel, charColor } from './IllustrationLayer';
import { Twinkles } from './Twinkles';

export const TitleCard: React.FC<{ story: Story }> = ({ story }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, mass: 0.6 } });
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
  const titleOpacity = interpolate(frame, [0, fps * 0.6], [0, 1], { extrapolateRight: 'clamp' });

  const subOpacity = interpolate(frame, [fps * 0.5, fps * 1.1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: 'radial-gradient(120% 90% at 50% 30%, #1d0f3d 0%, #0a0118 70%)',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Baloo 2", "Nunito", sans-serif',
      }}
    >
      <Twinkles count={50} seed={story.id} />
      <div style={{ position: 'relative', textAlign: 'center', padding: '0 80px' }}>
        <div
          style={{
            opacity: subOpacity,
            color: '#FFD700',
            fontSize: 28,
            letterSpacing: 6,
            textTransform: 'uppercase',
            marginBottom: 18,
          }}
        >
          ✦ A Bedtime Story ✦
        </div>
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            color: '#fff',
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.08,
            textShadow: '0 6px 30px rgba(139,68,240,0.65)',
          }}
        >
          {story.title}
        </div>
        <div
          style={{
            opacity: subOpacity,
            marginTop: 30,
            display: 'flex',
            justifyContent: 'center',
            gap: 14,
          }}
        >
          {story.chars.map((c) => (
            <span
              key={c}
              style={{
                background: `${charColor(c)}26`,
                border: `2px solid ${charColor(c)}`,
                color: '#fff',
                borderRadius: 999,
                padding: '10px 22px',
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              {charLabel(c)}
            </span>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
