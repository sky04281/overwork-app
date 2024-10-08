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
const signUp = async (email: string, password: string, name: string) => {
    return await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential: UserCredential) => {
            updateProfile(userCredential.user, {
                displayName: name,
            })
            return userCredential
        }
    )
}

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
