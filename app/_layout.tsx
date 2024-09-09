import { useFonts } from 'expo-font'
import { router, Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { useColorScheme } from 'nativewind'
import useAuth from '@/hooks/useAuth'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const { colorScheme, setColorScheme } = useColorScheme()
    const { user } = useAuth()

    useEffect(() => {
        setColorScheme('light')
    })

    useEffect(() => {
        console.log('root layout user: ', user)
    }, [user])

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    })

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="(tabs)" />
        </Stack>
    )
}
