import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import HomeSkeleton from './components/HomeSkeleton';
import * as Animatable from 'react-native-animatable';
import { VideosContext } from '~/context/VideosContext';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const context = useContext(VideosContext);

  if (!context) {
    throw new Error('VideosContext must be used within a VideosProvider');
  }

  const { videos, fetchVideos } = context;
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();


  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const loadVideos = async () => {
      try {
        console.log('Chamando fetchVideos na HomeScreen');
        await fetchVideos(page, ITEMS_PER_PAGE);
        setHasMore(videos.length % ITEMS_PER_PAGE === 0);
      } catch (error) {
        console.error('Erro ao carregar vídeos:', error);
        Alert.alert('Erro', 'Erro ao buscar vídeos');
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [page]);

  const loadMoreVideos = () => {
    if (!hasMore) return;
    setPage((prevPage) => prevPage + 1);
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

  if (loading && page === 1) {
    return (
      <View style={styles.container}>
        <HomeSkeleton />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreVideos}
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
    padding: 8,
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
