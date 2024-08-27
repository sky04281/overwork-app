import { View } from 'react-native'

export default function RatingBattery({ score }: { score: number }) {
    const colorClasses = [
        ' bg-[#52c902] ',
        ' bg-[#82e200] ',
        ' bg-[#b6f100] ',
        ' bg-[#eaff00] ',
        ' bg-[#edd305] ',
        ' bg-[#f1a00b] ',
        ' bg-[#f3870e] ',
        ' bg-[#f56a11] ',
        ' bg-[#f74d14] ',
        ' bg-[#fb2518] ',
        ' bg-[#e30019] ',
    ]

    // score 將百分制分成 1~11 ( 0~9 -> 1, 10~19 -> 2 ...) 越低越好、越低越綠、越高越紅
    const classedScore = score > 10 ? Math.floor(score / 10) + 1 : 1

    return (
        <View className="flex justify-center items-center w-[25vw]">
            <View className="flex justify-center items-center w-[21vw] p-[0.75vw] border border-dashed rounded">
                {colorClasses
                    .map((color, index) => {
                        return (
                            <View
                                key={index}
                                className={
                                    index < classedScore
                                        ? 'h-[2vh] w-[18vw] m-[0.75vw] border rounded' +
                                          color
                                        : 'h-[2vh] w-[18vw] m-[0.75vw] border rounded opacity-10' +
                                          color
                                }
                            ></View>
                        )
                    })
                    .reverse()}
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
