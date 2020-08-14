import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 600,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: null,
      cityName: "",
      cityWeather: "",
      isLoading: false,
    };
  }

  findCityWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.marker.latitude.toFixed(
        2
      )}&lon=${this.state.marker.longitude.toFixed(
        2
      )}&units=metric&appid=58b66cb70dfeac80dadc9137bcae1c24`,
      {
        method: "GET",
        headers: {
          Accept: "aplication/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          cityName: responseJson.name,
          cityWeather: responseJson.main.temp,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          onPress={(e) => {
            this.setState({ marker: e.nativeEvent.coordinate }, () => {
              this.findCityWeather();
            });
          }}
          region={{
            latitude: 50.459609,
            longitude: 30.492841,
            latitudeDelta: 0.4,
            longitudeDelta: 0.5,
          }}
        >
          {this.state.marker && (
            <Marker coordinate={this.state.marker}
            onCalloutPress ={() => navigate('Search')}>
              <Callout>
                <Text>{this.state.cityName}</Text>
                <Text>
                  {Math.round(this.state.cityWeather)} degrees Celsius
                </Text>
              </Callout>
            </Marker>
          )}
        </MapView>
      </View>
    );
  }
}
