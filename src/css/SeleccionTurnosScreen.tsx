import {StyleSheet} from 'react-native';

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

export default styles;