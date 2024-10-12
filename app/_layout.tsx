import { useFonts } from 'expo-font'
import { router, Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { useColorScheme } from 'nativewind'
import useAuth from '@/hooks/useAuth'
import { AuthContext, AuthProvider } from '@/components/AuthProvider'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const { colorScheme, setColorScheme } = useColorScheme()

    useEffect(() => {
        setColorScheme('light')
    })

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    })

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
            console.log('account : test@gmail.com password : test123')
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="login" />
                <Stack.Screen name="register" />
                <Stack.Screen name="(tabs)" />
            </Stack>
        </AuthProvider>
    )
}
