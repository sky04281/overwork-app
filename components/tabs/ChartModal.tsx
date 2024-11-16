import useAuth from '@/hooks/useAuth'
import { AntDesign } from '@expo/vector-icons'
import {
    Dimensions,
    Modal,
    View,
    Text,
    Pressable,
    ScrollView,
} from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import healthEducationInfo from '../HealthDashboard/HealthInfo'

const ChartModal = ({
    whosCall,
    chartToggle,
    setChartToggle,
}: {
    whosCall: string
    chartToggle: boolean
    setChartToggle: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const { userData } = useAuth()

    return (
        <Modal visible={chartToggle} transparent={true} animationType="slide">
            <View className="w-[90vw] mx-[5vw] mt-[30vh] rounded-[15px] bg-white">
                <View className="flex flex-row justify-between items-center mx-[5vw] my-[1.5vh]">
                    <View>
                        <Text className="text-lg font-semibold">
                            Trend chart
                        </Text>
                    </View>
                    <Pressable
                        onPress={() => {
                            setChartToggle(false)
                        }}
                    >
                        <AntDesign
                            name="closecircleo"
                            size={20}
                            color="black"
                        />
                    </Pressable>
                </View>
                <View className="max-h-[40.5vh] mt-[2.5vh] mb-[2.5vh]">
                    <View>
                        <LineChart
                            data={{
                                labels: [
                                    '9/1',
                                    '9/2',
                                    '9/3',
                                    '9/4',
                                    '9/5',
                                    '9/6',
                                ],
                                datasets: [
                                    {
                                        data: [60, 40, 60, 80, 60],
                                    },
                                ],
                            }}
                            width={Dimensions.get('window').width * 0.85} // from react-native
                            height={200}
                            yAxisLabel=""
                            yAxisSuffix=""
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: 'rgba(255, 255, 255, 0)',
                                backgroundGradientFrom:
                                    'rgba(255, 255, 255, 0)',
                                backgroundGradientTo: 'rgba(255, 255, 255, 0)',
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) =>
                                    `rgba(0, 0, 0, ${opacity})`,
                                labelColor: (opacity = 1) =>
                                    `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                                propsForDots: {
                                    r: '6',
                                    strokeWidth: '2',
                                    stroke: 'rgb(0, 0, 0)',
                                },
                            }}
                            style={{
                                borderRadius: 8,
                            }}
                            bezier
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ChartModal
