import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutUs = () => {
  return <>
    <Header title="Home" />
    <View style={styles.container}>
     
      {/* Description */}
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://www.kritilabs.com/kritilabs/uploads/2023/01/Oil_Gas.jpg' }}
          style={styles.image}
        />
        <Text style={styles.description}>
          Welcome to our app! We are a team of passionate developers dedicated to creating amazing
          experiences for our users. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          tristique mi eu est malesuada, non euismod neque feugiat. Sed consectetur sem id augue
          faucibus, a feugiat elit lobortis.
        </Text>
      </View>
    </View>
    <Footer title="footer" />
    </>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#007bff',
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});

export default AboutUs;
