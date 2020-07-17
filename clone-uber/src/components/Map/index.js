import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';

const Map = () => {
    const [initialPosition, setInicialPosition] = useState([0, 0]);

    async function loadPosition () {
        const { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Ooops...', 'Precisamos de sua permissão para obter a localização');
        }

        const location = await Location.getCurrentPositionAsync();

        const { latitude, longitude } = location.coords;
        
        setInicialPosition([latitude, longitude]);
    }

    useEffect(() => {
        loadPosition();
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                region={{
                    latitude: initialPosition[0],
                    longitude: initialPosition[1],
                    latitudeDelta: 0.014,
                    longitudeDelta: 0.014,
                }}
                showsUserLocation
                loadingEnabled
            />
        </View>
    );
}

export default Map;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});