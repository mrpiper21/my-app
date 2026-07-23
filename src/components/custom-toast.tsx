import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

type CustomToastProps = {
    message: string,
    visible: boolean,
    duration?: number,
    onHide?: () => void
}

const CustomToast = ({ message, visible, duration = 3000, onHide }: CustomToastProps) => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.delay(duration),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => onHide?.());
        }
    }, [visible, duration, opacity, onHide]);

    if (!visible) return null;

    return (
        <Animated.View style={[styles.toast, { opacity }]}>
            <Text style={styles.text}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        backgroundColor: '#333',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
    },
    text: {
        color: '#fff',
        fontSize: 14,
    },
});

export default CustomToast;