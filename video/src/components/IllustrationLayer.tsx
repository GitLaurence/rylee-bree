import React, { useMemo } from 'react';
import { sceneArt, charArt, CHARS } from '../svgArt';

const VIEW_W = 400;
const VIEW_H = 490;

/**
 * Renders the same procedural scene + character SVG art used by the web
 * reader (js/app.js → sceneArt / charArt), so the video matches the app's
 * illustrated look exactly. Character placement mirrors renderPage() in
 * js/app.js (1, 2, or 3-up layouts).
 */
export const IllustrationLayer: React.FC<{
  scene: string;
  chars: string[];
  uidPrefix: string;
}> = ({ scene, chars, uidPrefix }) => {
  const sceneMarkup = useMemo(() => sceneArt(scene, VIEW_W, VIEW_H), [scene]);

  const charMarkup = useMemo(() => {
    const total = chars.length;
    // Mirrors the 1/2/3-up layout from js/app.js renderPage(); extended with
    // a 4-up row (the web app's formula collapses chars 3 & 4 onto the same
    // spot — fine for a quick page flip, but visible in a held video frame).
    const positions =
      total === 1
        ? [0.5]
        : total === 2
          ? [0.3, 0.7]
          : total === 3
            ? [0.22, 0.5, 0.78]
            : [0.16, 0.39, 0.61, 0.84];
    const sc = total <= 2 ? 0.72 : total === 3 ? 0.58 : 0.48;
    return chars
      .map((c, i) => charArt(c, positions[i] * VIEW_W, VIEW_H * 0.66, sc, `${uidPrefix}c${i}`))
      .join('');
  }, [chars, uidPrefix]);

  return (
    <>
      <div
        style={{ position: 'absolute', inset: 0 }}
        dangerouslySetInnerHTML={{ __html: sceneMarkup }}
      />
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        dangerouslySetInnerHTML={{ __html: charMarkup }}
      />
    </>
  );
};

export const charLabel = (id: string) => CHARS[id as keyof typeof CHARS]?.label ?? id;
export const charColor = (id: string) => CHARS[id as keyof typeof CHARS]?.color ?? '#999';
