import { View } from 'react-native'

export default function RatingBattery({ score }: { score: number }) {
    const colorClasses = [
        ' bg-[#ff001d] ',
        ' bg-[#fd492e] ',
        ' bg-[#fc6b25] ',
        ' bg-[#fb911c] ',
        ' bg-[#f9b712] ',
        ' bg-[#f8dd08] ',
        ' bg-[#f0f719] ',
        ' bg-[#bdff00] ',
        ' bg-[#8dff00] ',
        ' bg-[#60ff00] ',
        ' bg-[#2eff00] ',
    ]

    // score 將百分制分成 1~11 ( 0~9 -> 1, 10~19 -> 2 ...) 越低越好、越低越綠、越高越紅
    const classedScore = score > 10 ? Math.floor(score / 10) + 1 : 1

    return (
        <View className="flex justify-center items-center w-[35vw]">
            <View className="flex justify-center items-center w-[21vw] p-[0.75vw] border border-dashed rounded">
                {colorClasses.map((color, index) => {
                    return (
                        <View
                            className={
                                index + 1 < classedScore
                                    ? 'h-[2vh] w-[18vw] m-[0.75vw] border rounded opacity-35' +
                                      color
                                    : 'h-[2vh] w-[18vw] m-[0.75vw] border rounded' +
                                      color
                            }
                        ></View>
                    )
                })}
            </View>
        </View>
    )
}

{
    /* <View className="h-[2vh] w-[18vw] m-[0.75vw] border rounded bg-[#ff001d]"></View>
<View className="h-[2vh] w-[18vw] m-[0.75vw] border rounded bg-[#fd492e]"></View>
<View className="h-[2vh] w-[18vw] m-[0.75vw] border rounded bg-[#fc6b25]"></View>
<View className="h-[2vh] w-[18vw] m-[0.75vw] border rounded bg-[#fb911c]"></View>
<View className="h-[2vh] w-[18vw] m-[0.75vw] border rounded bg-[#f9b712]"></View>
<View className="h-[2vh] w-[18vw] m-[0.75vw] border rounded bg-[#f8dd08]"></View>
<View className="h-[2vh] w-[18vw] m-[0.75vw] border rounded bg-[#f0f719]"></View>
<View className="h-[2vh] w-[18vw] m-[0.75vw] border rounded bg-[#bdff00]"></View>
<View className="h-[2vh] w-[18vw] m-[0.75vw] border rounded bg-[#8dff00]"></View>
<View className="h-[2vh] w-[18vw] m-[0.75vw] border rounded bg-[#60ff00]"></View>
<View className="h-[2vh] w-[18vw] m-[0.75vw] border rounded bg-[#2eff00]"></View> */
}
