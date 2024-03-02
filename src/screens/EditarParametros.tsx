import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, KeyboardAvoidingView, ScrollView  } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../css/EditarParamtros';


const EditarParametrosScreen = () => {
  const [diasEnAdelanto, setDiasEnAdelanto] = useState(14);
  const [duracionTurno, setDuracionTurno] = useState(20);
  const [horaInicio1, setHoraInicio1] = useState(8);
  const [horaF1, setHoraF1] = useState(12);
  const [horaI2, setHoraI2] = useState(16);
  const [horaF2, setHoraF2] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parametrosResponse = await fetch('https://faq-utn.heliohost.us/getParametros.php');
        const parametrosData = await parametrosResponse.json();
        const diasAFuturo = parseInt(parametrosData.diasAFuturo);
        const duracionTurno = parseInt(parametrosData.duracionTurno);
        const horaI1 = parseInt(parametrosData.horaI1);
        const horaF1 = parseInt(parametrosData.horaF1);
        const horaI2 = parseInt(parametrosData.horaI2);
        const horaF2 = parseInt(parametrosData.horaF2);

        setDiasEnAdelanto(diasAFuturo);
        setDuracionTurno(duracionTurno);
        setHoraInicio1(horaI1);
        setHoraF1(horaF1);
        setHoraI2(horaI2);
        setHoraF2(horaF2);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  
const guardarParametros = async () =>{
    try {
        const url = 'https://faq-utn.heliohost.us/updateParametros.php'; // URL del endpoint de la API para guardar los parámetros
        const requestOptions = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            diasAFuturo: diasEnAdelanto,
            duracionTurno: duracionTurno,
            horaI1: horaInicio1,
            horaF1: horaF1,
            horaI2: horaI2,
            horaF2: horaF2
          })
        };
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        console.log('Respuesta de la API:', data);
        // Aquí puedes manejar la respuesta de la API, por ejemplo, mostrar un mensaje de éxito o error
        alert('Parámetros guardados correctamente.');
      } catch (error) {
        console.error('Error al guardar los parámetros:', error);
        alert('Error al guardar los parámetros. Por favor, inténtalo de nuevo más tarde.');
      }
  };

  const handleGuardar = () => {
    // Validar que todos los campos estén completos
    if (!diasEnAdelanto || !duracionTurno || !horaInicio1 || !horaF1 || !horaI2 || !horaF2) {
      alert('Por favor completa todos los campos.');
      return;
    }
    // Validar las condiciones de las horas
    if ((horaF1) <= (horaInicio1)) {
      alert('La hora de fin 1 debe ser mayor a la hora de inicio 1.');
      return;
    }
    if ((horaI2) < (horaF1)) {
      alert('La hora de inicio 2 debe ser mayor o igual a la hora de fin 1.');
      return;
    }
    if ((horaF2) < (horaI2)) {
      alert('La hora de fin 2 debe ser mayor o igual a la hora de inicio 2.');
      return;
    }

    // Validar que días en adelanto sea un número entero no menor a 1
    const dias = (diasEnAdelanto);
    if (isNaN(dias) || dias < 1) {
      alert('Días en adelanto debe ser un número entero no menor a 1.');
      return;
    }

    // Guardar los parámetros
    // Aquí puedes implementar la lógica para guardar los parámetros en AsyncStorage o en una base de datos
    guardarParametros();

    // Aquí puedes redirigir a la pantalla anterior o realizar alguna otra acción
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View>
  <Text>Días en adelanto:</Text>
  <TextInput
    style={styles.input}
    value={diasEnAdelanto.toString()}
    onChangeText={text => text!=''?setDiasEnAdelanto(parseInt(text) || null) : null}
    keyboardType="numeric"
  />
  <Text>Duración del turno:</Text>
  <Picker
    selectedValue={duracionTurno.toString()}
    onValueChange={(itemValue, itemIndex) => setDuracionTurno(parseInt(itemValue))}
    style={styles.picker}
  >
    <Picker.Item label="15 minutos" value="15" />
    <Picker.Item label="20 minutos" value="20" />
    <Picker.Item label="30 minutos" value="30" />
  </Picker>
  <Text>Hora de inicio 1:</Text>
  <TextInput
    style={styles.input}
    value={horaInicio1.toString()}
    onChangeText={text => text!=''?setHoraInicio1(parseInt(text) || null):null}
    keyboardType="numeric"
  />
  <Text>Hora de fin 1:</Text>
  <TextInput
    style={styles.input}
    value={horaF1.toString()}
    onChangeText={text => text!=''?setHoraF1(parseInt(text) || null):null}
    keyboardType="numeric"
  />
  <Text>Hora de inicio 2:</Text>
  <TextInput
    style={styles.input}
    value={horaI2.toString()}
    onChangeText={text => text!=''?setHoraI2(parseInt(text) || null):null}
    keyboardType="numeric"
  />
  <Text>Hora de fin 2:</Text>
  <TextInput
    style={styles.input}
    value={horaF2.toString()}
    onChangeText={text => text!=''?setHoraF2(parseInt(text) || null):''}
    keyboardType="numeric"
  />
</View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Guardar" onPress={handleGuardar} />
      </View>
    </KeyboardAvoidingView>
  );
};


export default EditarParametrosScreen;
