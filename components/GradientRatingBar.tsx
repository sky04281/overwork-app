import React from 'react'
import { View, StyleSheet } from 'react-native'
import SimpleGradientProgressbarView from 'react-native-simple-gradient-progressbar-view'

const GradientRatingBar = (rating: any) => {
    // Normalize rating to range from 0 to 1
    const normalizedRating = Math.min(Math.max(rating, 0), 100) / 100

    return (
        <View style={styles.container}>
            <SimpleGradientProgressbarView
                style={styles.box}
                fromColor="#FF0000"
                toColor="#0000FF"
                progress={0.5}
                maskedCorners={[0, 0, 1, 1]}
                cornerRadius={7.0}
            />
            <SimpleGradientProgressbarView
                style={styles.box}
                fromColor="#FF0000"
                toColor="#0000FF"
                progress={0.75}
                maskedCorners={[1, 1, 1, 1]}
                cornerRadius={7.0}
            />
            <SimpleGradientProgressbarView
                style={styles.box}
                fromColor="#FF0000"
                toColor="#0000FF"
                progress={1.0}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 300,
        height: 30,
        marginVertical: 20,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 7.0,
    },
})

export default GradientRatingBar
