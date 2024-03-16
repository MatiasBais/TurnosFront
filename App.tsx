import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import SeleccionTurnosScreen from './src/screens/SeleccionTurnosScreen';
import { Title } from 'react-native-paper';
import styles from './src/css/App';
import MisTurnosScreen from './src/screens/MisTurnosScreen';
import TurnosScreen from './src/screens/TurnosScreen';
import DiasNoLaborablesScreen from './src/screens/DiasNoLaborables';
import EditarParametrosScreen from './src/screens/EditarParametros';

export default function App() {
  const [selectedTab, setSelectedTab] = useState('SeleccionarTurno');

  return (
    <View style={{flex:1}}>
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Title style={styles.title}>Reserva de Turnos</Title>
      </View>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('./src/img/logo.jpg')} // Ruta de tu imagen de logo
        />
      </View>
      </View>
      <View style={styles.content}>
        {selectedTab === 'SeleccionarTurno' && <SeleccionTurnosScreen />}
        {selectedTab === 'MisTurnos' && <MisTurnosScreen />}
        {selectedTab === 'Turnos' && <TurnosScreen />}
        {selectedTab === 'DiasNoLaborables' && <DiasNoLaborablesScreen />}
        {selectedTab === 'Configuración' && <EditarParametrosScreen />}
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tabItem, selectedTab === 'SeleccionarTurno' && styles.selectedTabItem]}
          onPress={() => setSelectedTab('SeleccionarTurno')}
        >
          <Text>Reservar Turno</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, selectedTab === 'MisTurnos' && styles.selectedTabItem]}
          onPress={() => setSelectedTab('MisTurnos')}
        >
          <Text>Mis Turnos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, selectedTab === 'Turnos' && styles.selectedTabItem]}
          onPress={() => setSelectedTab('Turnos')}
        >
          <Text>Turnos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, selectedTab === 'DiasNoLaborables' && styles.selectedTabItem]}
          onPress={() => setSelectedTab('DiasNoLaborables')}
        >
          <Text>Dias no laborables</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, selectedTab === 'Configuración' && styles.selectedTabItem]}
          onPress={() => setSelectedTab('Configuración')}
        >
          <Text>Configuración</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


