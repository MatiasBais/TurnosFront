import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import { Card, FAB, Button } from 'react-native-paper';
import styles from '../css/DiasNoLaborables';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DiasNoLaborablesScreen = () => {
  const [diasNoLaborables, setDiasNoLaborables] = useState([]);
  const [modalAgregarVisible, setModalAgregarVisible] = useState(false);
  const [actualizar, setActualizar] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://faq-utn.heliohost.us/getDiasNoLaborables.php');
        const data = await response.json();
        setDiasNoLaborables(data);
      } catch (error) {
        console.error('Error al obtener los días no laborables:', error);
      }
    };

    fetchData();
  }, [actualizar]);

  const handleAgregarDiaNoLaborable = () => {
    setModalAgregarVisible(true);
  };

  const handleEliminarDiaNoLaborable = (id) => {
    Alert.alert(
        'Confirmar eliminar',
        '¿Estás seguro de que deseas eliminar este día no laborable?',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Sí, eliminar',
            onPress: () => handleEliminar(id),
          },
        ],
        { cancelable: false }
      );
  };

  const handleAgregar = (fecha) => {
    const fetchData = async () => {
        try {
          const fechaEspecifica = new Date(fecha); // El mes se indexa desde 0, por lo que 4 representa mayo

          // Obtener el desplazamiento de zona horaria en minutos
          const offsetMinutes = fechaEspecifica.getTimezoneOffset();

          // Restar el desplazamiento de zona horaria para obtener la fecha en UTC
          fechaEspecifica.setMinutes(fechaEspecifica.getMinutes() - offsetMinutes);

          // Convertir la fecha a una cadena ISO sin desplazamiento de zona horaria
          const fechaISO = fechaEspecifica.toISOString();

          const response = await fetch('https://faq-utn.heliohost.us/addFecha.php?fecha='+fechaISO.split('T')[0]);
          console.log('https://faq-utn.heliohost.us/addFecha.php?fecha='+fechaISO.split('T')[0])
          const data = await response.json();
          setActualizar(fecha)
        } catch (error) {
          console.error('Error al obtener los días no laborables:', error);
        }
      };
  
      fetchData();
};
  
  const handleEliminar = (id) => {
    const fetchData = async () => {
        try {
          const response = await fetch('https://faq-utn.heliohost.us/deleteFecha.php?id='+id);
          const data = await response.json();
          setActualizar(id)
        } catch (error) {
          console.error('Error al obtener los días no laborables:', error);
        }
      };
  
      fetchData();
  };

  const renderDiaNoLaborable = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Fecha: {item.fecha}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => handleEliminarDiaNoLaborable(item.id)}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Días No Laborables</Text>
      <FlatList
        data={diasNoLaborables}
        renderItem={renderDiaNoLaborable}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatList}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleAgregarDiaNoLaborable}
      />

      {/* Modal para agregar día no laborable */}
      <Modal
        visible={modalAgregarVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalAgregarVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <DateTimePickerModal
              isVisible={modalAgregarVisible}
              mode="date"
              onConfirm={(date) => {
                handleAgregar(date);
                setModalAgregarVisible(false);
              }}
              onCancel={() => setModalAgregarVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DiasNoLaborablesScreen;
