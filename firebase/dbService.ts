import BASICINFO from '@/types/basicInfo'
import { db } from './firebaseConfig'
import {
    collection,
    doc,
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
    await setDoc(doc(usersCollection, uid), userData)
}

export { createUserInDB }
