import { View, StyleSheet, Alert, Text, FlatList } from "react-native";
import Title from "../components/ui/Title";
import {useState, useEffect} from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude){
    const randomNum= Math.floor(Math.random() * (max-min))+min;

    if( randomNum=== exclude){
        return generateRandomBetween(min, max, exclude);
    }else{
        return randomNum;
    }
}

let minBoundary=1;
let maxBoundary=100;

function GameScreen({userNumber, onGameOver}){
    
    const initialGuess= generateRandomBetween(1,100, userNumber);
    const [currentGuess, setCurrentGuess]= useState(initialGuess);
    const [guessRounds, setGuessRounds]= useState([initialGuess]);

    useEffect(() =>{
        if(currentGuess===userNumber){
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(()=> {
        minBoundary:1;
        maxBoundary:100;
    }, []);

    function nextGuessHandler(direction){
        if((direction==='lower' && currentGuess<userNumber) || (direction==='greater' && currentGuess>userNumber)){
           Alert.alert("Don't lie!","You know that this is wrong...",[{text:'Sorry',style:"cancel"}]);
           return; 
        }
        if(direction==='lower'){
            maxBoundary=currentGuess;
        }
        else{
            minBoundary=currentGuess+1;  
        }
        const newRandomNum=generateRandomBetween(minBoundary,maxBoundary,currentGuess);
        setCurrentGuess(newRandomNum);
        setGuessRounds((prevGuessRounds) => [newRandomNum, ...prevGuessRounds]);
    }

    const guessRoundsListLength= guessRounds.length;

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>
                <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                <PrimaryButton onPress={nextGuessHandler.bind(this,'greater')}>
                <Ionicons name="add-outline" size={24} color="beige" />
                </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                <PrimaryButton onPress={nextGuessHandler.bind(this,'lower')}>
                    <Ionicons name="remove-outline" size={24} color="beige" />
                    </PrimaryButton>
                </View>
                </View>
            </Card>
            <View style={styles.listContainer}>
                <FlatList 
                data={guessRounds} 
                renderItem={(itemData) => (
                    <GuessLogItem 
                        roundNumber={guessRoundsListLength- itemData.index} 
                        guess={itemData.item}
                    /> 
                )}
                keyExtractor={(item) => item}
                //item itself can be a key because it is a guess nb and this nb can't be guessed twice
                />
            </View>
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen:{
       flex:1,
       padding:12
    },  
    instructionText:{
        marginBottom:20
    },
    buttonsContainer:{
        flexDirection:"row"
    },
    buttonContainer:{
        flex:1
    },
    listContainer: {
        flex: 1,
        padding: 16,
    },  
});