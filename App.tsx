import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SeleccionTurnosScreen from './src/screens/SeleccionTurnosScreen';
import { Title } from 'react-native-paper';
import styles from './src/css/App';
import MisTurnosScreen from './src/screens/MisTurnosScreen';


export default function App() {
  const [selectedTab, setSelectedTab] = useState('SeleccionarTurno');

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Title style={styles.title}>Institución</Title>
      </View>
      <View style={styles.content}>
        {selectedTab === 'SeleccionarTurno' && <SeleccionTurnosScreen />}
        {selectedTab === 'SegundaPestaña' && <MisTurnosScreen />}
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


