
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import VideoList from './components/VideoList';
import ArticleView from './components/ArticleView';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchMorningWorshipVideos } from './services/jwScraper';
import { generateArticleFromVideoTitle, startChatForArticle, sendMessageToChat } from './services/geminiService';
import type { Video, AppState, ChatMessage } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('loadingList');
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [articleContent, setArticleContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // New state for search and chat
  const [searchTerm, setSearchTerm] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const fetchedVideos = await fetchMorningWorshipVideos();
        setVideos(fetchedVideos);
        setAppState('listVisible');
      } catch (err) {
        setError('Failed to load videos. Please refresh the page.');
        setAppState('error');
      }
    };
    loadVideos();
  }, []);

  const filteredVideos = useMemo(() => {
    if (!searchTerm) return videos;
    return videos.filter(video =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.speaker.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [videos, searchTerm]);

  const handleSelectVideo = useCallback(async (video: Video) => {
    setSelectedVideo(video);
    setArticleContent(null);
    setChatHistory([]); // Reset chat history for new article
    setAppState('loadingArticle');
    try {
      const content = await generateArticleFromVideoTitle(video.title);
      setArticleContent(content);
      startChatForArticle(content, video.title); // Initialize chat
      setAppState('articleVisible');
    } catch (err) {
      setError('Failed to generate the article. Please try again.');
      setAppState('error');
    }
  }, []);
  
  const handleSendMessage = useCallback(async (message: string) => {
    const newUserMessage: ChatMessage = { role: 'user', content: message };
    setChatHistory(prev => [...prev, newUserMessage]);
    setIsChatLoading(true);

    try {
        const modelResponse = await sendMessageToChat(message);
        const newModelMessage: ChatMessage = { role: 'model', content: modelResponse };
        setChatHistory(prev => [...prev, newModelMessage]);
    } catch (err) {
        const errorMessage: ChatMessage = { role: 'model', content: 'Sorry, I ran into a problem. Please try again.' };
        setChatHistory(prev => [...prev, errorMessage]);
    } finally {
        setIsChatLoading(false);
    }
  }, []);

  const handleBackToList = useCallback(() => {
    setSelectedVideo(null);
    setArticleContent(null);
    setChatHistory([]);
    setAppState('listVisible');
  }, []);

  const renderContent = () => {
    switch (appState) {
      case 'loadingList':
        return <div className="mt-20"><LoadingSpinner message="Loading Morning Worship Videos..." /></div>;
      
      case 'listVisible':
        return <VideoList 
                    videos={filteredVideos} 
                    onSelectVideo={handleSelectVideo} 
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />;

      case 'loadingArticle':
      case 'articleVisible':
        if (selectedVideo) {
          return (
            <ArticleView
              video={selectedVideo}
              article={articleContent}
              isLoading={appState === 'loadingArticle'}
              onBack={handleBackToList}
              chatHistory={chatHistory}
              isChatLoading={isChatLoading}
              onSendMessage={handleSendMessage}
            />
          );
        }
        return null; // Should not happen

      case 'error':
        return (
          <div className="text-center p-8 mt-10">
            <h2 className="text-2xl font-bold text-red-600">An Error Occurred</h2>
            <p className="text-gray-700 mt-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-DEFAULT hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-DEFAULT"
            >
              Try Again
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main>
        {renderContent()}
      </main>
      <footer className="text-center py-4 mt-8">
        <p className="text-xs text-gray-400">Content summaries are AI-generated for personal reflection.</p>
      </footer>
    </div>
  );
};

export default App;
