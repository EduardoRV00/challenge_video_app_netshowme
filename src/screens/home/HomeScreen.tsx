import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import HomeSkeleton from './components/HomeSkeleton';
import * as Animatable from 'react-native-animatable';
import { VideosContext } from '~/context/VideosContext';
import { api } from '~/services/api';
import { Ionicons } from '@expo/vector-icons'; // Importa ícones

// Define o tipo de navegação para esta tela
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const context = useContext(VideosContext);

  if (!context) {
    throw new Error('VideosContext must be used within a VideosProvider');
  }

  const { videos, fetchVideos } = context;

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('0');
  const [categories, setCategories] = useState<{ id: string; title: string }[]>([]);

  const ITEMS_PER_PAGE = 10;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const fetchCategories = async () => {
    try {
      const data = await api.fetchCategories();
      setCategories([{ id: '0', title: 'All' }, ...data]);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      Alert.alert('Erro', 'Erro ao buscar categorias');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        console.log('Chamando fetchVideos na HomeScreen');
        await fetchVideos(page, ITEMS_PER_PAGE, '', selectedCategory === '0' ? '' : selectedCategory);
        setHasMore(videos.length % ITEMS_PER_PAGE === 0);
      } catch (error) {
        console.error('Erro ao carregar vídeos:', error);
        Alert.alert('Erro', 'Erro ao buscar vídeos');
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [page, selectedCategory]);

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setPage(1);
  };

  const renderFooter = () => {
    if (!hasMore) return null;
    return (
      <View style={styles.footerLoader}>
        <HomeSkeleton />
      </View>
    );
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <Animatable.View
      animation="fadeInUp"
      delay={index * 100}
      style={styles.itemContainer}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('VideoDetail', { videoId: item.id, title: item.title })
        }
      >
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      {/* Botão WATCH LIVE */}
      <TouchableOpacity
        style={styles.watchLiveButton}
        onPress={() => navigation.navigate('LiveStream')}
      >
        <Ionicons name="videocam" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.watchLiveButtonText}>WATCH LIVE</Text>
      </TouchableOpacity>

      {/* Categorias em forma de tags */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContentContainer}
        style={styles.categoryContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.categoryButtonSelected,
            ]}
            onPress={() => handleCategoryPress(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextSelected,
              ]}
            >
              {category.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista de vídeos */}
      <FlatList
        data={videos}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onEndReached={() => setPage((prevPage) => prevPage + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  watchLiveButton: {
    flexDirection: 'row', // Ícone e texto lado a lado
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0000',
    paddingVertical: 10, // Aumenta o padding vertical para mais espaço
    paddingHorizontal: 18, // Ajusta o padding horizontal para acomodar ícone e texto
    borderRadius: 24,
    marginBottom: 20, // Espaço entre o botão e as categorias
  },
  watchLiveButtonText: {
    color: '#fff',
    fontSize: 17, // Aumenta o tamanho da fonte do texto
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 8, // Espaço entre o ícone e o texto
  },
  liveButton: {
    flexDirection: 'row', // Alinha o ícone e o texto horizontalmente
    alignItems: 'center', // Centraliza verticalmente
    justifyContent: 'center', // Centraliza horizontalmente
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'red',
    marginBottom: 16, // Garante espaçamento entre o botão e as categorias
  },
  liveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8, // Espaço entre o ícone e o texto
  },

  categoryContainer: {
    marginBottom: 16,
    paddingBottom: 12,
    paddingTop: 12,
  },
  categoryContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryButton: {
    paddingVertical: 18, // Aumenta o espaço vertical
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#F1A1B5FF', // Cor para tags não selecionadas
    marginRight: 10,
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    minHeight: 50, // Define altura mínima para evitar cortes
  },
  categoryButtonSelected: {
    backgroundColor: '#EE3965', // Cor para tags selecionadas
  },
  categoryText: {
    color: '#FFFFFF', // Cor branca para texto em todas as tags
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center', // Centraliza horizontalmente
    textAlignVertical: 'center', // Centraliza verticalmente
  },
  categoryTextSelected: {
    color: '#FFFFFF', // Cor branca para texto em tags selecionadas
    fontWeight: 'bold',
  },

  listContent: {
    paddingBottom: 16,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  footerLoader: {
    paddingVertical: 16,
  },
});

export default HomeScreen;
