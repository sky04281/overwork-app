import { auth } from './firebaseConfig'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signOut,
} from 'firebase/auth'

// 第三方登入
const googleAuthProvider = new GoogleAuthProvider()

// TODO 信箱註冊
/**
 * sing up with email and password
 *
 * @param email
 * @param password
 */
const signUp = async (email: string, password: string) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password).then(
            (userCredential) => {
                const user = userCredential.user
            }
        )
    } catch (e) {
        console.log(e)
    }
}

// TODO 信箱登入
const logIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential
        })
        .catch((e) => {
            console.log(e)
        })
}

const logOut = async () => {
    await signOut(auth)
}

export { signUp, logIn, logOut }
