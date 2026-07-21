import { FC } from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

interface ButtonProps {
    text: string;
    onPress?: () => void,
    style?: StyleProp<ViewStyle>;
}

const Button: FC<ButtonProps> = ({ text, onPress, style }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[styles.button, style]}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 15,
        backgroundColor: 'yellow',
        borderRadius: 10,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Button;