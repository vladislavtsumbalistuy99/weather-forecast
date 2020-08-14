import React from "react";
import { Image } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MapScreen from "../../screens/Map";
import SearchScreen from "../../screens/Search";

const Tab = createMaterialBottomTabNavigator();
export default function NavigationTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor="#e91e63"
        inactiveColor="#ffffff"
        barStyle={{ backgroundColor: "#1072e3" }}
      >
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            tabBarLabel: "Map",
            tabBarIcon: () => (
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../../assets/map.png")}
              />
            ),
          }}
        />
        <Tab.Screen name="Search" component={SearchScreen} options={{
            tabBarLabel: "Map",
            tabBarIcon: () => (
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../../assets/search.png")}
              />
            ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
