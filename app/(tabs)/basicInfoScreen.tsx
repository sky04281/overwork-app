import {
    Alert,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    Animated,
} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
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
    const [showScrollIndicator, setShowScrollIndicator] = useState(true)
    const fadeAnim = useRef(new Animated.Value(1)).current
    const scaleAnim = useRef(new Animated.Value(1)).current

    useEffect(() => {
        if (userData) {
            const basicInfo = userData.basicInfo
            setForm({
                ...basicInfo,
            })
        }
    }, [userData])

    const validateForm = () => {
        const validations = [
            { value: form.name, field: 'Name' },
            { value: form.sex, field: 'Sex' },
            { value: form.birthday, field: 'Birthday' },
            { value: form.height, field: 'Height', min: 0 },
            { value: form.weight, field: 'Weight', min: 0 },
            { value: form.workingTime, field: 'Working Hours', min: 0 },
            { value: form.manager, field: "Manager's Email", isEmail: true },
            {
                value: form.familyMember,
                field: "Relative's Email",
                isEmail: true,
            },
        ]

        for (const validation of validations) {
            if (!validation.value || validation.value === 'null') {
                Alert.alert(
                    'Required Field',
                    `Please enter ${validation.field}`
                )
                return false
            }

            if (
                validation.min !== undefined &&
                validation.value <= validation.min
            ) {
                Alert.alert(
                    'Invalid Input',
                    `${validation.field} must be greater than ${validation.min}`
                )
                return false
            }

            if (validation.isEmail && !isValidEmail(validation.value)) {
                Alert.alert(
                    'Invalid Email',
                    `Please enter a valid email address`
                )
                return false
            }
        }

        return true
    }

    const isValidEmail = (email: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const handlePress = () => {
        if (isEditable) {
            if (!validateForm()) return

            Alert.alert('Confirm', 'Save changes?', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        updateBasicInfo(user!.uid, form)
                            .then(() => {
                                Alert.alert('Success', 'Information updated')
                                setIsEditable(false)
                            })
                            .catch((error) => {
                                Alert.alert('Error', error.message)
                            })
                    },
                },
            ])
        } else {
            setIsEditable(true)
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.02,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start()

            Alert.alert(
                'Edit Mode',
                'Tap on the fields to edit your information',
                [{ text: 'OK' }]
            )
        }
    }

    // 首先定義表單欄位配置
    const formFields = [
        { title: 'Name', key: 'name' },
        { title: 'Sex', key: 'sex' },
        { title: 'Birthday', key: 'birthday' },
        {
            title: 'Height',
            key: 'height',
            unit: 'cm',
            type: 'number-pad',
            isNumber: true,
        },
        {
            title: 'Weight',
            key: 'weight',
            unit: 'kg',
            type: 'number-pad',
            isNumber: true,
        },
        {
            title: 'Working Hours',
            key: 'workingTime',
            unit: 'hours',
            type: 'number-pad',
            isNumber: true,
        },
        {
            title: 'Manager',
            key: 'manager',
            subtitle: 'Email',
        },
        {
            title: 'Relative',
            key: 'familyMember',
            subtitle: 'Email',
        },
    ]

    // 處理滾動事件
    const handleScroll = (event: any) => {
        if (event.nativeEvent.contentOffset.y > 20) {
            setShowScrollIndicator(false)
        } else {
            setShowScrollIndicator(true)
        }
    }

    return (
        <SafeAreaView className="h-full flex bg-gray-200">
            <Header title="User Information" />

            {/* Buttons Container */}
            <View className="flex-row justify-end items-center my-5 mx-4 space-x-3">
                {/* Edit Button */}
                <Pressable
                    className={`h-8 px-4 rounded-lg flex justify-center items-center ${
                        isEditable
                            ? 'bg-yellow-400 active:bg-yellow-500'
                            : 'bg-blue-500 active:bg-blue-600'
                    } shadow-md`}
                    onPress={handlePress}
                >
                    <Text className="text-white font-bold">
                        {isEditable ? 'Save' : 'Edit'}
                    </Text>
                </Pressable>

                {/* Logout Button */}
                <Pressable
                    className="bg-red-500 h-8 px-4 rounded-lg flex justify-center items-center shadow-md active:bg-red-600"
                    onPress={() => {
                        Alert.alert(
                            'Log Out',
                            'Are you sure you want to log out?',
                            [
                                {
                                    text: 'Cancel',
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
                    <Text className="text-white font-bold">Log Out</Text>
                </Pressable>
            </View>

            <View className="relative flex-1">
                <ScrollView
                    className="bg-gray-50 rounded-t-3xl shadow-lg mx-3 py-4 px-4"
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    <View className="p-4 space-y-4">
                        {formFields.map((field) => (
                            <Animated.View
                                key={field.key}
                                style={{
                                    transform: [{ scale: scaleAnim }],
                                }}
                            >
                                <BasicInfoField
                                    title={field.title}
                                    subtitle={field.subtitle}
                                    unit={field.unit}
                                    value={
                                        field.isNumber
                                            ? form[
                                                  field.key as keyof BASICINFO
                                              ]?.toString()
                                            : form[
                                                  field.key as keyof BASICINFO
                                              ]?.toString()
                                    }
                                    type={
                                        field.type as 'default' | 'number-pad'
                                    }
                                    editable={isEditable}
                                    containerStyle={
                                        isEditable
                                            ? 'bg-white border-2 border-blue-300 shadow-lg'
                                            : 'bg-white border border-gray-300 shadow-sm'
                                    }
                                    placeholder={
                                        isEditable
                                            ? `Enter ${field.title.toLowerCase()}`
                                            : ''
                                    }
                                    onChangeText={(e) => {
                                        if (field.isNumber) {
                                            setForm({
                                                ...form,
                                                [field.key]:
                                                    e === '' ? 0 : parseInt(e),
                                            })
                                        } else {
                                            setForm({
                                                ...form,
                                                [field.key]: e,
                                            })
                                        }
                                    }}
                                />
                            </Animated.View>
                        ))}
                    </View>
                </ScrollView>

                {/* Scroll Indicator overlay */}
                {showScrollIndicator && (
                    <View className="absolute bottom-4 left-0 right-0 items-center">
                        <View className="bg-gray-200/90 px-4 py-2 rounded-full shadow-md">
                            <Text className="text-gray-600 text-sm font-medium">
                                Scroll for more ↓
                            </Text>
                        </View>
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}

export default BasicInfoScreen
