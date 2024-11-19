import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { VideosProvider, useVideosContext } from '../../context/VideosContext';
import { api } from '../../services/api';

// Mock da API
jest.mock('~/services/api', () => ({
  api: {
    fetchVideos: jest.fn(),
    fetchVideoById: jest.fn(),
  },
}));

const mockVideos = [
  {
    id: '1',
    title: 'Test Video 1',
    thumbnail: 'https://example.com/thumbnail1.jpg',
    likes: 10,
    views: 20,
    created_at: '2023-01-01T00:00:00.000Z',
    category: 1,
    hls_path: 'https://example.com/video1.m3u8',
    description: 'Test description 1',
    site_id: 123,
  },
];

jest.spyOn(console, 'error').mockImplementation(() => { });

describe('VideosContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (api.fetchVideos as jest.Mock).mockResolvedValue(mockVideos);
  });

  it('deve buscar vídeos com fetchVideos', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <VideosProvider>{children}</VideosProvider>
    );

    const { result } = renderHook(() => useVideosContext(), { wrapper });

    await act(async () => {
      await result.current.fetchVideos(1, 10);
    });

    // Verifica se a função fetchVideos foi chamada corretamente
    expect(api.fetchVideos).toHaveBeenCalledWith(1, 10);

    // Verifica se os vídeos foram armazenados corretamente no contexto
    expect(result.current.videos).toEqual(mockVideos);
  });

  it('deve lidar com erro ao buscar vídeos', async () => {
    (api.fetchVideos as jest.Mock).mockRejectedValue(new Error('Erro ao buscar vídeos'));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <VideosProvider>{children}</VideosProvider>
    );

    const { result } = renderHook(() => useVideosContext(), { wrapper });

    await act(async () => {
      await result.current.fetchVideos(1, 10);
    });

    // Verifica se os vídeos permanecem vazios em caso de erro
    expect(result.current.videos).toEqual([]);
  });
});
