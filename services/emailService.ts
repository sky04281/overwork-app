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
                    subject: '過負荷APP - 個人壓力警訊',
                    text: `親愛的照顧者：
                    ${name} 近期在過負荷APP中填寫過負荷量表
                    他的個人壓力指數有風險，以下是他的壓力指數：
                    個人壓力指數：${personal} 分 (0-100)
                    工作壓力指數：${work} 分 (0-100)
                    請適當減輕他的生活負荷，並提供協助。
                    
                    過負荷APP團隊敬上`,
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
                    subject: '過負荷APP - 工作壓力警訊',
                    text: `親愛的主管：
                    您的員工 ${name} 近期在過負荷APP中填寫過負荷量表
                    他的工作壓力指數有風險，以下是他的壓力指數：
                    工作壓力指數：${work} 分 (0-100)
                    個人壓力指數：${personal} 分 (0-100)
                    請適當減輕他的工作負荷，並提供協助。
                    
                    過負荷APP團隊敬上`,
                    imgUrl: url,
                }),
            }
        )
        return await response.text()
    } catch (e) {
        console.error('email sending error: ', e)
    }
}
