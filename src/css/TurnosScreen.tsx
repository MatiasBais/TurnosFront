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
  },
  turno: {
    fontSize: 14,
    marginBottom: 5,
  },
  

flatList: {
    flexGrow: 1,
    width: '100%',
  },
});

export default styles;
