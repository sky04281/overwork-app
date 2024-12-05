import { View } from 'react-native'
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
            unit: 'cm',
            type: 'number-pad',
        },
        {
            title: 'Weight',
            field: 'weight',
            value: form.weight.toString(),
            unit: 'kg',
            type: 'number-pad',
        },
        {
            title: 'BMI',
            field: 'BMI',
            value: form.BMI.toString(),
            unit: 'kg/m²',
            type: 'number-pad',
        },
        {
            title: 'Heart Rate',
            field: 'heartRate',
            value: form.heartRate.toString(),
            unit: 'bpm',
            type: 'number-pad',
        },
        {
            title: 'Systolic BP',
            field: 'SBP',
            value: form.SBP.toString(),
            unit: 'mmHg',
            type: 'number-pad',
        },
        {
            title: 'Diastolic BP',
            field: 'DBP',
            value: form.DBP.toString(),
            unit: 'mmHg',
            type: 'number-pad',
        },
        {
            title: 'Blood Sugar',
            field: 'bloodSugar',
            value: form.bloodSugar.toString(),
            unit: 'mg/dL',
            type: 'number-pad',
        },
        {
            title: 'Steps',
            field: 'steps',
            value: form.steps.toString(),
            unit: 'steps',
            type: 'number-pad',
        },
        {
            title: 'Sleep Time',
            field: 'sleepTime',
            value: form.sleepTime.toString(),
            unit: 'hours',
            type: 'number-pad',
        },
    ]

    const BMI = form.weight / (form.height / 100) ** 2
    const roundedBMI = Math.round(BMI * 100) / 100

    useEffect(() => {
        setForm({
            ...form,
            BMI:
                Math.round((form.weight / (form.height / 100) ** 2) * 100) /
                100,
        })
    }, [])
    return (
        <View className="p-4">
            {formData.map((data, index) => (
                <BasicInfoField
                    key={index}
                    title={data.title}
                    value={
                        data.title === 'BMI' ? String(roundedBMI) : data.value
                    }
                    unit={data.unit}
                    type={data.type as 'number-pad' | 'default'}
                    editable={data.title !== 'BMI'}
                    containerStyle="bg-white rounded-xl shadow-sm border border-gray-200 mb-4"
                    placeholder={`Enter ${data.title.toLowerCase()}`}
                    onChangeText={(e) => {
                        setForm({
                            ...form,
                            [data.field]: e === '' ? 0 : parseFloat(e),
                        })
                    }}
                />
            ))}
        </View>
    )
}

export default BodyInfoForm
