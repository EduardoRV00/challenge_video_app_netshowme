import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import Video from 'expo-av/build/Video';
import { useVideosContext } from '~/context/VideosContext';
import VideoDetailSkeleton from './components/DetailSkeleton';

import { Video as VideoType } from '~/types';
import { ResizeMode } from 'expo-av/build/Video.types';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '~/navigation/AppNavigator';

type VideoDetailRouteProp = RouteProp<RootStackParamList, 'VideoDetail'>;

interface Props {
  route: VideoDetailRouteProp;
}

const VideoDetailScreen: React.FC<Props> = ({ route }) => {
  const { videoId } = route.params;
  const { fetchVideoById, incrementLikes, incrementViews } = useVideosContext();
  const [video, setVideo] = useState<VideoType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewIncremented, setViewIncremented] = useState<boolean>(false);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const videoData = await fetchVideoById(videoId);
        if (videoData) {
          setVideo(videoData);

          if (!viewIncremented) {
            await incrementViews(videoId);
            setViewIncremented(true);
          }
        }
      } catch (error) {
        Alert.alert('Erro', 'Erro ao carregar o vídeo');
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [videoId, fetchVideoById, incrementViews, viewIncremented]);

  const handleLike = async () => {
    try {
      await incrementLikes(videoId);
      setVideo((prevVideo) =>
        prevVideo
          ? {
            ...prevVideo,
            likes: prevVideo.likes + 1,
          }
          : null
      );
    } catch (error) {
      Alert.alert('Erro', 'Erro ao curtir o vídeo');
    }
  };

  if (loading) {
    return <VideoDetailSkeleton />;
  }

  if (!video) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>O vídeo não foi encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{video.title}</Text>
        <Video
          source={{ uri: video.hls_path }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          isLooping
          style={styles.video}
          useNativeControls
        />
        <Text style={styles.description}>{video.description}</Text>
        <Text style={styles.stats}>Visualizações: {video.views}</Text>
        <Text style={styles.stats}>Curtidas: {video.likes}</Text>
        <TouchableOpacity style={styles.outlineButton} onPress={handleLike}>
          <Text style={styles.outlineButtonText}>Curtir</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  container: {
    flex: 1,
    paddingBottom: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  video: {
    width: '100%',
    height: 200,
    backgroundColor: 'black',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  stats: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  outlineButtonText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VideoDetailScreen;
