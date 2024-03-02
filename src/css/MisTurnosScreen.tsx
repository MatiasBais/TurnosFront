import {StyleSheet} from 'react-native';
import { red100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop:20,
    },
    flatList: {
      flexGrow: 1,
      width: '100%',
    },
    card: {
        marginBottom: 10,
        borderRadius: 10,
      },
      content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
      },
      textContainer: {
        flex: 1, // Para que ocupe el espacio disponible y el texto se alinee a la izquierda
      },
      text: {
        fontSize: 16,
        marginBottom: 5,
      },
      button: {
        backgroundColor: 'red', // Color de fondo del botón
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
      },
      buttonText: {
        color: '#ffffff', // Color del texto del botón
        fontWeight: 'bold',
      },
  });
  

export default styles;