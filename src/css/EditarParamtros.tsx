import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'space-between', // Alinear contenido en el centro verticalmente
    },
    scrollContainer: {
      flexGrow: 1, // Para que el ScrollView ocupe todo el espacio vertical disponible
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    picker: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
    },
    buttonContainer: {
      marginBottom: 20,
    },
  });

  export default styles;


