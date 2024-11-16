import { Redirect, Tabs } from 'expo-router'
import React, { useEffect } from 'react'

import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { Colors } from '@/constants/Colors'

import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import useAuth from '@/hooks/useAuth'

export default function TabLayout() {
    const { user, setLoading } = useAuth()
    useEffect(() => {
        if (user) {
            console.log('has user ' + user.uid)
        }
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
                    title: 'Health Dashboard',
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
                    title: 'Overwork Assessment',
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
                    title: 'Body Information',
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
                    title: 'Basic Information',
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
