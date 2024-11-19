import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../screens/HomeScreen';
import { VideosContext } from '../../context/VideosContext';
import { act } from 'react-test-renderer';

describe('HomeScreen', () => {
  const mockContext = {
    videos: [
      {
        id: '1',
        title: 'Test Video 1',
        thumbnail: 'https://example.com/thumbnail1.jpg',
        description: 'Test description',
        created_at: '2023-01-01T00:00:00.000Z',
        category: 1,
        hls_path: 'https://example.com/video1.m3u8',
        site_id: 123,
        views: 10,
        likes: 5,
      },
    ],
    fetchVideos: jest.fn().mockResolvedValue(true), // Mock para simular sucesso na busca
    fetchVideoById: jest.fn(),
    incrementLikes: jest.fn(),
    incrementViews: jest.fn(),
  };

  it('deve renderizar os vídeos da lista', async () => {
    const { getByText } = render(
      <VideosContext.Provider value={mockContext}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </VideosContext.Provider>
    );

    // Aguarde o estado atualizar e o componente renderizar
    await act(async () => {
      await mockContext.fetchVideos();
    });

    await waitFor(() => {
      // Verifique se os textos do vídeo são exibidos
      expect(getByText('Test Video 1')).toBeTruthy();
      expect(getByText('Test description')).toBeTruthy();
    });
  });
});
