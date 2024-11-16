const { getDefaultConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
    ...defaultConfig,
    resolver: {
        ...defaultConfig.resolver,
        sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'], // Adiciona suporte a arquivos SVG
    },
};
