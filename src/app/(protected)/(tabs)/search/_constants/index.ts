import { TActiveTab } from ".."

export const tabItems = (onChange: (activeTab: TActiveTab) => void) => {
    return ([
        {
            name: "All",
            onPress: onChange,
            key: "all"
        },
        {
            name: "Movies",
            onPress: onChange,
            key: "movies"
        },
        {
            name: "TV Shows",
            onPress: onChange,
            key: "Tv-show"
        }
    ])
}