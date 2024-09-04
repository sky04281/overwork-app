interface HEALTHINFO {
    title: string
    content: string
}

interface HEALTHINFOLIST {
    // 要有一個判斷類型的欄位
    healthInfoList: HEALTHINFO[]
}
