import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from '~/screens/HomeScreen';
import { VideosContext } from '~/context/VideosContext';

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
  {
    id: '2',
    title: 'Test Video 2',
    thumbnail: 'https://example.com/thumbnail2.jpg',
    likes: 5,
    views: 15,
    created_at: '2023-01-02T00:00:00.000Z',
    category: 2,
    hls_path: 'https://example.com/video2.m3u8',
    description: 'Test description 2',
    site_id: 456,
  },
];

const mockContext = {
  videos: mockVideos,
  fetchVideos: jest.fn(),
  fetchVideoById: jest.fn(),
  incrementLikes: jest.fn(),
  incrementViews: jest.fn(),
};


describe('HomeScreen', () => {
  it('deve renderizar os vídeos da lista', async () => {
    const { getByText } = render(
      <VideosContext.Provider value={mockContext}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </VideosContext.Provider>
    );

    await waitFor(() => {
      expect(getByText('Test Video 1')).toBeTruthy();
      expect(getByText('Test Video 2')).toBeTruthy();
    });
  });
});
