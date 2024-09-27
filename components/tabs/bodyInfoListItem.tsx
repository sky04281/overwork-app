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
                <View className="flex-row w-[95vw] items-center justify-between space-x-1 border-b-[1px] pt-1">
                    <Text className="text-lg">{props.title}</Text>
                    <AntDesign
                        name={show ? 'caretup' : 'caretdown'}
                        size={16}
                        color="black"
                        onPress={() => setShow(!show)}
                    />
                </View>
                {show && (
                    <View className="flex-col items-start space-y-1">
                        <Text className="text-base">
                            平均心率: {bodyInfo.heartRate}
                        </Text>
                        <Text className="text-base">
                            收縮壓: {bodyInfo.SBP} mmHg
                        </Text>
                        <Text className="text-base">
                            舒張壓: {bodyInfo.DBP} mmHg
                        </Text>
                        <Text className="text-base">
                            血糖: {bodyInfo.bloodSugar} mg/dL
                        </Text>
                        <Text className="text-base">
                            身高: {bodyInfo.height} cm
                        </Text>
                        <Text className="text-base">
                            體重: {bodyInfo.weight} kg
                        </Text>
                        <Text className="text-base">BMI: {bodyInfo.BMI}</Text>
                        <Text className="text-base">
                            步數: {bodyInfo.steps} steps
                        </Text>
                        <Text className="text-base">
                            睡眠時長: {bodyInfo.sleepTime} hr
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default BodyInfoListItem
