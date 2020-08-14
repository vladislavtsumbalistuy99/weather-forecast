import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  Image,
} from "react-native";
import { SearchBar } from "react-native-elements";

export default class SearchScreen extends React.Component {
  state = {
    search: "Kyiv",
    weatherData: {},
    isLoading: false,
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  findWeatherByCity = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.search}&units=metric&appid=58b66cb70dfeac80dadc9137bcae1c24`,
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
          weatherData: responseJson,
          isLoading: true,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const { search } = this.state;
    return (
      <View>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
          searchIcon={null}
          platform={"android"}
        />
        <Button title="Search" onPress={this.findWeatherByCity} />

        {this.state.isLoading
          ? this.state.weatherData.list.map((data, index) => {
              return (
                <View style={styles.container}>
                  <View>
                    <Text style={styles.text}>Weather in {index + 1} day:</Text>
                    <Text style={styles.text} key={index}>
                      {Math.round(data.main.temp)} degrees Celsius
                    </Text>
                  </View>
                  <Image
                    style={styles.tinyLogo}
                    source={require("../../assets/Sunny.png")}
                  />
                </View>
              );
            })
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00bfff",
    marginTop: 10,
    fontSize: 24,
    height: 61,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  text: {
    color: "#ffff",
    margin: 7,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
