import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import news from "./Api/Api";

const Home = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getResult = async () => { // This function is responsible for calling the data from the api
    try {
      setLoading(true);
      const response = await news.getNews(); // This is an instance that is created in Api.js page
      setData(response.data.articles);    // Setting the aricles to Data
      console.log('response.data', response.data)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  };

  useEffect(() => { // useEffect calls the functions thats inside it when the page mounts
    getResult();
  }, []);  // Dependency array set to only call once

  const Category = () => {   // This function is responsible to displaying the categoies in which data will be displayed, since there is no category in the response of the api this does not result to any filteration 
    const categories = ["Healthy", "Technology", "Finance", "Arts"];
    return (
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (  // map function used to iterate over the elements inside categories array
          <TouchableOpacity key={index} style={styles.categoryPill}>
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const mainArticle = () => {  // This function returns a single article for the main cover 
    if (data.length === 0) {
      return null;
    }

    const featured = data[5]; // only the element in the 5th index position will be displayed here, this can be of any index value inside the repsonse of the api
    return (
      <View style={styles.featuredContainer}>
        <Image
          source={{ uri: featured.urlToImage }}
          style={styles.featuredImage}
          resizeMode="cover"
        />
        <View style={styles.featuredContent}>
          <Text style={styles.featuredAuthor}>by {featured.author}</Text>
          <Text style={styles.featuredTitle}>{featured.title}</Text>
          <Text style={styles.featuredDescription}>{featured.description}</Text>
        </View>
      </View>
    );
  };

  const renderArticles = ({ item }) => (
    <View style={styles.articleCard}>
      <Image
        source={{ uri: item.urlToImage }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          borderRadius: 10,
        }}
      />
      <Text style={styles.articleTitle}>{item.title}</Text>
      <View style={styles.articleFooter}>
        <Text style={styles.articleAuthor}>{item.author}</Text>
        <Text style={styles.articleDate}>
          {new Date(item.publishedAt).toLocaleDateString()}  

          {/* toLocaleDateString function is used to convert the time from the api to a date value that user can read  */}

        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Dogecoin to the Moon..."
          style={styles.searchBar}
        />
        <Image
          source={require("../assets/newicons/Notifi.png")}
          style={styles.notificationIcon}
        />
      </View>


        {/* A console error will be thrown as to indicate to not nest multiple scrollviews, this is thrown because of flatlist being present inside the scrollview, this can be avoided by rendering the whole page in flatlist. Here in our case this can be ignored as there are no scrollview that hinders our working */}
     
      <ScrollView showsVerticalScrollIndicator={false}>   
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest News</Text>
          <TouchableOpacity style={styles.seeAllContainer}>
            <Text style={styles.seeAllText}>See All</Text>
            <Image
              source={require("../assets/newicons/Arrow.png")}
              style={styles.seeAllArrow}
            />
          </TouchableOpacity>
        </View>

        {loading ? (   // A loading activity indicator is given, shows an activity indicator while data is loaded from the api
          <ActivityIndicator size="large" color="#000" />
        ) : (

            // empty conatainer tag is given here
          <>  

          {/* since the mainArticle function has a return statement it returns the view inside it, here this fucntion calls cover image of the first article and detials of it */}
            {mainArticle()} 

            {/* category will return the categories that is inside the categories array that we mentioned */}
            {Category()}

            {/* Flaslist is used to render the articles inside the reponse of the api */}
            <FlatList
              data={data}
              renderItem={renderArticles}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.articleList}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 30,
    paddingLeft: 15,
    height: 40,
    marginRight: 10,
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Merriweather",
  },
  seeAllContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    color: "#0080FF",
    marginRight: 5,
  },
  seeAllArrow: {
    width: 12,
    height: 12,
  },
  featuredContainer: {
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  featuredImage: {
    width: "100%",
    height: 200,
  },
  featuredContent: {
    padding: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  featuredAuthor: {
    color: "white",
    fontSize: 12,
    fontFamily: "MerriweatherBold",
  },
  featuredTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  featuredDescription: {
    color: "#fff",
    fontSize: 8,
    marginTop: 20,
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  categoryPill: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "lightgrey",
    marginRight: 10,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  articleList: {
    marginTop: 20,
  },
  articleCard: {
    marginVertical: 10,
    height: 128,
  },
  articleTitle: {
    fontSize: 12,
    marginBottom: 5,
    color: "white",
    padding: 10,
    fontFamily: "Merriweather",
  },
  articleFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "10%",
    paddingHorizontal: 10,
  },
  articleAuthor: {
    fontSize: 12,
    color: "white",
    fontFamily: "NunitoRegular",
  },
  articleDate: {
    fontSize: 12,
    color: "white",
    fontFamily: "NunitoRegular",
  },
});
