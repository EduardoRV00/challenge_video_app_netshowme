import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { VideosProvider, VideosContext } from '~/context/VideosContext';
import { api } from '~/services/api';

jest.mock('~/services/api');

describe('VideosContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve buscar vídeos com fetchVideos', async () => {
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

    (api.fetchVideos as jest.Mock).mockResolvedValueOnce(mockVideos);

    const { result, waitForNextUpdate } = renderHook(() => React.useContext(VideosContext), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <VideosProvider>{children}</VideosProvider>
      ),
    });

    act(() => {
      result.current.fetchVideos(1, 10);
    });

    await waitForNextUpdate({ timeout: 3000 }); // Aumenta o timeout para 3 segundos

    expect(api.fetchVideos).toHaveBeenCalledWith(1, 10);
    expect(result.current.videos).toEqual(mockVideos);
  });
});
