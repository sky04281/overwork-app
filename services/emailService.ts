import { storage } from '@/firebase/firebaseConfig'
import { getDownloadURL, ref } from 'firebase/storage'

export const sendEmailToCarer = async (
    carerEmail: string,
    name: string,
    personal: number,
    work: number,
    imgPath: string
) => {
    try {
        const url = await getDownloadURL(ref(storage, imgPath))
        const response = await fetch(
            'https://asia-east1-overwork-app.cloudfunctions.net/sendEmail',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: carerEmail,
                    subject: 'Overwork App - Personal Stress Alert',
                    text: `Dear Relative,
                    ${name} recently completed the Overwork Assessment in the Overwork App.
                    His/Her personal stress index shows potential risks. Below are the details:
                    Personal Stress Index: ${personal} (0-100)
                    Work Stress Index: ${work} (0-100)
                    Please consider reducing their life load and providing assistance.
                    
                    Sincerely,
                    The Overwork App Team`,
                    imgUrl: url,
                }),
            }
        )
        return await response.text()
    } catch (e) {
        console.error('email sending error: ', e)
    }
}

export const sendEmailToManager = async (
    managerEmail: string,
    name: string,
    personal: number,
    work: number,
    imgPath: string
) => {
    try {
        const url = await getDownloadURL(ref(storage, imgPath))
        const response = await fetch(
            'https://asia-east1-overwork-app.cloudfunctions.net/sendEmail',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: managerEmail,
                    subject: 'Overwork App - Work Stress Alert',
                    text: `Dear Manager,
                    Your employee ${name} recently completed the Overwork Assessment in the Overwork App.
                    Their work stress index shows potential risks. Below are the details:
                    Work Stress Index: ${work} (0-100)
                    Personal Stress Index: ${personal} (0-100)
                    Please consider reducing their work load and providing assistance.
                    
                    Sincerely,
                    The Overwork App Team`,
                    imgUrl: url,
                }),
            }
        )
        return await response.text()
    } catch (e) {
        console.error('email sending error: ', e)
    }
}
