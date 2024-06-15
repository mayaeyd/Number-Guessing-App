import {View, Image, StyleSheet, Text} from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/Colors";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({roundsNumber , userNumber, onStartNewGame}){
    return (
        
            <View style={styles.rootContainer}>
            <Title>GAME OVER!</Title>  
            <View style={styles.imageContainer}>
                <Image source={require('../assets/images/success.png')} style={styles.image}/>
            </View>  
            <Text style={styles.summaryText}>
                Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds 
                to guess the number <Text style={styles.highlight}>{userNumber}</Text>.
            </Text>
            <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
            </View>
        
    );
}

export default GameOverScreen;

const styles= StyleSheet.create({
    rootContainer:{
       flex:1,
       padding:24,
       justifyContent:'center',
       alignItems:'center' 
    },
    imageContainer:{
        height: 300,
        width: 300,
        borderRadius: 150,
        borderWidth:3,
        borderColor: Colors.accent500,
        overflow:'hidden', //hide the rectangular nature of the image and overlay it with the givenn properties
        margin: 36
    },
    image:{
        height:"100%",
        width:"100%"
    },
    summaryText:{
        fontFamily:'open-sans',
        fontSize:24,
        textAlign:'center',
        marginBottom:24
    },
    highlight:{
        fontFamily:'open-sans-bold',
        color: Colors.accent500
    }

});