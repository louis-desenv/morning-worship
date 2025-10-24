
import React from 'react';
import { Video } from '../types';
import VideoItem from './VideoItem';

interface VideoListProps {
  videos: Video[];
  onSelectVideo: (video: Video) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const VideoList: React.FC<VideoListProps> = ({ videos, onSelectVideo, searchTerm, onSearchChange }) => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-lg mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            name="search"
            id="search"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-brand-DEFAULT focus:border-brand-DEFAULT sm:text-sm"
            placeholder="Search by title or speaker..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search videos"
          />
        </div>
      </div>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.length > 0 ? (
          videos.map((video) => (
            <VideoItem key={video.id} video={video} onSelect={() => onSelectVideo(video)} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium text-gray-700">No videos found</h3>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoList;
