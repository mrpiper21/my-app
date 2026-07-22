import { FC } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { ThemedText } from "../themed-text";

interface CustomHeaderProps {
    title: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    style?: StyleProp<ViewStyle>
}

const CustomHeader: FC<CustomHeaderProps> = ({ title, leftIcon, rightIcon, style }) => {
    return (
        <View style={[styles.container, style]}>
            {leftIcon}
            <ThemedText >{title}</ThemedText>
            {rightIcon}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16
    },
})

export default CustomHeader;