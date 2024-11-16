import {
    Alert,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import BasicInfoField from '@/components/tabs/BasicInfoField'
import Header from '@/components/tabs/Header'
import { logOut } from '@/firebase/authService'
import { router } from 'expo-router'
import useAuth from '@/hooks/useAuth'
import BASICINFO from '@/types/basicInfo'
import { updateBasicInfo } from '@/firebase/dbService'

const BasicInfoScreen = () => {
    const { user, userData } = useAuth()
    const [form, setForm] = useState<BASICINFO>({
        name: 'null',
        sex: 'null',
        birthday: 'null',
        height: 0,
        weight: 0,
        workingTime: 0,
        manager: 'null',
        familyMember: 'null',
    })
    const [isEditable, setIsEditable] = React.useState(false)

    useEffect(() => {
        if (userData) {
            const basicInfo = userData.basicInfo
            setForm({
                ...basicInfo,
            })
        }
    }, [userData])

    const handlePress = () => {
        if (isEditable) {
            console.log('saving', form)
            updateBasicInfo(user!.uid, form).catch((error) => {
                console.error('Error updating basic info:', error.message)
            })
        } else {
            console.log('editing')
        }
        setIsEditable(!isEditable)
    }

    return (
        <SafeAreaView className="h-full flex bg-white">
            <Header title="Basic Information" />
            <View className="flex-row justify-end items-center my-[2vh] mr-[5vw]">
                <Pressable
                    className={
                        isEditable
                            ? 'h-[4.5vh] w-[20vw] rounded-lg borderflex justify-center items-center bg-red-500'
                            : 'h-[4.5vh] w-[20vw] rounded-lg borderflex justify-center items-center bg-blue-400'
                    }
                    onPress={() => handlePress()}
                >
                    <Text className="text-lg text-white font-bold">
                        {isEditable ? 'Save' : 'Edit'}
                    </Text>
                </Pressable>
            </View>
            <ScrollView>
                <View>
                    <BasicInfoField
                        title="Name"
                        value={form.name}
                        editable={isEditable}
                        onChangeText={(e) => setForm({ ...form, name: e })}
                    />
                    <BasicInfoField
                        title="Sex"
                        value={form.sex}
                        editable={isEditable}
                        onChangeText={(e) => setForm({ ...form, sex: e })}
                    />
                    <BasicInfoField
                        title="Birthday"
                        value={form.birthday}
                        editable={isEditable}
                        onChangeText={(e) => setForm({ ...form, birthday: e })}
                    />
                    <BasicInfoField
                        title="Height (cm)"
                        value={form.height.toString()}
                        type="number-pad"
                        editable={isEditable}
                        onChangeText={(e) =>
                            setForm({
                                ...form,
                                height: e === '' ? 0 : parseInt(e),
                            })
                        }
                    />
                    <BasicInfoField
                        title="Weight (kg)"
                        value={form.weight.toString()}
                        type="number-pad"
                        editable={isEditable}
                        onChangeText={(e) =>
                            setForm({
                                ...form,
                                weight: e === '' ? 0 : parseInt(e),
                            })
                        }
                    />
                    <BasicInfoField
                        title="Working Hours (hr)"
                        value={form.workingTime.toString()}
                        type="number-pad"
                        editable={isEditable}
                        onChangeText={(e) =>
                            setForm({
                                ...form,
                                workingTime: e === '' ? 0 : parseInt(e),
                            })
                        }
                    />
                    <BasicInfoField
                        title="Manager Contact (email)"
                        value={form.manager}
                        editable={isEditable}
                        onChangeText={(e) => setForm({ ...form, manager: e })}
                    />
                    <BasicInfoField
                        title="Family Member Contact (email)"
                        value={form.familyMember}
                        editable={isEditable}
                        onChangeText={(e) =>
                            setForm({ ...form, familyMember: e })
                        }
                    />
                </View>
            </ScrollView>
            <View className="flex-row justify-center items-center my-[3vh]">
                <Pressable
                    className="bg-red-500 h-[5vh] w-[35vw] rounded-lg flex justify-center items-center"
                    onPress={() => {
                        Alert.alert(
                            'Log Out',
                            'Are you sure you want to log out?',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => {},
                                    style: 'cancel',
                                },
                                {
                                    text: 'Confirm',
                                    onPress: () => {
                                        logOut().then(() => {
                                            router.replace('/login')
                                        })
                                    },
                                },
                            ]
                        )
                    }}
                >
                    <Text className="text-white text-xl font-bold">
                        Log Out
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default BasicInfoScreen
