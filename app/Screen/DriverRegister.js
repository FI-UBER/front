import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Button, Alert, Settings} from 'react-native';
import DatePicker from 'react-native-date-picker'
import FIFIUBA from '../assets/FIFIUBA.png'


const [nametext, Name] = useState(null);
const [lntext, LastName] = useState(null);
const [phonenum, Phone] = useState(null);
const [emailtext, Email] = useState(null);
const [birthdate, Birth] = useState(new Date().format('DD-MM-YYYY'));
const [passtext, Pass] = useState(null);
const [openDate, setOpenDate] = useState(false)
const [isDisabled, setDisabled] = useState(false);
const Nav = useNavigation();


const checkEmail = () => {
    if (emailtext!=null){
        if (emailtext.includes('@') & emailtext.includes('.com')){
            return true
        }
        console.log('Email invalido. no contiene @ ni .com');
    }
    return false
}

const checkBirthDate = () => {
    if (birthtext!=null){
        var currentDate = moment().utcOffset('-03:00').format('DD-MM-YYYY');
        var currentYear = currentDate.getFullYear();
        var validDate = currentDate.setFullYear(currentYear-18);
        if (birthdate > validDate){
            return true
        }
        console.log('Fecha de nacimiento invalida, menor de edad');
    }
    return false
}

const checkForm = () => {
    if (nametext!=null & lntext!=null & phonenum!=null & passtext!=null){
        if (nametext.length!=0 & lntext.length!=0 & phonenum.length!=0 & passtext.length!=0){
            if (checkEmail() & checkBirthDate()){
                return true
            }
        }
    }
    return false
}

const handleRegister = () => {
    if (checkForm()){
        body = { name: nametext, lastname: lntext, phone: phonenum, mail: emailtext, birthdate: birthdate, password: passtext }
        console.log(body);
        console.log('Registrado');
        //setDisabled(!isDisabled)
        Nav.navigate("HomeScreen Logeado")
    }
}

const DriverRegister = () => {
    return(
        <SafeAreaView style={styles.container}>
          <View>
            <Image source={FIFIUBA} style={{ width: 305, height: 159 }} />
          </View>
            <TextInput
                style={styles.input}
                onChangeText={Name}
                placeholder="Your Name"
                keyboardType="default"
            />
            <TextInput
                style={styles.input}
                onChangeText={LastName}
                placeholder="Your Last Name"
                keyboardType="default"
            />
            <TextInput
                style={styles.input}
                onChangeText={Phone}
                placeholder="Your Phone Number"
                keyboardType="default"
            />
            <TextInput
                style={styles.input}
                onChangeText={Email}
                placeholder="Your Email address"
                keyboardType="default"
            />
            <Button title="Select Birth Date" onPress={() => setOpenDate(true)} />
            <DatePicker
                modal
                open={openDate}
                date={birthdate}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                  }}
                  onCancel={() => {
                    setOpen(false)
                  }}
            />
            <TextInput
                style={styles.input}
                onChangeText={Pass}
                placeholder="Password"
                keyboardType="default"
            />
          <View>
            <Button  
              type="button" 
              title="Sign Up"
              onPress= {handleRegister} 
              disabled={isDisabled}>
              </Button>
          </View> 
        </SafeAreaView>
    );
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#193752',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 20,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
      },
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
});


export default DriverRegister;