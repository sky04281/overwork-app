import { Tabs } from 'expo-router'
import React from 'react'

import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

export default function TabLayout() {
    const colorScheme = useColorScheme()

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors['light'].tint,
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: '健康儀表板',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'home' : 'home-outline'}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="overWorkTableScreen"
                options={{
                    title: '過負荷量表',
                }}
            />
            <Tabs.Screen
                name="bodyInfoScreen"
                options={{
                    title: '生理資訊',
                }}
            />
            <Tabs.Screen
                name="basicInfoScreen"
                options={{
                    title: '基本資料',
                }}
            />
        </Tabs>
    )
}
