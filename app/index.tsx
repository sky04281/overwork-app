import {
    SafeAreaView,
    View,
    Text,
    Button,
    TouchableOpacity,
    Pressable,
} from 'react-native'
import React from 'react'
import { useRouter, Link } from 'expo-router'

const LoginScreen = () => {
    const router = useRouter()

    return (
        <SafeAreaView>
            <View className="flex flex-row justify-center">
                {/* <Link className="w-10 h-5 dark:text-white" href={'/(tabs)'}>
                    登入
                </Link> */}
                <Pressable
                    className="bg-blue-500 h-10 w-20 rounded-lg flex flex-row justify-center items-center"
                    onPress={() => {
                        router.push('/(tabs)')
                    }}
                >
                    <Text className="dark:text-white">登入</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen
