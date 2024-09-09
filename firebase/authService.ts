import { FirebaseError } from 'firebase/app'
import { auth } from './firebaseConfig'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signOut,
    UserCredential,
    updateProfile,
} from 'firebase/auth'

// 第三方登入
const googleAuthProvider = new GoogleAuthProvider()

/**
 * sing up with email and password
 *
 * @param email user email
 * @param password
 */
const signUp = async (
    email: string,
    password: string,
    name: string
): Promise<UserCredential> => {
    return await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential: UserCredential) => {
            updateProfile(userCredential.user, {
                displayName: name,
            })
            return new Promise((resolve) => {
                resolve(userCredential)
            })
        }
    )
}

// TODO 信箱登入
const logIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential
        })
        .catch((e) => {
            throw e
        })
}

const logOut = async () => {
    await signOut(auth)
}

export { signUp, logIn, logOut }
