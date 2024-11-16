import useAuth from '@/hooks/useAuth'
import BODYINFO from '@/types/bodyInfo'
import { AntDesign } from '@expo/vector-icons'
import { useState, useEffect } from 'react'
import {
    Modal,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    Animated,
} from 'react-native'
import { LineChart } from 'react-native-gifted-charts'

interface ChartData {
    value: number
    date: string
    label: string
}

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
    const [isLandscape, setIsLandscape] = useState(false)
    const [chartData1, setChartData1] = useState<ChartData[]>([])
    const [chartData2, setChartData2] = useState<ChartData[]>([])
    const [fadeAnim] = useState(new Animated.Value(0))

    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height

    useEffect(() => {
        if (userData) {
            const recentData =
                whosCall === 'workTable'
                    ? userData.overworkScore?.slice(-6)
                    : userData.bodyInfo?.slice(-6)

            if (recentData) {
                if (whosCall === 'workTable') {
                    const personal = recentData.map((score) => ({
                        value: (score as any).personal,
                        date: score.createDate.split('-').slice(1).join('/'),
                        label: score.createDate.split('-').slice(1).join('/'),
                    }))

                    const working = recentData.map((score) => ({
                        value: (score as any).working,
                        date: score.createDate.split('-').slice(1).join('/'),
                        label: score.createDate.split('-').slice(1).join('/'),
                    }))

                    setChartData1(personal)
                    setChartData2(working)
                } else {
                    // 身體資訊的圖表數據
                    const heartRate = recentData.map((info) => ({
                        value: (info as BODYINFO).heartRate,
                        date: info.createDate.split('-').slice(1).join('/'),
                        label: info.createDate.split('-').slice(1).join('/'),
                    }))

                    const bloodPressure = recentData.map((info) => ({
                        value: (info as BODYINFO).SBP, // 或其他你想要顯示的數據
                        date: info.createDate.split('-').slice(1).join('/'),
                        label: info.createDate.split('-').slice(1).join('/'),
                    }))

                    setChartData1(heartRate)
                    setChartData2(bloodPressure)
                }
            }
        }
    }, [userData, whosCall])

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: chartToggle ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start()
    }, [chartToggle])

    const getChartDimensions = () => {
        const horizontalPadding = 60
        const verticalPadding = 40

        if (isLandscape) {
            return {
                width: screenHeight * 0.8 - horizontalPadding,
                height: screenWidth * 0.6 - verticalPadding,
                spacing: 60,
                initialSpacing: 40,
                endSpacing: 40,
            }
        }
        return {
            width: screenWidth * 0.8 - horizontalPadding,
            height: screenHeight * 0.25 - verticalPadding,
            spacing: 50,
            initialSpacing: 40,
            endSpacing: 40,
        }
    }

    const dimensions = getChartDimensions()

    return (
        <Modal visible={chartToggle} transparent={true} animationType="none">
            <Animated.View
                className="flex-1 justify-center items-center"
                style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    opacity: fadeAnim,
                }}
            >
                <View
                    className={`bg-white rounded-xl p-4 ${
                        isLandscape ? 'rotate-90' : ''
                    }`}
                    style={[
                        isLandscape && {
                            width: screenHeight * 0.9,
                            height: screenWidth * 0.85,
                        },
                        !isLandscape && {
                            width: '90%',
                            maxHeight: '80%',
                        },
                    ]}
                >
                    {/* Header */}
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-xl font-semibold">
                            Trend Analysis
                        </Text>
                        <View className="flex-row items-center gap-4">
                            <TouchableOpacity
                                onPress={() => setIsLandscape(!isLandscape)}
                            >
                                <AntDesign
                                    name={isLandscape ? 'shrink' : 'arrowsalt'}
                                    size={24}
                                    color="black"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsLandscape(false)
                                    setChartToggle(false)
                                }}
                            >
                                <AntDesign
                                    name="closecircle"
                                    size={24}
                                    color="black"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Chart */}
                    <View
                        style={{
                            width: dimensions.width,
                            height: dimensions.height,
                        }}
                        className="items-center"
                    >
                        <LineChart
                            data={chartData1}
                            data2={chartData2}
                            height={dimensions.height}
                            width={dimensions.width}
                            spacing={dimensions.spacing}
                            initialSpacing={dimensions.initialSpacing}
                            endSpacing={dimensions.endSpacing}
                            color1="#3B82F6"
                            color2="#10B981"
                            textColor1="gray"
                            hideDataPoints={false}
                            dataPointsColor1="#3B82F6"
                            dataPointsColor2="#10B981"
                            startFillColor1="#3B82F6"
                            startFillColor2="#10B981"
                            endFillColor1="#3B82F620"
                            endFillColor2="#10B98120"
                            startOpacity={0.9}
                            endOpacity={0.2}
                            curved
                            xAxisLabelTextStyle={{
                                width: isLandscape ? 50 : 60,
                                fontSize: 10,
                                rotation: isLandscape ? 30 : 45,
                                marginRight: 10,
                            }}
                            hideRules
                            yAxisTextStyle={{ fontSize: 10 }}
                            maxValue={100}
                            noOfSections={5}
                            rulesColor="lightgray"
                            yAxisColor="lightgray"
                            xAxisColor="lightgray"
                            pointerConfig={{
                                pointerStripHeight: dimensions.height,
                                pointerStripColor: 'lightgray',
                                pointerStripWidth: 2,
                                pointerColor: 'gray',
                                radius: 6,
                                pointerLabelWidth: 100,
                                pointerLabelHeight: 90,
                                activatePointersOnLongPress: true,
                                autoAdjustPointerLabelPosition: true,
                                pointerLabelComponent: (items: any) => {
                                    return (
                                        <View className="bg-white p-2 rounded-lg shadow">
                                            <Text className="font-medium">
                                                Date: {items[0].date}
                                            </Text>
                                            <Text className="text-blue-500">
                                                {whosCall === 'workTable'
                                                    ? 'Personal: '
                                                    : 'Heart Rate: '}
                                                {items[0].value}
                                            </Text>
                                            {items[1] && (
                                                <Text className="text-green-500">
                                                    {whosCall === 'workTable'
                                                        ? 'Working: '
                                                        : 'Blood Pressure: '}
                                                    {items[1].value}
                                                </Text>
                                            )}
                                        </View>
                                    )
                                },
                            }}
                        />
                    </View>

                    {/* Legend */}
                    <View className="flex-row justify-center items-center gap-6 mt-4">
                        <View className="flex-row items-center">
                            <View className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                            <Text>
                                {whosCall === 'workTable'
                                    ? 'Personal Score'
                                    : 'Heart Rate'}
                            </Text>
                        </View>
                        <View className="flex-row items-center">
                            <View className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                            <Text>
                                {whosCall === 'workTable'
                                    ? 'Working Score'
                                    : 'Blood Pressure'}
                            </Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
        </Modal>
    )
}

export default ChartModal
