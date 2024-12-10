import React from "react";
import { Image, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Home from "./src/Home";
import Profile from "./src/Profile";
import { myTheme } from "./src/navigationcolor";
import Favs from "./src/favs";
const Tab = createBottomTabNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    NunitoRegular: require("../my-app/assets/Nunito/static/Nunito-Regular.ttf"),
    Merriweather:require("../my-app/assets/Nunito/static/Merriweather-Regular.ttf"),
    MerriweatherBold:require("../my-app/assets/Nunito/static/Merriweather-Bold.ttf")
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer theme={myTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "#262626",
          tabBarItemStyle: {
            maxWidth: "50%",
          },
          tabBarStyle: {
            position: "absolute",
            borderRadius: 50,
            backgroundColor: "white",
            marginHorizontal: "15%",
            bottom: 20,
            height: 55,
            width: "70%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 1,
            elevation: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      >
        <Tab.Screen
          options={{
            title: "Home",
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  opacity: focused ? 1 : 0.5,
                  fontSize: 12,
                  color: "#000",
                  
                }}
              >
                Home
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../my-app/assets/newicons/Home.png")
                    : require("../my-app/assets/newicons/HomNF.png")
                }
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            ),
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{
            title: "Favorite",
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  opacity: focused ? 1 : 0.5,
                  fontSize: 12,
                  color: "#000",
                  
                }}
              >
                Favorite
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../my-app/assets/newicons/FavF.png")
                    : require("../my-app/assets/newicons/FavNF.png")
                }
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            ),
          }}
          name="Favs"
          component={Favs}
        />
        <Tab.Screen
          options={{
            title: "Profile",
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  opacity: focused ? 1 : 0.5,
                  fontSize: 12,
                  color: "#000",
                  
                }}
              >
                Profile
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("../my-app/assets/newicons/ProfileF.png")
                    : require("../my-app/assets/newicons/ProfileNF.png")
                }
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            ),
          }}
          name="Profile"
          component={Profile}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
