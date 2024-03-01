import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput, Modal  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper'; 
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import styles from '../css/SeleccionTurnosScreen';

let diasAFuturo = 14;
let duracionTurno = 30;
let horaI1 = 8;
let horaF1 = 12;
let horaI2 = 16;
let horaF2 = 20;
fetch('https://faq-utn.heliohost.us/getParametros.php', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error('Error al obtener los parámetros');
  }
  return response.json();
})
.then(data => {
  // Establecer los valores recibidos en las variables correspondientes
    diasAFuturo = parseInt(data.diasAFuturo);
    duracionTurno= parseInt(data.duracionTurno);
    horaI1 = parseInt(data.horaI1);
    horaF1 = parseInt(data.horaF1);
    horaI2 = parseInt(data.horaI2);
    horaF2 = parseInt(data.horaF2);
  
  console.log('Parámetros obtenidos:', data);

  // Aquí puedes hacer lo que necesites con estos valores
})
.catch(error => {
  console.error('Error:', error);
});

let diasExcluidos = [];
fetch('https://faq-utn.heliohost.us/getDiasNoLaborables.php')
  .then(response => response.json())
  .then(data => {
    // Iterar sobre los datos obtenidos y agregar las fechas al array diasExcluidos
    data.forEach(fecha => {
      diasExcluidos.push(fecha.fecha);
    });
    console.log('Fechas excluidas obtenidas:', diasExcluidos);
  })
  .catch(error => {
    console.error('Error al obtener las fechas excluidas:', error);
  });



const generarTurnosDisponibles = (fechaSeleccionada, turnosTomados, horaI1, horaF1, horaI2, horaF2, duracionTurno) => {
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
    if (horaInicio < horaI1) {
      horaInicio = horaI1;
    }
    if (horaInicio < horaI2) {
      horaInicio = horaI2;
    }

    // Generar turnos entre horaI1 y horaF1
    for (let i = horaInicio; i < horaF1; i++) {
      for (let j = minutoInicio; j < 60; j += duracionTurno) {
        const hora = `${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`;
        if (!turnosTomados.find((turno) => turno.hora === hora && turno.fecha === fechaString)) {
          nuevosTurnos.push({ hora });
        }
      }
      // Reiniciar los minutos después de la primera hora completa
      minutoInicio = 0;
    }

    // Generar turnos entre horaI2 y horaF2
    for (let i = horaI2; i < horaF2 || horaInicio == horaI2; i++) {
      for (let j = 0; j < 60; j += duracionTurno) {
        const hora = `${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`;
        if (!turnosTomados.find((turno) => turno.hora === hora && turno.fecha === fechaString)) {
          nuevosTurnos.push({ hora });
        }
      }
    }
  } else {
    // Si la fecha seleccionada no es hoy, generar turnos normales
    for (let i = horaI1; i < horaF1; i++) {
      for (let j = 0; j < 60; j += duracionTurno) {
        const hora = `${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`;
        if (!turnosTomados.find((turno) => turno.hora === hora && turno.fecha === fechaString)) {
          nuevosTurnos.push({ hora });
        }
      }
    }

    for (let i = horaI2; i < horaF2; i++) {
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
  const [modalVisible, setModalVisible] = useState(false);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  const [turnosTomados, setTurnosTomados] = useState([]);

  

  useEffect(() => {
    fetch('https://faq-utn.heliohost.us/getTurnos.php')
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
    const nuevosTurnos = generarTurnosDisponibles(fechaSeleccionada, turnosTomados, horaI1, horaF1, horaI2, horaF2, duracionTurno);
    setTurnosDisponibles(nuevosTurnos);
  }, [fechaSeleccionada]);

  useEffect(() => {
    const nuevosTurnos = generarTurnosDisponibles(fechaSeleccionada, turnosTomados, horaI1, horaF1, horaI2, horaF2, duracionTurno);
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
    const url = `https://faq-utn.heliohost.us/createTurno.php?nombre=${nombre}&telefono=${telefono}&fecha=${fechaSeleccionada}&hora=${horaSeleccionada}`;
  
    // Hacer la solicitud a la API
    fetch(url)
      .then(response => response.json()) // Convertir la respuesta a JSON
      .then(data => {
        // Manejar la respuesta de la API
        // Cerrar el modal después de enviar la solicitud
        setModalVisible(false);
        // Agregar el turno creado a la lista de turnos tomados si es necesario
        data.hora = data.hora.slice(0, 5); // Obtener solo los primeros 5 caracteres de la hora (HH:MM)
        // Establecer los turnos modificados en el estado
        guardarTurno(data);
        turnosTomados.push(data)
        const nuevosTurnos = generarTurnosDisponibles(fechaSeleccionada, turnosTomados, horaI1, horaF1, horaI2, horaF2, duracionTurno);
    setTurnosDisponibles(nuevosTurnos);
      })
      .catch(error => {
        // Error de red u otro error
        console.error('Error:', error);
      });
  };
  
  const guardarTurno = async (turno) => {
    try {
      // Obtener los turnos guardados actualmente
      const turnosGuardados = await AsyncStorage.getItem('misTurnos');
      let nuevosTurnos = [];
      if (turnosGuardados) {
        nuevosTurnos = JSON.parse(turnosGuardados);
      }
      // Agregar el nuevo turno a la lista
      nuevosTurnos.push(turno);
      // Guardar los turnos actualizados en AsyncStorage
      await AsyncStorage.setItem('misTurnos', JSON.stringify(nuevosTurnos));
    } catch (error) {
      console.error('Error al guardar el turno:', error);
    }
  };

  // Generar opciones del picker para los próximos 'diasAFuturo' días
const diasOptions = Array.from({ length: diasAFuturo + 1 }, (_, i) => {
  const fecha = moment().add(i, 'days');
  const fechaString = fecha.format('YYYY-MM-DD');
  // Verificar si la hora actual es mayor que horaF2 y si la fecha no está en el array de fechas excluidas
  if (!(moment().hour() > horaF2 && moment().isSame(fecha, 'day')) && !diasExcluidos.includes(fechaString)) {
    return <Picker.Item key={fechaString} label={fechaString} value={i} />;
  }
  return null; // Devolver null para omitir la fecha actual y las fechas excluidas
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



export default SeleccionTurnosScreen;
