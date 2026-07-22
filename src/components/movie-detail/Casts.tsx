import { Spacing } from "@/constants/theme"
import { Image } from "expo-image"
import { FC } from "react"
import { Text, View } from "react-native"

interface CastProps {
    img: string,
    name: string,
    role: string
}

const Casts: FC<{ casts: CastProps[] }> = ({ casts }) => {
    return (
        <View style={{ flexDirection: 'row', gap: Spacing.two }}>
            {casts.map((_person, index) => (
                <View style={{ alignItems: 'center', gap: Spacing.two }} key={index}>
                    <Image style={{ height: 60, width: 60, borderRadius: 150 }} source={{ uri: _person.img }} />
                    <Text style={{ color: "white" }}>{_person.name}</Text>
                    <Text style={{ color: "white" }}>{_person.role}</Text>
                </View>
            ))}
        </View>
    )
}

export default Casts