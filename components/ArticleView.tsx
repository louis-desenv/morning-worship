
import React from 'react';
import { Video, ChatMessage } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ChatPanel from './ChatPanel';

interface ArticleViewProps {
  video: Video;
  article: string | null;
  isLoading: boolean;
  onBack: () => void;
  chatHistory: ChatMessage[];
  isChatLoading: boolean;
  onSendMessage: (message: string) => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({
  video,
  article,
  isLoading,
  onBack,
  chatHistory,
  isChatLoading,
  onSendMessage
}) => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-brand-dark bg-brand-light hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-DEFAULT"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Video List
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Article Content */}
        <div className="lg:col-span-3">
            <div className="bg-white p-6 sm:p-10 rounded-lg shadow-xl h-full max-h-[85vh] overflow-y-auto">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-2">{video.title}</h2>
                <p className="text-md text-gray-500 mb-8">Speaker: {video.speaker}</p>

                {isLoading ? (
                <LoadingSpinner message="Generating your article, please wait..." />
                ) : (
                article && (
                    <article className="prose prose-lg max-w-none text-gray-800">
                        {article.split('\n').map((paragraph, index) => {
                            if (paragraph.trim() === '') return null;
                            const isSubheading = paragraph === paragraph.toUpperCase() && paragraph.length > 5 && !paragraph.endsWith('.') && paragraph.indexOf(' ') > -1;
                            if(isSubheading) {
                                return <h3 key={index} className="font-bold mt-6 text-gray-800">{paragraph}</h3>;
                            }
                            return <p key={index}>{paragraph}</p>;
                        })}
                    </article>
                )
                )}
            </div>
        </div>

        {/* Chat Panel */}
        <div className="lg:col-span-2">
            <ChatPanel 
                history={chatHistory}
                isLoading={isChatLoading}
                onSendMessage={onSendMessage}
            />
        </div>
      </div>
    </div>
  );
};

export default ArticleView;
