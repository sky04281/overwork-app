import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import BasicInfoField from '../tabs/basicInfoField'
import BODYINFO from '@/types/bodyInfo'

interface bodyInfoFormProps {
    form: BODYINFO
    setForm: React.Dispatch<React.SetStateAction<BODYINFO>>
}
const BodyInfoForm = ({ setForm, form }: bodyInfoFormProps) => {
    const formData = [
        {
            title: '身高',
            field: 'height',
            value: form.height.toString(),
        },
        {
            title: '體重',
            field: 'weight',
            value: form.weight.toString(),
        },
        {
            title: 'BMI',
            field: 'BMI',
            value: form.BMI.toString(),
        },
        {
            title: '心率',
            field: 'heartRate',
            value: form.heartRate.toString(),
        },
        {
            title: '收縮壓',
            field: 'SBP',
            value: form.SBP.toString(),
        },
        {
            title: '舒張壓',
            field: 'DBP',
            value: form.DBP.toString(),
        },
        {
            title: '血糖',
            field: 'bloodSugar',
            value: form.bloodSugar.toString(),
        },
        {
            title: '步數',
            field: 'steps',
            value: form.steps.toString(),
        },
        {
            title: '睡眠時間',
            field: 'sleepTime',
            value: form.sleepTime.toString(),
        },
    ]
    return (
        <ScrollView>
            <View>
                {formData.map((data) => {
                    return (
                        <BasicInfoField
                            title={data.title}
                            value={data.value}
                            editable={true}
                            onChangeText={(e) => {
                                setForm({
                                    ...form,
                                    [data.field]: e === '' ? 0 : parseInt(e),
                                })
                            }}
                        />
                    )
                })}
            </View>
        </ScrollView>
    )
}

export default BodyInfoForm