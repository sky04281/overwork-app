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
    infoModalVisible,
    setInfoModalVisible,
}: {
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
                        <Text className="text-lg font-semibold">疾病一</Text>
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ut temporibus perferendis explicabo. Quaerat consequatur
                        nemo voluptatibus provident minus, dicta ea aperiam
                        architecto explicabo molestias maxime accusantium sunt
                        aliquid distinctio velit sit, iusto illo voluptatum aut?
                        Dolorum dolor nostrum excepturi hic maiores saepe
                        obcaecati similique praesentium repudiandae cumque harum
                        esse voluptatibus porro at, eligendi iusto tempora
                        delectus aperiam neque nesciunt quos quibusdam, placeat
                        quidem? Aspernatur perferendis saepe provident aut eum
                        totam corporis laboriosam suscipit et hic? Mollitia qui
                        harum repellendus quibusdam.
                    </Text>
                </View>
            </View>
        </Modal>
    )
}
