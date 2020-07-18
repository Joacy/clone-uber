import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';

import { getPixelSize } from '../../utils';

import Search from '../Search';
import Directions from '../Directions';

const Map = () => {
    const [initialPosition, setInicialPosition] = useState([0, 0]);
    const [destination, setDestination] = useState();

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

    function handleLocationSelected (data, { geometry }) {
        const { location: { lat: latitude, lng: longitude } } = geometry;

        setDestination({
            destination: {
                latitude,
                logitude,
                title: data.structured_formatting.main_text,
            }
        });
    }

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
                ref={el => this.mapView = el}
            >
                {destination && (
                    <Directions
                        origin={initialPosition}
                        destination={destination}
                        onReady={result => {
                            this.mapView.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                    right: getPixelSize(50),
                                    left: getPixelSize(50),
                                    top: getPixelSize(50),
                                    bottom: getPixelSize(50),
                                }
                            });
                        }}
                    />
                )}
            </MapView>

            <Search onLocationSelected={handleLocationSelected} />
        </View>
    );
}

export default Map;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    mapStyle: {
        flex: 1,
    },
});