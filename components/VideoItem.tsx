import React from 'react';
import { Video } from '../types';

interface VideoItemProps {
  video: Video;
  onSelect: () => void;
}

const VideoItem: React.FC<VideoItemProps> = ({ video, onSelect }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col p-6 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-DEFAULT"
      aria-label={`Read summary for ${video.title}`}
    >
      <div className="flex-grow flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-gray-800">{video.title}</h3>
        <p className="text-sm text-gray-500 mt-2">Speaker: {video.speaker}</p>
      </div>
    </div>
  );
};

export default VideoItem;
