import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row', // Para alinear el título y el logo horizontalmente
    alignItems: 'center', // Para alinear verticalmente el título y el logo
  },
  titleContainer: {
    flex: 1, // Para que el título ocupe todo el espacio disponible
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding:20
  },
  logoContainer: {
    marginLeft: 'auto', // Para colocar el logo a la derecha
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#ffffff',
    marginBottom:10
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  selectedTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue', // Color del borde inferior para la pestaña seleccionada
  },
});

export default styles;
