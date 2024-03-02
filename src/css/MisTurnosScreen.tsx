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
        flex: 1
      },
      text: {
        fontSize: 16,
        marginBottom: 5,
      },
      button: {
        backgroundColor: '#e60023', // Color de fondo del botón
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
      },
      buttonText: {
        color: '#ffffff', // Color del texto del botón
        fontWeight: 'bold',
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
  });
  

export default styles;