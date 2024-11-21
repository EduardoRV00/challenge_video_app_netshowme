import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Video } from '../types';
import { api } from '~/services/api';

const API_BASE_URL = "http://192.168.1.6:3000";

interface VideosContextData {
  videos: Video[];
  fetchVideos: (
    page?: number,
    limit?: number,
    query?: string,
    category?: string
  ) => Promise<void>;
  fetchVideoById: (id: string) => Promise<Video | undefined>;
  incrementLikes: (id: string) => Promise<void>;
  incrementViews: (id: string) => Promise<void>;
}

interface VideosProviderProps {
  children: ReactNode;
}

// Criação do contexto
export const VideosContext = createContext<VideosContextData | undefined>(undefined);

// Hook para usar o contexto com tipagem
export const useVideosContext = () => {
  const context = useContext(VideosContext);
  if (!context) {
    throw new Error('useVideosContext deve ser usado dentro de um VideosProvider');
  }
  return context;
};

export const VideosProvider = ({ children }: VideosProviderProps) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const ITEMS_PER_PAGE = 10;

  const fetchVideos = async (
    page = 1,
    limit = ITEMS_PER_PAGE,
    query = '',
    category = ''
  ) => {
    try {
      const url = `${API_BASE_URL}/videos?_page=${page}&_limit=${limit}&q=${query}&category=${category}`;
      console.log(`[VideosContext] Fetching videos from: ${url}`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro ao buscar vídeos: ${response.statusText}`);
      }
      const data = await response.json();

      setVideos((prevVideos) =>
        page === 1 ? data : [...prevVideos, ...data]
      );
    } catch (error) {
      console.error('[VideosContext] Erro ao buscar vídeos:', error);
    }
  };

  const fetchVideoById = async (id: string): Promise<Video | undefined> => {
    try {
      return await api.fetchVideoById(id);
    } catch (error) {
      console.error(`[VideosContext] Erro ao buscar vídeo com ID ${id}:`, error);
      return undefined;
    }
  };

  const incrementLikes = async (id: string) => {
    try {
      const video = videos.find((video) => video.id === id);
      if (video) {
        const updatedLikes = video.likes + 1;
        const updatedVideo = await api.patch(`/videos/${id}`, { likes: updatedLikes });
        updateVideoInState({ ...video, likes: updatedLikes });
      }
    } catch (error) {
      console.error('[VideosContext] Erro ao incrementar likes:', error);
    }
  };

  const incrementViews = async (id: string) => {
    try {
      const video = videos.find((video) => video.id === id);
      if (video && !video.viewIncremented) {
        const updatedViews = video.views + 1;
        const updatedVideo = await api.patch(`/videos/${id}`, { views: updatedViews });
        updateVideoInState({ ...updatedVideo, viewIncremented: true });
      }
    } catch (error) {
      console.error('[VideosContext] Erro ao incrementar views:', error);
    }
  };

  const updateVideoInState = (updatedVideo: Video) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === updatedVideo.id
          ? { ...updatedVideo, viewIncremented: video.viewIncremented || false }
          : video
      )
    );
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <VideosContext.Provider
      value={{
        videos,
        fetchVideos,
        fetchVideoById,
        incrementLikes,
        incrementViews,
      }}
    >
      {children}
    </VideosContext.Provider>
  );
};
