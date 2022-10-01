//import SelectList from 'react-native-dropdown-select-list' //to_do agregar a readme
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';

const MyConversations = () => {
    //const Nav = useNavigation();

    return (
    <SafeAreaView style={styles.container}>
        <Text> Mis conversaciones </Text>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F6F0EF",
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default MyConversations;