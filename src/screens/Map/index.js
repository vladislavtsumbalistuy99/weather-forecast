import React, { Component } from "react";
import { View, ScrollView, Text, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Map from '../../components/Map'

export default class MapScreen extends React.Component {
  render() {
    return (
      <View>
        <Map />
      </View>
    );
  }
}
