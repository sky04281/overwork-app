import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import BasicInfoField from '../tabs/BasicInfoField'
import BODYINFO from '@/types/bodyInfo'

interface bodyInfoFormProps {
    form: BODYINFO
    setForm: React.Dispatch<React.SetStateAction<BODYINFO>>
}
const BodyInfoForm = ({ setForm, form }: bodyInfoFormProps) => {
    const formData = [
        {
            title: 'Height',
            field: 'height',
            value: form.height.toString(),
        },
        {
            title: 'Weight',
            field: 'weight',
            value: form.weight.toString(),
        },
        {
            title: 'BMI',
            field: 'BMI',
            value: form.BMI.toString(),
        },
        {
            title: 'Heart Rate',
            field: 'heartRate',
            value: form.heartRate.toString(),
        },
        {
            title: 'SBP',
            field: 'SBP',
            value: form.SBP.toString(),
        },
        {
            title: 'DBP',
            field: 'DBP',
            value: form.DBP.toString(),
        },
        {
            title: 'Blood Sugar',
            field: 'bloodSugar',
            value: form.bloodSugar.toString(),
        },
        {
            title: 'Steps',
            field: 'steps',
            value: form.steps.toString(),
        },
        {
            title: 'Sleep Time',
            field: 'sleepTime',
            value: form.sleepTime.toString(),
        },
    ]
    const BMI = form.weight / (form.height / 100) ** 2
    const roundedBMI = Math.round(BMI * 100) / 100
    useEffect(() => {
        setForm({ ...form, BMI: roundedBMI })
    }, [roundedBMI])
    return (
        <ScrollView>
            <View>
                {formData.map((data, index) => {
                    return (
                        <BasicInfoField
                            key={index}
                            title={data.title}
                            value={
                                data.title === 'BMI'
                                    ? String(roundedBMI)
                                    : data.value
                            }
                            editable={data.title !== 'BMI'}
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
