import { View, Text, SafeAreaView } from 'react-native'

export default function HomeScreen() {
    return (
        <SafeAreaView>
            <View className="flex flex-col">
                <View className="flex flex-row justify-center items-center mt-10 p-5">
                    <Text className=" dark:text-white text-4xl font-bold">
                        健康狀況：{<Text className="text-green-500">健康</Text>}
                    </Text>
                </View>
                <View className="flex flex-row justify-center items-center">
                    <Text className=" dark:text-white">潛在疾病</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
