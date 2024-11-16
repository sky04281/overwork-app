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
import BASICINFO from '@/types/basicInfo'
import BODYINFO from '@/types/bodyInfo'
import HEALTHEDUCATIONINFO from '@/types/healthEducationInfo'
import OVERWORKSCORE from '@/types/overworkScore'
import OVERWORKTABLE from '@/types/overworkTable'
import USERDATA from '@/types/userData'

const usersCollection = collection(db, 'Users')
const serverDataCollection = collection(db, 'ServerData')

export const createUserInDB = async (uid: string, basicInfo: BASICINFO) => {
    const userData: USERDATA = {
        basicInfo: basicInfo,
        bodyInfo: [],
        overworkScore: [],
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
    const existingScoreIndex = currentBodyInfo.findIndex((oldInfo) => {
        return oldInfo.createDate === bodyInfo.createDate
    })

    if (existingScoreIndex !== -1) {
        currentBodyInfo[existingScoreIndex] = bodyInfo
        console.log('body info updated')
    } else {
        currentBodyInfo.push(bodyInfo)
        console.log('body info added')
    }

    return await setDoc(userRef, { bodyInfo: currentBodyInfo }, { merge: true })
}

/**
 * Adds an overwork score to the user's existing overwork scores in the database.
 *
 * @param uid - The unique identifier of the user.
 * @param overworkScore - The overwork score to be added.
 * @throws Will throw an error if the user is not found in the database.
 * @returns A promise that resolves when the overwork score has been successfully added.
 */
export const addOverworkScore = async (
    uid: string,
    overworkScore: OVERWORKSCORE
) => {
    const userRef = doc(usersCollection, uid)
    const userData = await getDoc(userRef)
    if (!userData.exists()) {
        throw new Error('user not found')
    }

    const currentOverworkScore = userData.data()
        .overworkScore as OVERWORKSCORE[]
    const existingScoreIndex = currentOverworkScore.findIndex(
        (score) => score.createDate === overworkScore.createDate
    )

    if (existingScoreIndex !== -1) {
        currentOverworkScore[existingScoreIndex] = overworkScore
        console.log('overwork score updated')
    } else {
        currentOverworkScore.push(overworkScore)
        console.log('overwork score added')
    }

    return await setDoc(
        userRef,
        { overworkScore: currentOverworkScore },
        { merge: true }
    )
}

/**
 * Get questions and answers for the overwork table.
 *
 * @returns {Promise<OVERWORKTABLE>} A promise that resolves to the data of the overwork table document.
 * @throws {Error} If the overwork table document does not exist.
 */
export const getOverworkTable = async () => {
    const overworkTableRef = doc(serverDataCollection, 'overworkTableEng')
    const overworkTableDoc = await getDoc(overworkTableRef)
    if (!overworkTableDoc.exists()) {
        throw new Error('overworkTable not found')
    }
    return overworkTableDoc.data() as OVERWORKTABLE
}

/**
 * Fetches the health education information from the Firestore database.
 *
 * @returns {Promise<HEALTHEDUCATIONINFO>} A promise that resolves to the health education information.
 * @throws {Error} If the health education information document does not exist.
 */
export const getHealthEducationInfo = async () => {
    const healthInfoRef = doc(serverDataCollection, 'healthEducationInfo')
    const healthInfoDoc = await getDoc(healthInfoRef)
    if (healthInfoDoc.exists()) {
        return healthInfoDoc.data() as HEALTHEDUCATIONINFO
    } else {
        throw new Error('healthInfo not found')
    }
}
