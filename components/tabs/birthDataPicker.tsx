import { View, Text } from 'react-native'
import React from 'react'
import DateTimePicker, {
    DateTimePickerEvent,
} from '@react-native-community/datetimepicker'

interface BirthDataPickerProps {
    value: string
    editable?: boolean
    handleDateChange: (date: Date) => void
}

const BirthDataPicker = (props: BirthDataPickerProps) => {
    return (
        <View className="w-full my-2 px-4 flex-row justify-between items-center">
            <View className="flex-row items-center ">
                {props.editable ? (
                    <DateTimePicker
                        mode="date"
                        value={
                            new Date(props.value)
                                ? new Date(props.value)
                                : new Date()
                        }
                        display="calendar"
                        onChange={(e: DateTimePickerEvent, date?: Date) => {
                            props.handleDateChange(date!)
                        }}
                    />
                ) : (
                    <Text>{'123'}</Text>
                )}
            </View>
        </View>
    )
}

export default BirthDataPicker
