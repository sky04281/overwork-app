import useAuth from '@/hooks/useAuth'
import { Modal, View } from 'react-native'

const ChartModal = ({
    whosCall,
    chartToggle,
}: {
    whosCall: string
    chartToggle: boolean
}) => {
    const { userData } = useAuth()

    return (
        <Modal visible={chartToggle} transparent={true} animationType="slide">
            {whosCall === 'workTable' ? <View></View> : <View></View>}
        </Modal>
    )
}

export default ChartModal
