import { Redirect, Tabs } from 'expo-router'
import React, { useEffect } from 'react'

import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { Colors } from '@/constants/Colors'

import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import useAuth from '@/hooks/useAuth'

export default function TabLayout() {
    const { user } = useAuth()
    useEffect(() => {
        console.log('tabs layout user: ', user)
    }, [user])
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
                    tabBarIcon: ({ color, focused }) => (
                        <FontAwesome5
                            name={focused ? 'clipboard-list' : 'clipboard-list'}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="bodyInfoScreen"
                options={{
                    title: '生理資訊',
                    tabBarIcon: ({ color, focused }) => (
                        <FontAwesome5
                            name={focused ? 'heartbeat' : 'heartbeat'}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="basicInfoScreen"
                options={{
                    title: '基本資料',
                    tabBarIcon: ({ color, focused }) => (
                        <FontAwesome5
                            name={focused ? 'user' : 'user'}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    )
}
