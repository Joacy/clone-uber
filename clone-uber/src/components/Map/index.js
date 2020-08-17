import React, { useState, useEffect, Fragment } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';

import { getPixelSize } from '../../utils';

import Search from '../Search';
import Directions from '../Directions';
import Details from '../Details';

import markerImage from '../../assets/marker.png';
import backImage from "../../assets/back.png";

import {
    Back,
    LocationBox,
    LocationText,
    LocationTimeBox,
    LocationTimeText,
    LocationTimeTextSmall
} from "./styles";

Geocoder.init('AIzaSyB1O8amubeMkw_7ok2jUhtVj9IkME9K8sc');

const Map = () => {
    const [initialPosition, setInicialPosition] = useState([0, 0]);
    const [destination, setDestination] = useState();
    const [duration, setDuration] = useState();
    const [location, setLocation] = useState();

    async function loadPosition () {
        const { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Ooops...', 'Precisamos de sua permissão para obter a localização');
        }

        const location = await Location.getCurrentPositionAsync();

        const { latitude, longitude } = location.coords;

        const response = await Geocoder.from({ latitude, longitude });
        const address = response.results[0].formatted_address;
        const loc = address.substring(0, address.indexOf(','));

        setLocation(loc);
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

    function handleBack () {
        setDestination(null);
    };

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
                    <Fragment>
                        <Directions
                            origin={initialPosition}
                            destination={destination}
                            onReady={result => {
                                setDuration(Math.floor(result.duration));

                                this.mapView.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: getPixelSize(50),
                                        left: getPixelSize(50),
                                        top: getPixelSize(50),
                                        bottom: getPixelSize(350),
                                    }
                                });
                            }}
                        />

                        <Marker
                            coordinate={destination}
                            anchor={{ x: 0, y: 0 }}
                            image={markerImage}
                        >
                            <LocationBox>
                                <LocationText>
                                    {destination.title}
                                </LocationText>
                            </LocationBox>
                        </Marker>

                        <Marker
                            coordinate={region}
                            anchor={{ x: 0, y: 0 }}
                        >
                            <LocationBox>
                                <LocationTimeBox>
                                    <LocationTimeText>
                                        {duration}
                                    </LocationTimeText>
                                    <LocationTimeTextSmall>
                                        MIN
                                    </LocationTimeTextSmall>
                                </LocationTimeBox>

                                <LocationText>
                                    {location}
                                </LocationText>
                            </LocationBox>
                        </Marker>
                    </Fragment>
                )}
            </MapView>

            {destination ? (
                <Fragment>
                    <Back onPress={handleBack}>
                        <Image source={backImage} />
                    </Back>
                    <Details />
                </Fragment>
            ) : (
                    <Search onLocationSelected={handleLocationSelected} />
                )}
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