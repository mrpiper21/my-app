import { StyleProp, StyleSheet, TextInput, View, ViewStyle } from "react-native";

interface InputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    type?: "text" | "password" | "email" | "number";
    placeholderTextColor?: string;
    style?: StyleProp<ViewStyle>
}

const Input = (props: InputProps) => {
    return (
        <View style={[styles.container, props.style]}>
            <TextInput
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={props.onChangeText}
                secureTextEntry={props.secureTextEntry}
                keyboardType={props.type === "email" ? "email-address" : props.type === "number" ? "numeric" : "default"}
                placeholderTextColor={props.placeholderTextColor}
                style={styles.input}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        borderWidth: 1,
        borderColor: '#595656',
        borderRadius: 10,
        // marginVertical: 5,
    },
    input: {
        padding: 10,

    },
});

export default Input