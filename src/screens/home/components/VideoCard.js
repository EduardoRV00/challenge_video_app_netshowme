import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const VideoCard = ({ video, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card} testID="video-card">
            <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{video.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    thumbnail: {
        width: '100%',
        height: 200,
    },
    textContainer: {
        padding: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default VideoCard;
