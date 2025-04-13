import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

// Imports necessários para a página de detalhes

export default function TelaDescricao({ route }) {
  const { url } = route.params;
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  //Aqui carrega os dados quando tudo é montado
  useEffect(() => {
    buscarPokemon();
  }, []);

  const buscarPokemon = async () => {
    //Essa é uma funcao para buscar os pokemons direto da API
    try {
      const response = await axios.get(url);
      setPokemon(response.data);
    } catch (erro) {
      //Código para caso de erro ao buscar os pokemons
      console.error('Erro ao buscar detalhes do Pokémon:', erro);
    } finally {
      setLoading(false);
    }
  };

  //Mostra um indicador de carregamento enquanto busca os dados
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E3350D" />
      </View>
    );
  }
//Se nao houver nenhum dados, exibe uma mensagem de erro
  if (!pokemon) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Não foi possível carregar os dados.</Text>
      </View>
    );
  }

  //Aqui contem os dados do pokemon escolhido
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Exibe o nome do Pokémon */}
      <Text style={styles.name}>{pokemon.name}</Text>

      {/* Exibe a foto do Pokémon */}
      <Image
        source={{ uri: pokemon.sprites.front_default }}
        style={styles.image}
        accessibilityLabel={`Imagem do Pokémon ${pokemon.name}`}
      />

      {/* Exibe a altura do Pokémon dividida por 10 */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Altura:</Text>
        <Text style={styles.text}>{pokemon.height / 10} m</Text>
      </View>

      {/* Exibe o peso do Pokémon divido por 10  */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Peso:</Text>
        <Text style={styles.text}>{pokemon.weight / 10} kg</Text>
      </View>

      {/* Exibe a tipagem do pokemon */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Tipo(s):</Text>
        <Text style={styles.text}>
          {pokemon.types.map((tipo) => tipo.type.name).join(', ')}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#FFFFFF', 
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#FFFFFF', 
    },
    name: {
      fontSize: 28,
      fontWeight: 'bold',
      textTransform: 'capitalize',
      color: '#333333', 
      marginBottom: 16,
    },
    image: {
      width: 180,
      height: 180,
      marginBottom: 24,
    },
    infoBox: {
      backgroundColor: '#F2F2F2', 
      padding: 12,
      borderRadius: 10,
      marginBottom: 12,
      width: '100%',
      alignItems: 'center',
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#555555', 
    },
    text: {
      fontSize: 16,
      color: '#333333', 
    },
    errorText: {
      fontSize: 16,
      color: '#B00020', 
      fontWeight: 'bold',
    },
  });