import { FC } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

interface CustomHeaderProps {
    title: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const CustomHeader: FC<CustomHeaderProps> = ({ title, leftIcon, rightIcon }) => {
    return (
        <ThemedView style={styles.container}>
            {leftIcon}
            <ThemedText >{title}</ThemedText>
            {rightIcon}
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

export default CustomHeader;