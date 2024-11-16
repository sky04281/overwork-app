import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import BODYINFO from '@/types/bodyInfo'

interface BodyInfoListItemProps {
    title: string
    bodyInfo: BODYINFO
    className?: string
}

const BodyInfoListItem = ({ bodyInfo, ...props }: BodyInfoListItemProps) => {
    const [show, setShow] = React.useState(false)

    const infoFields = [
        { label: 'Heart Rate', value: bodyInfo.heartRate, unit: 'bpm' },
        { label: 'Systolic BP', value: bodyInfo.SBP, unit: 'mmHg' },
        { label: 'Diastolic BP', value: bodyInfo.DBP, unit: 'mmHg' },
        { label: 'Blood Sugar', value: bodyInfo.bloodSugar, unit: 'mg/dL' },
        { label: 'Height', value: bodyInfo.height, unit: 'cm' },
        { label: 'Weight', value: bodyInfo.weight, unit: 'kg' },
        { label: 'BMI', value: bodyInfo.BMI, unit: '' },
        { label: 'Steps', value: bodyInfo.steps, unit: 'steps' },
        { label: 'Sleep Time', value: bodyInfo.sleepTime, unit: 'hours' },
    ]

    return (
        <View className="bg-white rounded-lg shadow-sm mb-3 mx-1">
            <TouchableOpacity className="p-4" onPress={() => setShow(!show)}>
                <View className="flex-row justify-between items-center">
                    <Text className="text-gray-700 font-bold text-base">
                        {props.title}
                    </Text>
                    <AntDesign
                        name={show ? 'caretup' : 'caretdown'}
                        size={16}
                        color="#6B7280"
                    />
                </View>

                {show && (
                    <View className="mt-4 space-y-3">
                        {infoFields.map((field, index) => (
                            <View
                                key={index}
                                className="flex-row justify-between items-center"
                            >
                                <Text className="text-gray-500">
                                    {field.label}
                                </Text>
                                <Text className="font-medium">
                                    {field.value} {field.unit}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default BodyInfoListItem
