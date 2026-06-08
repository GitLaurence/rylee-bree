import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { StoryPage } from '../stories';
import { IllustrationLayer } from './IllustrationLayer';

/**
 * One story page: full-bleed scene + character illustration with a gentle
 * Ken Burns drift, plus a claymorphism-styled text panel whose words reveal
 * progressively (paced to roughly match a calm read-aloud speed).
 */
export const PageScene: React.FC<{
  page: StoryPage;
  chars: string[];
  pageNumber: number;
  totalPages: number;
  uidPrefix: string;
}> = ({ page, chars, pageNumber, totalPages, uidPrefix }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Ken Burns: slow drifting zoom, alternating direction by page number for variety.
  const zoomFrom = pageNumber % 2 === 0 ? 1.0 : 1.07;
  const zoomTo = pageNumber % 2 === 0 ? 1.07 : 1.0;
  const scale = interpolate(frame, [0, durationInFrames], [zoomFrom, zoomTo], {
    easing: Easing.bezier(0.34, 0.0, 0.64, 1),
    extrapolateRight: 'clamp',
  });
  const panX = interpolate(frame, [0, durationInFrames], [pageNumber % 2 === 0 ? -1 : 1, pageNumber % 2 === 0 ? 1 : -1], {
    extrapolateRight: 'clamp',
  });

  // Panel slides up + fades in.
  const panelIn = interpolate(frame, [fps * 0.15, fps * 0.75], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });
  const panelY = interpolate(panelIn, [0, 1], [60, 0]);

  // Word-by-word text reveal, paced ~2.4 words per second.
  const words = page.text.split(' ');
  const wordsPerSecond = 2.4;
  const revealStart = fps * 0.9;
  const revealedCount = Math.max(
    0,
    Math.floor(((frame - revealStart) / fps) * wordsPerSecond),
  );

  return (
    <AbsoluteFill style={{ background: '#0a0118', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${scale}) translate(${panX * 1.2}%, 0)`,
          transformOrigin: 'center center',
        }}
      >
        <IllustrationLayer scene={page.scene} chars={chars} uidPrefix={uidPrefix} />
      </div>

      {/* Vignette so the text panel reads clearly over busy art */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(10,1,24,0.88) 0%, rgba(10,1,24,0.25) 38%, rgba(10,1,24,0) 62%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 64,
          right: 64,
          bottom: 56,
          opacity: panelIn,
          transform: `translateY(${panelY}px)`,
        }}
      >
        <div
          style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.14)',
            border: '2px solid rgba(255,255,255,0.28)',
            borderRadius: 999,
            color: '#FFD700',
            fontFamily: '"Baloo 2", sans-serif',
            fontSize: 22,
            fontWeight: 700,
            padding: '6px 22px',
            marginBottom: 18,
            backdropFilter: 'blur(6px)',
          }}
        >
          Page {pageNumber} of {totalPages}
        </div>
        <div
          style={{
            background: 'rgba(255,255,255,0.92)',
            borderRadius: 32,
            padding: '34px 44px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
            fontFamily: '"Nunito", sans-serif',
            fontSize: 34,
            lineHeight: 1.5,
            color: '#2d1a4a',
            fontWeight: 600,
          }}
        >
          {words.map((w, i) => (
            <span
              key={i}
              style={{
                opacity: i < revealedCount ? 1 : 0,
                transition: 'none',
                marginRight: 10,
                display: 'inline-block',
              }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
