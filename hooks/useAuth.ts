import { useState, useEffect } from 'react'
import { auth } from '@/firebase/firebaseConfig'
import { User, onAuthStateChanged } from 'firebase/auth'
import { router } from 'expo-router'
import USERDATA from '@/types/userData'
import { getUserInDB } from '@/firebase/dbService'

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [userData, setUserData] = useState<USERDATA | null>(null)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                getUserInDB(user.uid)
                    .then((data) => {
                        setUserData(data)
                    })
                    .catch((error) => {
                        console.error('Error getting user data:', error.massge)
                    })
            } else {
                setUser(null)
                router.replace('/login')
            }
        })
        return unsubscribe
    }, [])
    return { user, userData }
}

export default useAuth
