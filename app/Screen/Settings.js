import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
} from 'react-native';
import {currentSession} from '../context'

export default function Settings({ navigation }) {

    const onPressHandler = () => {
        navigation.navigate('Login');

    }

    return (
        <View style={styles.body}>
            <Text style={styles.text}>
                Settings
        </Text>
            {/* <Pressable
                onPress={onPressHandler}
                style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#0f0' })}
            >
                <Text style={styles.text}>
                    Go Back to Login
          </Text>
            </Pressable> */}
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        margin: 10,
    }
})