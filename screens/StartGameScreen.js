import { useState } from "react";
import { TextInput, View, StyleSheet, Alert } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/Colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({onPickedNumber}){
    const [enteredNumber, setEnteredNumber]= useState("");

    function handleEnteredNumber(input){
        setEnteredNumber(input);
    }
    
    function resetInputHandler(){
        setEnteredNumber("");
    }

    function confirmInputHandler(){
        const chosenNumber= parseInt(enteredNumber);

        if(isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber>99){
            Alert.alert(
                'Invalid number!',
                "Number has to be between 1 and 99",
                [{ text:"Okay", style:"destructive", onPress:resetInputHandler}]);
            return;
        }

        onPickedNumber(chosenNumber); 
    }

    return( 
    <View style={styles.rootContainer}>
        <Title>Guess My Number</Title>
            <Card>
                <InstructionText>Enter a number</InstructionText>
                <TextInput 
                    style={styles.numberInput} 
                    maxLength={2} 
                    keyboardType="number-pad" 
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={enteredNumber}
                    onChangeText={handleEnteredNumber}

                />
                <View style={styles.buttonsContainer}>
                    <View style={styles.button}>
                        <PrimaryButton>Reset</PrimaryButton>
                    </View>
                    <View style={styles.button}>
                        <PrimaryButton 
                            onPress={confirmInputHandler}
                        >
                            Confirm
                        </PrimaryButton> 
                    </View>
                </View>
        </Card>
    </View>
    );
}

export default StartGameScreen;

const styles= StyleSheet.create({
    rootContainer:{
        flex:1,
        marginTop:100,
        alignItems:"center"

    },
    numberInput:{
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor:Colors.accent500,
        borderBottomWidth:2,
        color:Colors.accent500,
        marginVertical:8,
        fontWeight: 'bold',
        textAlign:"center",  
    },
    buttonsContainer:{
        flexDirection:"row",  
    },
    button:{
        flex:1,
        alignItems:"stretch"
    },
    
});