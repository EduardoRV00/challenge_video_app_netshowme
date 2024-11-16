import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import VideoCard from '../../../screens/components/VideoCard';

const mockVideo = {
  id: '1',
  title: 'Video Test',
  thumbnail: 'https://example.com/thumbnail.jpg',
  likes: 10,
  views: 20,
};

describe('VideoCard', () => {
  it('deve renderizar o título e a thumbnail corretamente', () => {
    const { getByText, getByTestId } = render(<VideoCard video={mockVideo} onPress={() => { }} />);

    expect(getByText('Video Test')).toBeTruthy();
    expect(getByTestId('video-card')).toBeTruthy();
  });

  it('deve chamar onPress ao clicar no card', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(<VideoCard video={mockVideo} onPress={mockOnPress} />);

    fireEvent.press(getByTestId('video-card'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
