import { Spacing } from "@/constants/theme";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TActiveTab } from "..";

interface TabsProps {
    tabs: any[],
    activeTab: any
}

const Tabs: FC<TabsProps> = ({ tabs, activeTab }) => {
    return (
        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly", marginTop: Spacing.four, borderBottomWidth: 0.3, borderColor: "lightgrey" }}>
            {
                tabs.map((_item, index) => (
                    <TouchableOpacity style={{ borderBottomColor: "yellow", borderBottomWidth: _item.key === activeTab ? 1 : 0, paddingBottom: Spacing.two }} key={index} onPress={() => _item.onPress(_item.key as TActiveTab)}>
                        <Text style={{ color: _item.key === activeTab ? "yellow" : "white" }}>{_item.name}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

export default Tabs