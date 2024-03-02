import styles from '../css/TurnosScreen';

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Card } from 'react-native-paper';


const TurnosScreen = () => {
    const [misTurnos, setMisTurnos] = useState([]);
    const [expandedFecha, setExpandedFecha] = useState(null);
  
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
    }, []);
  
    // Función para expandir/cerrar una fecha
    const toggleExpand = (fecha) => {
      setExpandedFecha(expandedFecha === fecha ? null : fecha);
    };
  
    // Función para renderizar los turnos de una fecha
    const renderTurnosPorFecha = (fecha) => {
      const turnosFecha = misTurnos.filter(turno => turno.fecha === fecha);
      const turnosOrdenados = turnosFecha.sort((a, b) => a.hora.localeCompare(b.hora));
  
      return turnosOrdenados.map(turno => (
        <View key={turno.id}>
          <Text>{turno.hora.slice(0, 5)} - {turno.nombre} - {turno.telefono}</Text>
          {/* Aquí puedes personalizar cómo se muestra cada turno */}
        </View>
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
  
