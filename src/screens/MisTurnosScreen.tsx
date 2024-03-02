import styles from '../css/MisTurnosScreen';

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MisTurnosScreen = () => {
  const [misTurnos, setMisTurnos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarTurnosGuardados = async () => {
      try {
        // Obtener los turnos guardados de AsyncStorage
        const turnosGuardados = await AsyncStorage.getItem('misTurnos');
        if (turnosGuardados) {
          // Convertir los turnos guardados de cadena JSON a un objeto JavaScript
          const turnos = JSON.parse(turnosGuardados);
          // Establecer los turnos en el estado del componente
          setMisTurnos(turnos);

          const response = await fetch('https://faq-utn.heliohost.us/getTurnos.php');
        const data = await response.json();
        
        // Comparar los nuevos turnos con los guardados y eliminar los turnos guardados que no están en la respuesta de la API
        if(data.length>0){
          const nuevosTurnos = data;
          const turnosActualizados = turnos.filter(turno => nuevosTurnos.some(nuevoTurno => nuevoTurno.id === turno.id));
          
          // Establecer los turnos actualizados en el estado del componente
          setMisTurnos(turnosActualizados);
          await AsyncStorage.setItem('misTurnos', JSON.stringify(turnosActualizados));
        }
        else{
          const turnosActualizados = [];
          
          // Establecer los turnos actualizados en el estado del componente
          setMisTurnos(turnosActualizados);
          await AsyncStorage.setItem('misTurnos', JSON.stringify(turnosActualizados));
        }

        // Guardar los turnos actualizados en AsyncStorage
       setLoading(false);


        }
      } catch (error) {
        console.error('Error al cargar los turnos guardados:', error);
      }
    };

    // Llamar a la función para cargar los turnos guardados al cargar la pantalla
    cargarTurnosGuardados();
  }, []);

  const handleEliminarTurno = (turno) => {
    Alert.alert(
      'Confirmar cancelar',
      '¿Estás seguro de que deseas cancelar este turno?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Sí, cancelar turno',
          onPress: () => eliminarTurno(turno),
        },
      ],
      { cancelable: false }
    );
  };

  const eliminarTurno = async (turno) => {
    // Implementa lógica para eliminar el turno
    try {
      // Eliminar el turno del almacenamiento interno
      const nuevosTurnos = misTurnos.filter(item => item.id !== turno.id);
      setMisTurnos(nuevosTurnos);
      await AsyncStorage.setItem('misTurnos', JSON.stringify(nuevosTurnos));
      
      // URL del endpoint para eliminar el turno de la API
      const url = `https://faq-utn.heliohost.us/deleteTurno.php?id=${turno.id}`;
  
      // Configurar opciones de la solicitud
      const opciones = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      };
  
      // Hacer la solicitud a la API
      const response = await fetch(url, opciones);
      const data = await response.json();
      console.log('Respuesta de la API:', data);
    } catch (error) {
      console.error('Error al eliminar el turno:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } 
  // Función para renderizar cada tarjeta de turno en la lista
  const renderTurno = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Fecha: {item.fecha}</Text>
          <Text style={styles.text}>Hora: {item.hora}</Text>
        </View>
        <TouchableOpacity onPress={() => handleEliminarTurno(item)} style={styles.button}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Turnos</Text>
      {misTurnos.length > 0 ? (
      <FlatList
        data={misTurnos}
        renderItem={renderTurno}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatList}
      />):(
        <Text>No hay turnos disponibles</Text>
      )}
    </View>
  );
};

export default MisTurnosScreen;
