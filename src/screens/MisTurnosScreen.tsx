import styles from '../css/MisTurnosScreen';

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MisTurnosScreen = () => {
  const [misTurnos, setMisTurnos] = useState([]);

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
        }
      } catch (error) {
        console.error('Error al cargar los turnos guardados:', error);
      }
    };

    // Llamar a la función para cargar los turnos guardados al cargar la pantalla
    cargarTurnosGuardados();
  }, []);

  const handleEliminarTurno = async (turno) => {
    // Eliminar el turno del almacenamiento interno
    try {
        // Obtener los turnos guardados del almacenamiento interno
        const storedTurnos = await AsyncStorage.getItem('misTurnos');
        if (storedTurnos !== null) {
          // Si hay turnos guardados, convertirlos de nuevo a un array
          const misTurnos = JSON.parse(storedTurnos);
          // Filtrar el turno a eliminar
          const nuevosTurnos = misTurnos.filter(item => item.id !== turno.id);
          // Guardar los nuevos turnos en el almacenamiento interno
          await AsyncStorage.setItem('misTurnos', JSON.stringify(nuevosTurnos));
          console.log('Turno eliminado del almacenamiento interno.');
          setMisTurnos(nuevosTurnos);
        }
      } catch (error) {
        console.error('Error al eliminar el turno del almacenamiento interno:', error);
      }
  
    // URL del endpoint para eliminar turnos
    const url = `https://faq-utn.heliohost.us/deleteTurno.php?id=${turno.id}`;
  
    // Configurar opciones de la solicitud
    const opciones = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    };
  
    // Hacer la solicitud a la API
    fetch(url, opciones)
      .then(response => response.json()) // Convertir la respuesta a JSON
      .then(data => {
        // Manejar la respuesta de la API
        console.log('Respuesta de la API:', data);
        // Actualizar la lista de turnos tomados eliminando el turno eliminado
       
      })
      .catch(error => {
        // Error de red u otro error
        console.error('Error:', error);
      });
  };
  // Función para renderizar cada tarjeta de turno en la lista
  const renderTurno = ({ item }) => (
    <Card style={styles.card}>
  <Card.Content style={styles.content}>
    <View style={styles.textContainer}>
      <Text style={styles.text}>Fecha: {item.fecha}</Text>
      <Text style={styles.text}>Hora: {item.hora}</Text>
    </View>
    <TouchableOpacity onPress={() => handleEliminarTurno(item)} style={styles.button}>
      <Text style={styles.buttonText}>Eliminar</Text>
    </TouchableOpacity>
  </Card.Content>
</Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Turnos</Text>
      <FlatList
        data={misTurnos}
        renderItem={renderTurno}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
};

export default MisTurnosScreen;
