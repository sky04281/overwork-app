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
    return (
        <View>
            <TouchableOpacity onPress={() => setShow(!show)}>
                <View className="flex-row w-[90vw] items-center justify-between space-x-1 border-b-[1px] pt-1">
                    <Text className="text-lg">{props.title}</Text>
                    <AntDesign
                        name={show ? 'caretup' : 'caretdown'}
                        size={16}
                        color="black"
                        onPress={() => setShow(!show)}
                    />
                </View>
                {show && (
                    <View className="flex-col items-start space-y-1 mt-2 ml-1">
                        <Text className="text-base">
                            Average Heart Rate: {bodyInfo.heartRate} bpm
                        </Text>
                        <Text className="text-base">
                            SBP: {bodyInfo.SBP} mmHg
                        </Text>
                        <Text className="text-base">
                            DBP: {bodyInfo.DBP} mmHg
                        </Text>
                        <Text className="text-base">
                            Blood Sugar: {bodyInfo.bloodSugar} mg/dL
                        </Text>
                        <Text className="text-base">
                            Height: {bodyInfo.height} cm
                        </Text>
                        <Text className="text-base">
                            Weight: {bodyInfo.weight} kg
                        </Text>
                        <Text className="text-base">BMI: {bodyInfo.BMI}</Text>
                        <Text className="text-base">
                            Steps: {bodyInfo.steps}
                        </Text>
                        <Text className="text-base">
                            Sleep Duration: {bodyInfo.sleepTime} hr
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default BodyInfoListItem
