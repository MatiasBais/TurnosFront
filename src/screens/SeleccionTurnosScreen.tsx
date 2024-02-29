import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TextInput, Modal } from 'react-native';
import { Card } from 'react-native-paper'; 
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';

const generarTurnosDisponibles = (fechaSeleccionada, turnosTomados, horaI, horaF) => {
  const duracionTurno = 30;
  const nuevosTurnos = [];
  const fechaActual = moment();
  const fechaString = moment(fechaSeleccionada).format('YYYY-MM-DD');

  if (fechaActual.isSame(fechaSeleccionada, 'day')) {
    let horaInicio = fechaActual.hour() + 1;
    let minutoInicio = fechaActual.minute();

    // Si faltan menos de 59 minutos para la próxima hora en punto, comenzar desde la próxima hora en punto
    if (minutoInicio > 0 && minutoInicio < 59) {
      horaInicio++;
      minutoInicio = 0;
    }
    if(horaInicio<horaI){
      horaInicio=horaI
    }

    for (let i = horaInicio; i < horaF; i++) {
      for (let j = minutoInicio; j < 60; j += duracionTurno) {
        const hora = `${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`;
        if (!turnosTomados.find((turno) => turno.hora === hora && turno.fecha === fechaString)) {
          nuevosTurnos.push({ hora });
        }
      }
      // Reiniciar los minutos después de la primera hora completa
      minutoInicio = 0;
    }
  } else {
    // Si la fecha seleccionada no es hoy, generar turnos normales
    for (let i = horaI; i < horaF; i++) {
      for (let j = 0; j < 60; j += duracionTurno) {
        const hora = `${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`;
        if (!turnosTomados.find((turno) => turno.hora === hora && turno.fecha === fechaString)) {
          nuevosTurnos.push({ hora });
        }
      }
    }
  }

  return nuevosTurnos;
};

const SeleccionTurnosScreen = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(moment().format('YYYY-MM-DD'));
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  const [dias, setDias] = useState(); // Mostrar los próximos 14 días
  const [turnosDisponibles, setTurnosDisponibles] = useState([]);
  const diasAFuturo = 14;
  const horaI = 9;
  const horaF = 18;
  const [modalVisible, setModalVisible] = useState(false);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  const [turnosTomados, setTurnosTomados] = useState([]);

  

  useEffect(() => {
    fetch('http://localhost/turnosback/getTurnos.php')
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const turnosModificados = data.map(turno => ({
            ...turno,
            hora: turno.hora.slice(0, 5) // Obtener solo los primeros 5 caracteres de la hora (HH:MM)
          }));
          // Establecer los turnos modificados en el estado
          setTurnosTomados(turnosModificados);
        } else {
          // Si no hay datos, establecer un estado inicial vacío
          setTurnosTomados([]);
          console.log('No se encontraron turnos en la base de datos.');
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
      });
  }, []); // El segundo parámetro [] indica que este efecto se ejecutará solo una vez, al cargar el componente
  

  useEffect(() => {
    const nuevosTurnos = generarTurnosDisponibles(fechaSeleccionada, turnosTomados, horaI, horaF);
    setTurnosDisponibles(nuevosTurnos);
  }, [fechaSeleccionada]);

  useEffect(() => {
    const nuevosTurnos = generarTurnosDisponibles(fechaSeleccionada, turnosTomados, horaI, horaF);
    setTurnosDisponibles(nuevosTurnos);
  }, [turnosTomados]);


  // Resto del código del componente...
  const handleDiasChange = (dias) => {
    setDias(dias);
    setHoraSeleccionada(null);
    setFechaSeleccionada(moment().add(dias, 'days').format('YYYY-MM-DD'));
  };

  const handleSeleccionTurno = (hora) => {
    setHoraSeleccionada(hora);
  };

  const handleReservar = () => {
    // Mostrar el modal al reservar
    if (fechaSeleccionada && horaSeleccionada) {
      setModalVisible(true);
    }
  };

  const handleConfirmarReserva = () => {
    // Crear objeto con los datos a enviar
    const url = `http://localhost/TurnosBack/createTurno.php?nombre=${nombre}&telefono=${telefono}&fecha=${fechaSeleccionada}&hora=${horaSeleccionada}`;
  
    // Hacer la solicitud a la API
    fetch(url)
      .then(response => response.json()) // Convertir la respuesta a JSON
      .then(data => {
        // Manejar la respuesta de la API
        console.log('Respuesta de la API:', data);
        // Cerrar el modal después de enviar la solicitud
        setModalVisible(false);
        // Agregar el turno creado a la lista de turnos tomados si es necesario
        data.hora = data.hora.slice(0, 5); // Obtener solo los primeros 5 caracteres de la hora (HH:MM)
        // Establecer los turnos modificados en el estado
        turnosTomados.push(data)
        const nuevosTurnos = generarTurnosDisponibles(fechaSeleccionada, turnosTomados, horaI, horaF);
    setTurnosDisponibles(nuevosTurnos);
      })
      .catch(error => {
        // Error de red u otro error
        console.error('Error:', error);
      });
  };
  
  

  // Generar opciones del picker para los próximos 'diasAFuturo' días
  const diasOptions = Array.from({ length: diasAFuturo + 1 }, (_, i) => {
    const fecha = moment().add(i, 'days').format('YYYY-MM-DD');
    return <Picker.Item key={fecha} label={fecha} value={i} />;
  });

  const renderTurno = ({ item }) => {
    const isSelected = horaSeleccionada === item.hora;
    return (
      <Card
        onPress={() => handleSeleccionTurno(item.hora)}
        style={[styles.turnoCard, isSelected && styles.selectedTurno]}
      >
        <Card.Content>
          <Text style={styles.turnoHora}>{item.hora}</Text>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Selecciona un turno disponible:</Text>
      <Picker
        selectedValue={dias}
        onValueChange={handleDiasChange}
      >
        {diasOptions}
      </Picker>
      <FlatList
        data={turnosDisponibles}
        renderItem={renderTurno}
        keyExtractor={(item) => item.hora}
        contentContainerStyle={styles.listaTurnos}
        numColumns={3} 
      />
      <Button title="Reservar" onPress={handleReservar} disabled={!horaSeleccionada} />

      <Modal
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
  animationType="slide"
  transparent={true}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Reservar Turno para:</Text>
      <Text style={styles.dateTime}>{fechaSeleccionada} {horaSeleccionada}</Text>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      
      <Text style={styles.label}>Número de teléfono:</Text>
      <TextInput
        placeholder="Número de teléfono"
        value={telefono}
        onChangeText={setTelefono}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="Confirmar reserva" onPress={handleConfirmarReserva} />
        <Button title="Cancelar" onPress={() => setModalVisible(false)} />
      </View>
    </View>
  </View>
</Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listaTurnos: {
    flexGrow: 1,
    marginTop: 20,
  },
  turnoCard: {
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 10,
    flexBasis: '30%', 
    marginHorizontal: '1.5%', 
  },
  turnoHora: {
    fontSize: 12,
    textAlign: 'center', 
  },
  selectedTurno: {
    backgroundColor: '#ffbfaf', // Puedes cambiar el color a tu preferencia
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateTime: {
    fontSize: 16,
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Aquí se define la opacidad (0.5 para el 50% de opacidad)
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '90%', // Modifica este valor para cambiar el ancho del modal
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%', // Aquí se define el ancho del input
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
});

export default SeleccionTurnosScreen;
