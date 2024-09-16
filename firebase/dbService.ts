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
import BODYINFO from '@/types/bodyInfo'
import { OVERWORKSCORE, OVERWORKTABLE } from '@/types/overworkTable'

const usersCollection = collection(db, 'Users')
const serverDataCollection = collection(db, 'ServerData')

export const createUserInDB = async (uid: string, basicInfo: BASICINFO) => {
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

export const getUserInDB = async (uid: string) => {
    const userRef = doc(usersCollection, uid)
    return (await getDoc(userRef)).data() as USERDATA
}

export const updateBasicInfo = async (uid: string, basicInfo: BASICINFO) => {
    const userRef = doc(usersCollection, uid)
    return await setDoc(
        userRef,
        { basicInfo: { ...basicInfo } },
        { merge: true }
    )
}

export const updateOverworkScore = async (
    uid: string,
    overworkScore: OVERWORKSCORE
) => {
    const userRef = doc(usersCollection, uid)
    return await setDoc(
        userRef,
        { overworkScore: { ...overworkScore } },
        { merge: true }
    )
}

/**
 * Update user's bodyInfo field, add to the end of the array
 *
 * @param uid Firebase uid
 * @param bodyInfo new bodyInfo
 */
export const addBodyInfo = async (uid: string, bodyInfo: BODYINFO) => {
    const userRef = doc(usersCollection, uid)
    const userData = await getDoc(userRef)
    if (!userData.exists()) {
        throw new Error('user not found')
    }

    const currentBodyInfo = userData.data().bodyInfo as [BODYINFO]
    return await setDoc(
        userRef,
        { bodyInfo: [...currentBodyInfo, bodyInfo] },
        { merge: true }
    )
}

/**
 * Update user's overworkTable field, add to the end of the array
 *
 * @param uid Firebase uid
 * @param overworkTable new overworkTable
 */
export const addOverworkTable = async (
    uid: string,
    overworkTable: OVERWORKTABLE
) => {
    const userRef = doc(usersCollection, uid)
    const userData = await getDoc(userRef)
    if (!userData.exists()) {
        throw new Error('user not found')
    }

    const currentOverworkTable = userData.data().overworkTable as [
        OVERWORKTABLE
    ]
    return await setDoc(
        userRef,
        { overworkTable: [...currentOverworkTable, overworkTable] },
        { merge: true }
    )
}

/**
 * Get questions for overworkTable
 *
 * @returns {Promise<[string]>} A promise that resolves to an array of questions.
 * @throws {Error} If the `overworkTable` document does not exist.
 */
export const getQuestions = async () => {
    const overworkTableRef = doc(serverDataCollection, 'overworkTable')
    const overworkTableDoc = await getDoc(overworkTableRef)
    if (overworkTableDoc.exists()) {
        return overworkTableDoc.data().qeuestions as [string]
    } else {
        throw new Error('questions not found')
    }
}

/**
 * Get options of overworkTable.
 *
 * @returns {Promise<[string]>} A promise that resolves to an array of answers.
 * @throws {Error} If the `overworkTable` document does not exist.
 */
export const getAnswers = async () => {
    const overworkTableRef = doc(serverDataCollection, 'overworkTable')
    const overworkTableDoc = await getDoc(overworkTableRef)
    if (overworkTableDoc.exists()) {
        return overworkTableDoc.data().answers as [string]
    } else {
        throw new Error('answers not found')
    }
}

/**
 * Get health education information.
 *
 * @returns {Promise<HEALTHINFO>} A promise that resolves to the health education information.
 * @throws {Error} If the `healthEducationInfo` document does not exist.
 */
export const getHealthEducationInfo = async () => {
    const healthInfoRef = doc(serverDataCollection, 'healthEducationInfo')
    const healthInfoDoc = await getDoc(healthInfoRef)
    if (healthInfoDoc.exists()) {
        return healthInfoDoc.data() as HEALTHINFO
    } else {
        throw new Error('healthInfo not found')
    }
}
