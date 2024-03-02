import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  content: {
    padding: 15,
   
  },
  fecha: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  turnosContainer: {
    marginTop: 10,
    flex:1
  },
  turno: {
    fontSize: 14,
    marginBottom: 5,
  },
  flatList: {
    flexGrow: 1,
    width: '100%',
  },
  turnoCard: {
    marginBottom: 10,
    borderRadius: 10,
  },
  turnoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  button: {
    backgroundColor: '#e60023',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1, // Para que ocupe el espacio disponible y el texto se alinee a la izquierda
  },
  turnoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
