import React from 'react';
import { Composition } from 'remotion';
import { StoryVideo, calculateStoryVideoMetadata } from './StoryVideo';
import { STORIES } from './stories';

const WIDTH = 1080;
const HEIGHT = 1350; // 4:5 — reads well on phones and as a portrait keepsake video

export const Root: React.FC = () => {
  return (
    <>
      {STORIES.map((story) => (
        <Composition
          key={story.id}
          id={`Story-${story.id}`}
          component={StoryVideo}
          width={WIDTH}
          height={HEIGHT}
          fps={30}
          durationInFrames={300}
          defaultProps={{ storyId: story.id }}
          calculateMetadata={calculateStoryVideoMetadata}
        />
      ))}
    </>
  );
};
