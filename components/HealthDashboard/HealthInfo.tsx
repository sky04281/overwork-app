import { AntDesign } from '@expo/vector-icons'
import { View, Text, Pressable } from 'react-native'

export default function healthEducationInfo({
    healthEducationInfo,
    handlePressInfo,
}: {
    healthEducationInfo: {
        disease: string
        description: string
    }[]
    handlePressInfo: (index: number) => void
}) {
    return (
        <View className="flex justify-center items-center mt-[1.5vh]">
            {healthEducationInfo.map((healthEducationInfo, index) => {
                return (index + 1) % 2 === 1 ? (
                    <View
                        className="flex h-[15vh] w-[80vw] mb-[5vh] mr-[5vh] border border-solid rounded-[15px]"
                        key={index}
                    >
                        <Pressable onPress={() => handlePressInfo(index)}>
                            <View className="flex flex-row justify-between items-center mx-[4vw] mt-[1vh]">
                                <Text className="text-xl font-semibold text-blue-800">
                                    {healthEducationInfo.disease}
                                </Text>
                                <AntDesign
                                    name="infocirlceo"
                                    size={16}
                                    color="black"
                                />
                            </View>
                            <View className="flex justify-start mx-[5vw] mt-[0.5vh] h-[8vh]">
                                <Text className="">
                                    {healthEducationInfo.description}
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                ) : (
                    <View
                        className="flex h-[15vh] w-[80vw] mb-[5vh] ml-[5vh] border border-solid rounded-[15px]"
                        key={index}
                    >
                        <Pressable onPress={() => handlePressInfo(index)}>
                            <View className="flex flex-row justify-between items-center mx-[4vw] mt-[1vh]">
                                <AntDesign
                                    name="infocirlceo"
                                    size={16}
                                    color="black"
                                />
                                <Text className="text-xl font-semibold text-indigo-700">
                                    {healthEducationInfo.disease}
                                </Text>
                            </View>
                            <View className="flex justify-start mx-[5vw] mt-[0.5vh] h-[8vh]">
                                <Text className="">
                                    {healthEducationInfo.description}
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                )
            })}
        </View>
    )
}
