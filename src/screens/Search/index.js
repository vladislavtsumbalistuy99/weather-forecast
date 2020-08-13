import React, { Component } from "react";
import { View, ScrollView, Text, Button } from "react-native";
import { SearchBar } from "react-native-elements";

export default class SearchScreen extends React.Component {
  state = {
    search: "",
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
  }

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

        {this.state.isLoading ? (
          this.state.weatherData.list.map((data)=>{
            return(
              <View><Text>{data.main.temp}</Text></View>
            )
          })
        ) : (
          <Text>{this.state.search}</Text>
        )}
      </View>
    );
  }
}
