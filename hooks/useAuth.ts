import { useState, useEffect } from 'react'
import { auth } from '@/firebase/firebaseConfig'
import { User, onAuthStateChanged } from 'firebase/auth'

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })
        return unsubscribe
    }, [])
    return { user }
}

export default useAuth
