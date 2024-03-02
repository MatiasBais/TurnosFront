import styles from '../css/TurnosScreen';

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert,ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';


const TurnosScreen = () => {
    const [misTurnos, setMisTurnos] = useState([]);
    const [expandedFecha, setExpandedFecha] = useState(null);
    const [loading, setLoading] = useState(true);

  
    useEffect(() => {
      const cargarTurnosGuardados = async () => {
        try {
          const response = await fetch('https://faq-utn.heliohost.us/getTurnos.php');
          const data = await response.json();
          
          // Establecer los turnos en el estado del componente
          if(data)
            setMisTurnos(data);
        else
            setMisTurnos([])
        } catch (error) {
          console.error('Error al cargar los turnos guardados:', error);
        }
      };
  
      // Llamar a la función para cargar los turnos guardados al cargar la pantalla
      
      cargarTurnosGuardados();
      setLoading(false)
    }, []);
  
    // Función para expandir/cerrar una fecha
    const toggleExpand = (fecha) => {
      setExpandedFecha(expandedFecha === fecha ? null : fecha);
    };

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
  
    // Función para renderizar los turnos de una fecha
    const renderTurnosPorFecha = (fecha) => {
      const turnosFecha = misTurnos.filter(turno => turno.fecha === fecha);
      const turnosOrdenados = turnosFecha.sort((a, b) => a.hora.localeCompare(b.hora));
  
      return turnosOrdenados.map(turno => (
        <Card style={styles.card}>
            <Card.Content style={styles.turnoContent}>
                <View style={styles.textContainer}>
                    <Text style={styles.turnoText}> {turno.hora}</Text>
                    <Text style={styles.turnoText}> {turno.nombre}</Text>
                    <Text style={styles.turnoText}> {turno.telefono}</Text>
                </View>
                <TouchableOpacity onPress={() => handleEliminarTurno(turno)} style={styles.button}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </Card.Content>
        </Card>
      ));
    };
  
    // Función para renderizar cada tarjeta de fecha
    const renderFecha = ({ item }) => (
      <TouchableOpacity onPress={() => toggleExpand(item.fecha)}>
        <Card style={styles.card}>
          <Card.Content style={styles.content}>
            <Text style={styles.fecha}>{item.fecha}</Text>
            {expandedFecha === item.fecha && (
              <View style={styles.turnosContainer}>
                {renderTurnosPorFecha(item.fecha)}
              </View>
            )}
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );

    if (loading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      }
  
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Mis Turnos</Text>
          
          {misTurnos.length > 0 ? (
            <FlatList
              data={misTurnos.reduce((acc, turno) => {
                if (!acc.find(item => item.fecha === turno.fecha)) {
                  acc.push({ fecha: turno.fecha });
                }
                return acc;
              }, [])}
              renderItem={renderFecha}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.flatList}
            />
          ) : (
            <Text>No hay turnos disponibles</Text>
          )}
        </View>
      );
          }
  
export default TurnosScreen;
  
