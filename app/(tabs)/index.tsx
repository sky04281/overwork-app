import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    FlatList,
} from 'react-native'

export default function HomeScreen() {
    const DATA = [
        {
            name: '疾病一',
            info: 'infoinfoinfoinfoinfoinfo',
        },
        {
            name: '疾病二',
            info: 'infoinfoinfoinfoinfoinfo',
        },
        {
            name: '疾病三',
            info: 'infoinfoinfoinfoinfoinfo',
        },
        {
            name: '疾病四',
            info: 'infoinfoinfoinfoinfoinfo',
        },
        {
            name: '疾病五',
            info: 'infoinfoinfoinfoinfoinfo',
        },
    ]

    return (
        <SafeAreaView>
            <ScrollView className="">
                <View className="flex justify-center items-center h-[5vh]">
                    <Text className="text-xl font-bold">過負荷評量</Text>
                </View>
                <View className="flex flex-col">
                    <View className="flex justify-center items-center h-[7.5vh] mt-[2vh]">
                        <Text>等級用光譜顯示</Text>
                    </View>
                    <View className="flex justify-center items-center h-[7.5vh]">
                        <Text>過負荷評分</Text>
                    </View>
                </View>
                <View className="flex-1 flex-col justify-center items-center">
                    <View className="flex justify-center items-center h-[5vh] mt-[5vh]">
                        <Text className="text-xl font-bold">
                            高風險潛在疾病
                        </Text>
                    </View>
                    <View className="flex flex-row items-center h-[25vh] w-[90vw]">
                        <FlatList
                            horizontal
                            data={DATA}
                            renderItem={({ item }) => (
                                <View className="flex flex-col justify-center items-center h-[15vh] w-[55vw] mr-[5vw] mb-[2.5vh] border border-solid rounded-[15px]">
                                    <Text className="text-lg mb-[2vh]">
                                        {item.name}
                                    </Text>
                                    <Text className="">{item.info}</Text>
                                </View>
                            )}
                        />
                    </View>
                </View>
                <View className="flex justify-center items-center h-[5vh]">
                    <Text className="text-xl font-bold">衛教資訊</Text>
                </View>
                <View className="flex flex-col justify-center items-center mt-[5vh]">
                    <View className="flex justify-center items-center h-[15vh] w-[80vw] mb-[5vh] mr-[5vh] border border-solid rounded-[15px]"></View>
                    <View className="flex justify-center items-center h-[15vh] w-[80vw] mb-[5vh] ml-[5vh] border border-solid rounded-[15px]"></View>
                    <View className="flex justify-center items-center h-[15vh] w-[80vw] mb-[5vh] mr-[5vh] border border-solid rounded-[15px]"></View>
                    <View className="flex justify-center items-center h-[15vh] w-[80vw] mb-[5vh] ml-[5vh] border border-solid rounded-[15px]"></View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({})
