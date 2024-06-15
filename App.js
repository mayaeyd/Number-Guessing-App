import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import { useState } from 'react';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/Colors';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {

  const [userNumber, setUserNumber]= useState();
  const [gameIsOver, setGameIsOver]=useState(true);
  const [guessRounds, setGuessRounds]= useState(0);

  const [fontsLoaded] = useFonts({  //this will load the fonts
    'open-sans':require("./assets/fonts/OpenSans-Regular.ttf"),
    'open-sans-bold':require("./assets/fonts/OpenSans-Bold.ttf"),
  }); //use fonts returns an array where the first element is a boolean which indicates whether the fonts are loaded

  if(!fontsLoaded){
    return <AppLoading />;
  }

  function pickedNumberHandler(pickedNumber){
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds){
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler(){
    setUserNumber(null);
    setGameIsOver(true);
    setGuessRounds(0);
  }

  let screen= <StartGameScreen onPickedNumber={pickedNumberHandler}/>;

  if(userNumber) {
    screen = (<GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>);
  }

  if(userNumber){
    screen=(
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if(gameIsOver && userNumber){
    screen =<GameOverScreen 
              userNumber={userNumber}
              roundsNumber={guessRounds}
              onStartNewGame={startNewGameHandler}
              />;
  }


  return (
    <LinearGradient colors={[Colors.accent500,Colors.primary800]} style={styles.rootScreen}>
      <ImageBackground 
        style={styles.rootScreen} 
        source={require('./assets/images/background.png')} 
        resizeMode="cover"
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>
          {screen}
        </SafeAreaView> 
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen:{
    flex: 1,
  },
  backgroundImage:{
    opacity:0.15
  }
});
