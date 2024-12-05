import { View, Text, Pressable, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { useRouter } from 'expo-router'
import FormField from '@/components/FormField'
import { logOut, signUp } from '@/firebase/authService'
import { FirebaseError } from 'firebase/app'
import BASICINFO from '@/types/basicInfo'
import { createUserInDB } from '@/firebase/dbService'
import useAuth from '@/hooks/useAuth'

const RegisterScreen = () => {
    const router = useRouter()
    const [form, setForm] = React.useState({
        userName: '',
        account: '',
        password: '',
    })
    const handleFormSubmit = () => {
        Alert.alert('Registering', 'Please confirm your information!', [
            {
                text: 'Confirm',
                onPress: () => {
                    if (
                        form.account === '' ||
                        form.password === '' ||
                        form.userName === ''
                    ) {
                        Alert.alert(
                            'Registration Failed',
                            'No fields can be empty'
                        )
                        return
                    }
                    signUp(form.account, form.password, form.userName)
                        .then((userCredential) => {
                            const basicInfo: BASICINFO = {
                                name: form.userName,
                                sex: '',
                                birthday: '',
                                height: 0,
                                weight: 0,
                                workingTime: 0,
                                manager: '',
                                familyMember: '',
                            }

                            return createUserInDB(
                                userCredential.user.uid,
                                basicInfo
                            )
                        })
                        .then(() => {
                            Alert.alert(
                                'Registration Successful',
                                'Log in to use the Overwork App'
                            )
                            return logOut()
                        })
                        .then(() => router.push('/login'))
                        .catch((e: FirebaseError) => {
                            Alert.alert('Registration Failed', e.message)
                            console.log(e)
                        })
                },
            },
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
        ])
    }
    return (
        <SafeAreaView className="h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="w-full h-full flex items-center">
                    <View className="h-[25%] justify-center items-center">
                        <Text className="p-5 text-5xl font-bold dark:text-white">
                            Register
                        </Text>
                    </View>
                    <View className="w-full px-4">
                        <FormField
                            title={'Name'}
                            value={form.userName}
                            placeholder="Enter your name here"
                            onChangeText={(e) => {
                                setForm({ ...form, userName: e })
                            }}
                        />
                        <FormField
                            title={'Account'}
                            value={form.account}
                            placeholder="Enter your email here"
                            keyBoardType="email-address"
                            onChangeText={(e) => {
                                setForm({ ...form, account: e })
                            }}
                        />
                        <FormField
                            title={'Password'}
                            value={form.password}
                            placeholder="Enter your password here"
                            isPassword
                            onChangeText={(e) => {
                                setForm({ ...form, password: e })
                            }}
                        />
                        <Pressable
                            className="bg-blue-400 h-10 w-full mt-5 mx-auto rounded-lg flex flex-row justify-center items-center"
                            onPress={() => {
                                handleFormSubmit()
                            }}
                        >
                            <Text className="text-white">Register</Text>
                        </Pressable>
                        <View className="flex flex-row justify-center mt-2">
                            <Text className="text-black">
                                Already have an account?
                            </Text>
                            <Text
                                className="text-blue-500 ml-1"
                                onPress={() => {
                                    router.push('/login')
                                }}
                            >
                                Log In
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RegisterScreen
