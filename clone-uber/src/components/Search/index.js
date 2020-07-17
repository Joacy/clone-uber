import React from 'react';
import { Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Search = (props) => {
    const { onLocationSelected } = props;

    return (
        <GooglePlacesAutocomplete
            placeholder="Qual o destino?"
            placeholderTextColor="#333"
            onPress={onLocationSelected}
            query={{
                key: "AIzaSyB1O8amubeMkw_7ok2jUhtVj9IkME9K8sc",
                language: "pt"
            }}
            textInputProps={{
                autoCapitalize: "none",
                autoCorrect: false
            }}
            fetchDetails
            enablePoweredByContainer={false}
            styles={{
                container: {
                    position: 'absolute',
                    top: Platform.select({ ios: 60, android: 40 }),
                    width: '100%',
                },
                textInputContainer: {
                    flex: 1,
                    backgroundColor: 'transparent',
                    height: 54,
                    marginHorizontal: 20,
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                },
                textInput: {
                    height: 54,
                    margin: 0,
                    borderRadius: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingLeft: 20,
                    paddingRight: 20,
                    marginTop: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowOffset: { x: 0, y: 0 },
                    shadowRadius: 15,
                    borderWidth: 1,
                    borderColor: '#ddd',
                    fontSize: 18,
                },
                listView: {
                    borderWidth: 1,
                    borderColor: '#ddd',
                    backgroundColor: '#fff',
                    marginHorizontal: 20,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowOffset: { x: 0, y: 0 },
                    shadowRadius: 15,
                    marginTop: 10,
                },
                description: {
                    fontSize: 16,
                },
                row: {
                    padding: 20,
                    height: 58,
                },
            }}
        />
    );
}

export default Search;