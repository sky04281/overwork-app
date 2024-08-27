import { AntDesign } from '@expo/vector-icons'
import { View, Text, Pressable } from 'react-native'

export default function HealthInfo({
    overworkScore,
    lifeScore,
    handlePressInfo,
}: {
    overworkScore: number
    lifeScore: number
    handlePressInfo: () => void
}) {
    // 看要怎麼判斷去呈現衛教資訊
    const info =
        overworkScore + lifeScore > 100
            ? [
                  {
                      title: '資訊一',
                      content: '內容內容內容內容內容內容',
                  },
                  {
                      title: '資訊一',
                      content: '內容內容內容內容內容內容',
                  },
                  {
                      title: '資訊一',
                      content: '內容內容內容內容內容內容',
                  },
                  {
                      title: '資訊一',
                      content: '內容內容內容內容內容內容',
                  },
                  {
                      title: '資訊一',
                      content: '內容內容內容內容內容內容',
                  },
              ]
            : [
                  {
                      title: '資訊二',
                      content: '內容內容內容內容內容內容',
                  },
                  {
                      title: '資訊二',
                      content: '內容內容內容內容內容內容',
                  },
                  {
                      title: '資訊二',
                      content: '內容內容內容內容內容內容',
                  },
                  {
                      title: '資訊二',
                      content: '內容內容內容內容內容內容',
                  },
                  {
                      title: '資訊二',
                      content: '內容內容內容內容內容內容',
                  },
              ]

    return (
        <View className="flex justify-center items-center mt-[1.5vh]">
            {info.map((info, index) => {
                return (index + 1) % 2 === 1 ? (
                    <View
                        className="flex h-[15vh] w-[80vw] mb-[5vh] mr-[5vh] border border-solid rounded-[15px]"
                        key={index}
                    >
                        <View className="flex flex-row justify-between items-center mx-[3vw] mt-[1vh]">
                            <Text className="text-xl font-semibold text-indigo-700">
                                {info.title}
                            </Text>
                            <Pressable onPress={handlePressInfo}>
                                <AntDesign
                                    name="infocirlceo"
                                    size={16}
                                    color="black"
                                />
                            </Pressable>
                        </View>
                        <View className="flex justify-start mx-[5vw] mt-[0.5vh] h-[8vh]">
                            <Text className="text-indigo-900">
                                {info.content}
                            </Text>
                        </View>
                    </View>
                ) : (
                    <View
                        className="flex h-[15vh] w-[80vw] mb-[5vh] ml-[5vh] border border-solid rounded-[15px]"
                        key={index}
                    >
                        <View className="flex flex-row justify-between items-center mx-[3vw] mt-[1vh]">
                            <Pressable onPress={handlePressInfo}>
                                <AntDesign
                                    name="infocirlceo"
                                    size={16}
                                    color="black"
                                />
                            </Pressable>
                            <Text className="text-xl font-semibold text-indigo-700">
                                {info.title}
                            </Text>
                        </View>
                        <View className="flex justify-start mx-[5vw] mt-[0.5vh] h-[8vh]">
                            <Text className="text-indigo-900">
                                {info.content}
                            </Text>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

{
    /* <View className="flex h-[15vh] w-[80vw] mb-[5vh] mr-[5vh] border border-solid rounded-[15px]">
    <View className="flex flex-row justify-between items-center mx-[3vw] mt-[1vh]">
        <Text className="text-xl font-semibold text-indigo-700">
            {TITLE}
        </Text>
        <Pressable onPress={handlePressInfo}>
            <AntDesign
                name="infocirlceo"
                size={16}
                color="black"
            />
        </Pressable>
    </View>
    <View className="flex justify-start mx-[5vw] mt-[0.5vh] h-[8vh]">
        <Text className="text-indigo-900">{INFO}</Text>
    </View>
</View> */
}
