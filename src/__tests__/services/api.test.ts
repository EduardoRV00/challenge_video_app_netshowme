import { api } from '~/services/api';
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

        const result = await api.fetchVideos(1, 10);

        expect(fetchMock).toHaveBeenCalledWith('http://192.168.1.6:3000/videos?_page=1&_limit=10');
        expect(result).toEqual(mockResponse);
    });

    it('deve buscar um vídeo por ID com sucesso', async () => {
        const mockResponse = {
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
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

        const result = await api.fetchVideoById('1');

        expect(fetchMock).toHaveBeenCalledWith('http://192.168.1.6:3000/videos/1');
        expect(result).toEqual(mockResponse);
    });

    it('deve atualizar um vídeo usando patch', async () => {
        const mockResponse = {
            id: '1',
            title: 'Test Video 1',
            thumbnail: 'https://example.com/thumbnail1.jpg',
            likes: 11,
            views: 20,
            created_at: '2023-01-01T00:00:00.000Z',
            category: 1,
            hls_path: 'https://example.com/video1.m3u8',
            description: 'Test description 1',
            site_id: 123,
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

        const result = await api.patch('/videos/1', { likes: 11 });

        expect(fetchMock).toHaveBeenCalledWith('http://192.168.1.6:3000/videos/1', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ likes: 11 }),
        });
        expect(result).toEqual(mockResponse);
    });
});
