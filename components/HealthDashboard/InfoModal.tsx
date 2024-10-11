import { View, Text, Modal, Pressable, ScrollView } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'

export default function InfoModal({
    healthEducationInfo,
    infoModalVisible,
    setInfoModalVisible,
}: {
    healthEducationInfo: {
        disease: string
        description: string
    }
    infoModalVisible: boolean
    setInfoModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}) {
    return (
        <Modal
            visible={infoModalVisible}
            transparent={true}
            animationType="slide"
        >
            <View className="w-[70vw] mx-[15vw] mt-[25vh] rounded-[15px] bg-white">
                <View className="flex flex-row justify-between items-center mx-[5vw] my-[1.5vh]">
                    <View>
                        <Text className="text-lg font-semibold">
                            {healthEducationInfo.disease}
                        </Text>
                    </View>
                    <Pressable
                        onPress={() => {
                            setInfoModalVisible(!infoModalVisible)
                        }}
                    >
                        <AntDesign
                            name="closecircleo"
                            size={20}
                            color="black"
                        />
                    </Pressable>
                </View>
                <ScrollView className="max-h-[40.5vh] mx-[5vw] mb-[2.5vh]">
                    <Text className="text-base">
                        {healthEducationInfo.description}
                    </Text>
                </ScrollView>
            </View>
        </Modal>
    )
}
