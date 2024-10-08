import {
    StyleSheet,
    View,
    Text,
    Modal,
    Button,
    ImageBackground,
    Pressable,
    ScrollView,
} from 'react-native'
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
            <View className="h-[50vh] w-[70vw] mx-[15vw] my-[25vh] rounded-[15px] bg-white">
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
                <View className="mx-[5vw] h-[45vh]">
                    <Text className="text-base">
                        {healthEducationInfo.description}
                    </Text>
                </View>
            </View>
        </Modal>
    )
}
