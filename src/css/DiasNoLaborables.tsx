import {StyleSheet} from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
      fontSize: 20,
      marginTop:20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
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
      flatList: {
        flexGrow: 1,
        width: '100%',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      modalButton: {
        marginTop: 10,
        width: '100%',
      },
  });

  export default styles;