import { Image, StyleSheet } from 'react-native';
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

const AnimatedImage = Animated.createAnimatedComponent(Image);

// Matches the native splash background/image set in app.json so the handoff is seamless.
const SPLASH_BACKGROUND = '#208AEF';

type Props = {
    isAppReady: boolean;
    onAnimationEnd: () => void;
};

export function AnimatedSplashScreen({ isAppReady, onAnimationEnd }: Props) {
    const scale = useSharedValue(0.85);
    const logoOpacity = useSharedValue(0);
    const overlayOpacity = useSharedValue(1);

    useEffect(() => {
        scale.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.exp) });
        logoOpacity.value = withTiming(1, { duration: 400 });
    }, [logoOpacity, scale]);

    useEffect(() => {
        if (!isAppReady) return;

        overlayOpacity.value = withTiming(
            0,
            { duration: 350, easing: Easing.in(Easing.ease) },
            (finished) => {
                if (finished) runOnJS(onAnimationEnd)();
            }
        );
    }, [isAppReady, onAnimationEnd, overlayOpacity]);

    const overlayStyle = useAnimatedStyle(() => ({ opacity: overlayOpacity.value }));
    const logoStyle = useAnimatedStyle(() => ({
        opacity: logoOpacity.value,
        transform: [{ scale: scale.value }],
    }));

    return (
        <Animated.View
            style={[StyleSheet.absoluteFill, styles.container, overlayStyle]}
            pointerEvents="none"
        >
            <AnimatedImage
                source={require('../../assets/images/splash-icon.png')}
                style={[styles.logo, logoStyle]}
                resizeMode="contain"
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: SPLASH_BACKGROUND,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    logo: {
        width: 120,
        height: 120,
    },
});
