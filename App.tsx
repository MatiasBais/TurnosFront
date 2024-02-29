import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SeleccionTurnosScreen from './src/screens/SeleccionTurnosScreen';
import { Title } from 'react-native-paper';

export default function App() {
  const [selectedTab, setSelectedTab] = useState('SeleccionarTurno');

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Title style={styles.title}>Institución</Title>
      </View>
      <View style={styles.content}>
        {selectedTab === 'SeleccionarTurno' && <SeleccionTurnosScreen />}
        {selectedTab === 'SegundaPestaña' && <View>{/* Contenido de la segunda pestaña */}</View>}
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tabItem, selectedTab === 'SeleccionarTurno' && styles.selectedTabItem]}
          onPress={() => setSelectedTab('SeleccionarTurno')}
        >
          <Text>Reservar Turno</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, selectedTab === 'SegundaPestaña' && styles.selectedTabItem]}
          onPress={() => setSelectedTab('SegundaPestaña')}
        >
          <Text>Mis Turnos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#ffffff',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  selectedTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue', // Color del borde inferior para la pestaña seleccionada
  },
});
