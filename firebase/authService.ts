import { auth } from './firebaseConfig'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
} from 'firebase/auth'

// 第三方登入
const googleAuthProvider = new GoogleAuthProvider()

// TODO 信箱註冊
const signUp = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
        })
        .catch((e) => {
            console.log(e)
        })
}

// TODO 信箱登入
const logIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential
        })
        .catch((e) => {
            console.log(e)
        })
}
