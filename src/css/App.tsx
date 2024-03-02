import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    header: {
      marginTop: 20,
      padding: 20,
      backgroundColor: '#ffffff',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
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