import { Video } from '../types';

const API_BASE_URL = "http://192.168.1.6:3000";

export const api = {
    // Busca vídeos com suporte à paginação
    fetchVideos: async (page = 1, limit = 10, query = '', category = ''): Promise<Video[]> => {
        const url = `${API_BASE_URL}/videos?_page=${page}&_limit=${limit}&q=${query}&category_like=${category}`;
        try {
            console.log(`[API] Buscando vídeos na URL: ${url}`);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`[API] Erro HTTP (${response.status}): ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`[API] Vídeos recebidos:`, data);
            return data;
        } catch (error) {
            console.error(`[API] Erro ao buscar vídeos:`, error);
            throw new Error('Erro ao buscar vídeos. Por favor, tente novamente.');
        }
    },


    // Busca um vídeo específico pelo ID
    fetchVideoById: async (id: string): Promise<Video> => {
        const url = `${API_BASE_URL}/videos/${id}`;
        try {
            console.log(`[API] Buscando vídeo com ID ${id} na URL: ${url}`);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`[API] Erro HTTP (${response.status}): ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`[API] Dados recebidos para o vídeo ${id}:`, data);
            return data;
        } catch (error) {
            console.error(`[API] Erro ao buscar vídeo com ID ${id}:`, error);
            throw new Error('Erro ao buscar o vídeo. Por favor, tente novamente.');
        }
    },

    // Atualiza dados de um vídeo específico usando PATCH
    patch: async (url: string, data: any): Promise<Video> => {
        const fullUrl = `${API_BASE_URL}${url}`;
        try {
            console.log(`[API] Atualizando dados na URL: ${fullUrl}`, data);
            const response = await fetch(fullUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`[API] Erro HTTP (${response.status}): ${response.statusText}`);
            }

            const responseData = await response.json();
            console.log(`[API] Dados atualizados com sucesso:`, responseData);
            return responseData;
        } catch (error) {
            console.error(`[API] Erro ao atualizar dados na URL ${url}:`, error);
            throw new Error('Erro ao atualizar dados. Por favor, tente novamente.');
        }
    },
    /**
  * Busca categorias da API.
  * @returns {Promise<Array<{ id: string; title: string }>>} Lista de categorias.
  */
    fetchCategories: async (): Promise<Array<{ id: string; title: string }>> => {
        const API_BASE_URL = 'http://192.168.1.6:3000';
        const url = `${API_BASE_URL}/categories`;

        try {
            console.log(`[API] Buscando categorias na URL: ${url}`);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`[API] Erro ao buscar categorias: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('[API] Categorias recebidas:', data);
            return data;
        } catch (error) {
            console.error('[API] Erro ao buscar categorias:', error);
            throw new Error('Erro ao buscar categorias. Tente novamente.');
        }
    },

};
