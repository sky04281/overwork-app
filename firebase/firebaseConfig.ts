import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
    apiKey: 'AIzaSyCo-Ji4l6RG1MNMgnm3aR43blAiXjbqbeE',
    authDomain: 'overwork-app.firebaseapp.com',
    projectId: 'overwork-app',
    storageBucket: 'overwork-app.appspot.com',
    messagingSenderId: '648097705858',
    appId: '1:648097705858:web:f6bcbe24dd86eecdf4299b',
}

const app = initializeApp(firebaseConfig)

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
})

const db = getFirestore(app)

export { auth, db }
