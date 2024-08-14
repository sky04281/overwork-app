import { View, Text, SafeAreaView } from 'react-native'

export default function HomeScreen() {
    return (
        <SafeAreaView>
            <View className="flex, justify-center, items-center">
                <Text className="w-10, h-5 dark:text-white">
                    登入後首頁 個人健康儀表板
                </Text>
            </View>
        </SafeAreaView>
    )
}
