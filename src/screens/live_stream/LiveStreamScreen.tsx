import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LiveStreamScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            {/* Placeholder da tela de live */}
            <Text style={styles.liveText}>🎥 Transmissão ao Vivo em Andamento 🎥</Text>
            <Text style={styles.placeholderText}>
                Este é um exemplo de como a transmissão ao vivo seria exibida.
            </Text>
            {/* Botão para encerrar live */}
            <TouchableOpacity
                style={styles.endButton}
                onPress={() => alert('Transmissão Encerrada!')}
            >
                <Text style={styles.buttonText}>Encerrar Transmissão</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    liveText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    placeholderText: {
        fontSize: 13,
        color: '#ccc',
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 40,
    },
    endButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: '#ff0000',
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default LiveStreamScreen;
