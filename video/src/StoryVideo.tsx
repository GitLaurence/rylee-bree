import React from 'react';
import { AbsoluteFill, CalculateMetadataFunction } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { Story, STORIES } from './stories';
import { TitleCard } from './components/TitleCard';
import { PageScene } from './components/PageScene';
import { EndCard } from './components/EndCard';

export type StoryVideoProps = { storyId: string };

const FPS = 30;
const TITLE_DURATION = 95;
const END_DURATION = 110;
const TRANSITION_DURATION = 20;

/** Reading-paced duration: a calm baseline plus time per word. */
function pageDuration(text: string): number {
  const words = text.split(' ').length;
  return Math.round(FPS * (2.6 + words * 0.42));
}

function getStory(storyId: string): Story {
  const story = STORIES.find((s) => s.id === storyId);
  if (!story) {
    throw new Error(`Unknown story id "${storyId}". Known ids: ${STORIES.map((s) => s.id).join(', ')}`);
  }
  return story;
}

export const calculateStoryVideoMetadata: CalculateMetadataFunction<StoryVideoProps> = ({ props }) => {
  const story = getStory(props.storyId);
  const sequenceDurations = [TITLE_DURATION, ...story.pages.map((p) => pageDuration(p.text)), END_DURATION];
  const transitionCount = sequenceDurations.length - 1;
  const totalDuration =
    sequenceDurations.reduce((sum, d) => sum + d, 0) - transitionCount * TRANSITION_DURATION;

  return {
    durationInFrames: Math.max(totalDuration, FPS * 3),
    fps: FPS,
    defaultOutName: `${story.id}-${slugify(story.title)}`,
  };
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export const StoryVideo: React.FC<StoryVideoProps> = ({ storyId }) => {
  const story = getStory(storyId);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0118' }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={TITLE_DURATION}>
          <TitleCard story={story} />
        </TransitionSeries.Sequence>

        {story.pages.map((page, i) => (
          <React.Fragment key={i}>
            <TransitionSeries.Transition
              presentation={fade()}
              timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
            />
            <TransitionSeries.Sequence durationInFrames={pageDuration(page.text)}>
              <PageScene
                page={page}
                chars={story.chars}
                pageNumber={i + 1}
                totalPages={story.pages.length}
                uidPrefix={`${story.id}p${i}`}
              />
            </TransitionSeries.Sequence>
          </React.Fragment>
        ))}

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />
        <TransitionSeries.Sequence durationInFrames={END_DURATION}>
          <EndCard storyId={story.id} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
