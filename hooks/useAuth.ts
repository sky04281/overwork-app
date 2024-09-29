import { useState, useEffect } from 'react'
import { auth } from '@/firebase/firebaseConfig'
import { User, onAuthStateChanged } from 'firebase/auth'
import { router } from 'expo-router'
import USERDATA from '@/types/userData'
import { getUserInDB } from '@/firebase/dbService'

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [userData, setUserData] = useState<USERDATA | null>(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
                router.replace('/login')
            }
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        if (user && loading === true) {
            getUserInDB(user.uid)
                .then((data) => {
                    console.log('loading', loading)
                    console.log('get user data')
                    setUserData(data)
                    setLoading(false)
                })
                .catch((error) => {
                    console.error('Error getting user data:', error.massge)
                })
        }
    }, [loading, user])
    return { user, userData, setLoading }
}

export default useAuth
