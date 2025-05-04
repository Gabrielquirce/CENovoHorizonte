import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { shareAsync } from 'expo-sharing';
import { Alert, Platform } from 'react-native';

export const downloadTerms = async () => {
  try {
    // Verificar permissões (Android)
    if (Platform.OS === 'android') {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Permita o acesso ao armazenamento para baixar os termos.');
        return;
      }
    }

    // Carregar PDF
    const asset = Asset.fromModule(require('../assets/docs/termos.pdf'));
    await asset.downloadAsync();

    // Caminho de destino
    const newUri = FileSystem.documentDirectory + 'termos.pdf';
    
    // Copiar arquivo
    await FileSystem.copyAsync({
      from: asset.localUri!,
      to: newUri
    });

    // Compartilhar
    await shareAsync(newUri, {
      mimeType: 'application/pdf',
      dialogTitle: 'Termos de Uso',
      UTI: 'com.adobe.pdf'
    });

  } catch (error) {
    console.error('Erro detalhado:', error);
    Alert.alert('Erro', 'Não foi possível baixar os termos. Verifique:'
      + '\n1. Se o arquivo existe (assets/docs/termos.pdf)'
      + '\n2. Permissões de armazenamento'
      + '\n3. Conexão com a internet');
  }
};