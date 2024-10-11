import { getUserInDB } from '@/firebase/dbService'
import { auth } from '@/firebase/firebaseConfig'
import USERDATA from '@/types/userData'
import { router } from 'expo-router'
import { User, onAuthStateChanged } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { ReactNode } from 'react'

interface AuthContextType {
    user: User | null
    userData: USERDATA | null
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    userData: null,
    setLoading: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
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
    return (
        <AuthContext.Provider value={{ user, userData, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
