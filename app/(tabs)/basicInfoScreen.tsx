import {
    FlatList,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import React from 'react'
import BasicInfoField from '@/components/tabs/basicInfoField'
import FormField from '@/components/FormField'
import BirthDataPicker from '@/components/tabs/birthDataPicker'
import Header from '@/components/tabs/header'

const BasicInfoScreen = () => {
    const [form, setForm] = React.useState({
        name: '王小明',
        sex: '男',
        birthDate: '1990-01-01',
        height: '200',
        weight: '80',
        workingTime: '8',
    })
    const handleDateChange = (date: Date) => {
        setForm({
            ...form,
            birthDate: date.toLocaleDateString(),
        })
    }
    const [isEditable, setIsEditable] = React.useState(false)
    const handlePress = () => {
        if (isEditable) {
            // compare with previous form
            // if different save form
            // else do nothing
            console.log('new form', form)
        } else {
            console.log('editing')
        }
        setIsEditable(!isEditable)
    }
    return (
        <SafeAreaView className="h-full flex">
            <Header title="基本資料" />
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <View className="flex-1 justify-center">
                    <BasicInfoField
                        title="姓名"
                        value={form.name}
                        editable={isEditable}
                        onChangeText={(e) => setForm({ ...form, name: e })}
                    />
                    <BasicInfoField
                        title="生理性別"
                        value={form.sex}
                        editable={isEditable}
                        onChangeText={(e) => setForm({ ...form, sex: e })}
                    />
                    <BasicInfoField
                        title="生日"
                        value={form.birthDate}
                        editable={isEditable}
                        onChangeText={(e) => setForm({ ...form, birthDate: e })}
                    />
                    {/* <BirthDataPicker
                        value={form.birthDate}
                        editable={isEditable}
                        handleDateChange={handleDateChange}
                    /> */}
                    <BasicInfoField
                        title="身高(cm)"
                        value={form.height}
                        type="number-pad"
                        editable={isEditable}
                        onChangeText={(e) => setForm({ ...form, height: e })}
                    />
                    <BasicInfoField
                        title="體重(kg)"
                        value={form.weight}
                        type="number-pad"
                        editable={isEditable}
                        onChangeText={(e) => setForm({ ...form, weight: e })}
                    />
                    <BasicInfoField
                        title="工作時長(hr)"
                        value={form.workingTime.toString()}
                        type="number-pad"
                        editable={isEditable}
                        onChangeText={(e) =>
                            setForm({
                                ...form,
                                workingTime: e,
                            })
                        }
                    />
                    <View className="flex-row justify-center px-4">
                        <Pressable
                            className="bg-blue-400 h-10 w-1/2 mt-5 mx-auto rounded-lg flex flex-row justify-center items-center"
                            onPress={() => handlePress()}
                        >
                            <Text className="text-white">
                                {isEditable ? '儲存' : '編輯'}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BasicInfoScreen
