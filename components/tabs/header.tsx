import { View, Text } from 'react-native'
import React from 'react'

interface HeaderProps {
    title: string
    className?: string
}

const Header = ({ ...props }: HeaderProps) => {
    return (
        <View
            className={`mx-auto w-[80vw] flex-row justify-center items-center py-4  border-b-[2rem] ${props.className}`}
        >
            <Text className="text-3xl font-bold">{props.title}</Text>
        </View>
    )
}

export default Header
