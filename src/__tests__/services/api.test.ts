import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import HomeScreen from '../../screens/home/HomeScreen'; // Substitua pelo caminho correto
import { VideosProvider } from '../../context/VideosContext'; // Contexto necessário
import { api } from '../../services/api';
import fetchMock from 'jest-fetch-mock';

// Habilita o mock do fetch
beforeAll(() => {
    fetchMock.enableMocks();
});

describe('API', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('deve buscar vídeos com sucesso', async () => {
        const mockResponse = [
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

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

        const result = await api.fetchVideos(1, 10, '', '');

        expect(fetchMock).toHaveBeenCalledWith(
            'http://192.168.1.6:3000/videos?_page=1&_limit=10&q=&category_like='
        );
        expect(result).toEqual(mockResponse);
    });

    it('deve buscar categorias com sucesso', async () => {
        const mockResponse = [
            { id: '1', title: 'Over The Cast' },
            { id: '2', title: 'Flow Experience 2021' },
            { id: '3', title: 'Netshow.me Talks' },
        ];

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

        const result = await api.fetchCategories();

        expect(fetchMock).toHaveBeenCalledWith('http://192.168.1.6:3000/categories');
        expect(result).toEqual(mockResponse);
    });

    it('deve lançar erro ao falhar ao buscar categorias', async () => {
        fetchMock.mockRejectOnce(new Error('Erro na API'));

        await expect(api.fetchCategories()).rejects.toThrow('Erro ao buscar categorias. Tente novamente.');
    });
});


