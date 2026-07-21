import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
    const scheme = useColorScheme();
    const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];
    return (
        <NativeTabs
            backgroundColor={colors.background}
            indicatorColor={colors.backgroundElement}
            labelStyle={{ selected: { color: colors.text } }}>
            <NativeTabs.Trigger name="index">
                <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon
                    src={require('@/assets/images/tabIcons/home.png')}
                    renderingMode="template"
                />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="search">
                <NativeTabs.Trigger.Label>Search</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon
                    sf="magnifyingglass"
                    md="search"
                />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="favorite">
                <NativeTabs.Trigger.Label>Favorite</NativeTabs.Trigger.Label>
                <NativeTabs.Trigger.Icon
                    sf="heart"
                    md="favorite"
                />
            </NativeTabs.Trigger>
        </NativeTabs>
    )
}