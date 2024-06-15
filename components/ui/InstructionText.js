import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";

function InstructionText({children, style}){
    return <Text style={[styles.instructionText, style]}>{children}</Text>
}

export default InstructionText;

const styles= StyleSheet.create({
    instructionText:{
        fontFamily:'open-sans',
        color:Colors.accent500,
        fontSize:24,
        shadowColor:'black',
        shadowRadius:3,
        shadowOpacity:1,
        shadowOffset:{width:0, height:2},
        elevation:5
    }
});