import BASICINFO from '@/types/basicInfo'
import { db } from './firebaseConfig'
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
} from 'firebase/firestore'
import { USERDATA } from '@/types/userData'

const usersCollection = collection(db, 'Users')

const createUserInDB = async (uid: string, basicInfo: BASICINFO) => {
    const userData: USERDATA = {
        basicInfo: basicInfo,
        bodyInfo: [],
        overworkTable: [],
        overworkScore: {
            personal: 0,
            working: 0,
        },
    }
    return await setDoc(doc(usersCollection, uid), userData)
}

const getUserInDB = async (uid: string) => {
    const userRef = doc(usersCollection, uid)
    return await getDoc(userRef)
}

const updateBasicInfo = async (uid: string, basicInfo: BASICINFO) => {
    const userRef = doc(usersCollection, uid)
    return await setDoc(
        userRef,
        { basicInfo: { ...basicInfo } },
        { merge: true }
    )
}
export { createUserInDB }
