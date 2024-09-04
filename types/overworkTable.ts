interface OVERWORKTABLE {
    createDate: string
    question: string
    answer: [string]
}

interface OVERWORKSCORE {
    personal: number
    working: number
}

export { OVERWORKTABLE, OVERWORKSCORE }
