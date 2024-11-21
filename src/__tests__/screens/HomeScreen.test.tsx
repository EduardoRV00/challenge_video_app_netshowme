import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../screens/home/HomeScreen';
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
    fetchVideos: jest.fn().mockResolvedValue(true), // Simula sucesso
    fetchCategories: jest.fn().mockResolvedValue([
      { id: '1', title: 'Over The Cast' },
      { id: '2', title: 'Flow Experience 2021' },
      { id: '3', title: 'Netshow.me Talks' },
    ]), // Simula as categorias
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

  it('deve renderizar os vídeos e categorias corretamente', async () => {
    const { getByText } = render(
      <VideosContext.Provider value={mockContext}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </VideosContext.Provider>
    );

    await act(async () => {
      await mockContext.fetchVideos();
      await mockContext.fetchCategories();
    });

    await waitFor(() => {
      // Verifica os vídeos
      expect(getByText('Test Video 1')).toBeTruthy();
      expect(getByText('Test description')).toBeTruthy();

      // Verifica as categorias
      expect(getByText('Over The Cast')).toBeTruthy();
      expect(getByText('Flow Experience 2021')).toBeTruthy();
      expect(getByText('Netshow.me Talks')).toBeTruthy();
    });
  });
});
