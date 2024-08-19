import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Pressable,
    ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { useRouter, Link } from 'expo-router'

const LoginScreen = () => {
    const router = useRouter()

    return (
        <SafeAreaView className="h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="w-full h-full justify-center items-center">
                    <Text className="text-4xl dark:text-white">過負荷APP</Text>
                    <Pressable
                        className="bg-blue-500 h-10 w-20 rounded-lg flex flex-row justify-center items-center"
                        onPress={() => {
                            router.push('/(tabs)')
                        }}
                    >
                        <Text className="dark:text-white">登入</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LoginScreen
