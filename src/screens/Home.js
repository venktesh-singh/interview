import axios from 'axios';
import React, { useEffect,useState,useRef } from "react";
import { View, StyleSheet, ScrollView, FlatList, Text, TouchableOpacity,PermissionsAndroid } from 'react-native';
import Header from "../components/Header";
import {baseUrl, getHeaders} from '../../src/constants';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';


const Home = () => { 
    const navigation = useNavigation(); 
    const mapRef = useRef(null);
    const [landing, setLanding] = useState();   
   
    useEffect(() => {
        (async () => {
          try {
            const response = await axios({         
              method: 'get',
              url: `${baseUrl}/truck/getall`,    
              headers: await getHeaders(),
            });   
            if (response) { 
                setLanding(response?.data?.data);
            }
          } catch (error) {   
            console.error(error);
          }     
        })();
    }, []);    


    const ListHeaderItem = () => {    
        return (
        <>
            <View style={{
                paddingLeft: 15, 
                paddingRight: 15,   
                }}>  
                <View
                    style={{
                    backgroundColor: '#FF7133',
                    marginVertical: 8,
                    padding: 18,
                    borderRadius: 20,
                    }}
                >
                    <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                    >
                    
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Text
                                style={{
                                fontWeight: '900',
                                fontSize: 16,
                                fontStyle: 'bold',
                                color: '#fff',
                                marginHorizontal: 4,
                                marginRight: 10,
                                }}
                            >
                                {'S.No.'}
                            </Text>
                        </View>

                        <View
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Text
                                style={{
                                fontWeight: '900',
                                fontSize: 16,
                                fontStyle: 'bold',
                                color: '#fff',
                                marginHorizontal: 4,
                                marginRight: 10,
                                }}
                            >
                                {'Product Name'}
                            </Text>
                        </View>

                        <View
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                        >
                        <Text
                            style={{
                            fontWeight: '900',
                            fontSize: 16,
                            fontStyle: 'bold',
                            color: '#fff',
                            marginHorizontal: 4,
                            marginRight: 10,
                            }}
                        >
                            {'Status'}
                        </Text>
                        </View>

                    </ScrollView>
                    </View>  
                </View>
            </View>   
        </>     
        );  
    };

    
    const renderItem = ({ item, index }) => {     
        return (
            <View style={{
                paddingLeft: 15, 
                paddingRight: 15, 
                }}>
                <View
                    style={{
                    backgroundColor: '#D3D3D3',
                    marginVertical: 5,
                    padding: 15,
                    borderRadius: 20,
                    }}
                >

                    <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                    >
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                        >
                        <Text
                            style={{
                            fontWeight: '600',
                            fontSize: 14,
                            fontStyle: 'normal',
                            color: '#000',
                            marginHorizontal: 4,
                            marginRight: 10,
                            }}
                        >
                            {index + 1}
                        </Text>
                        </View>

                        <View
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                        >
                        <Text
                            style={{
                            fontWeight: '600',
                            fontSize: 14,
                            fontStyle: 'normal',
                            color: '#000',
                            marginHorizontal: 4,
                            marginRight: 10,
                            }}
                        >
                            {item?.name}
                        </Text>
                        </View>

                        <View
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                        >
                        <Text
                            style={{
                            fontWeight: '600',
                            fontSize: 14,
                            fontStyle: 'normal',
                            color: '#000',
                            marginHorizontal: 4,
                            marginRight: 10,
                            }}
                        >
                            { landing?.approved === true ? "Approved" : "Pending"}
                        </Text>
                        </View>

                    </ScrollView>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                        onPress={() =>
                            navigation.navigate({
                            name: 'Product Info',
                            params: { post: item },
                            })
                        }
                        >
                        <Feather
                            name="eye"
                            size={20}
                            color={'#000'}   
                            style={{ marginRight: 10, marginTop: 8 }}
                        />
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </View>
        );      
    };   

    
    return (  
        <>
            <Header title="Home"/>
                
            <FlatList
                data={landing?.approved}
                renderItem={renderItem}         
                ListHeaderComponent={ListHeaderItem}    
            />
            <Footer title="footer" />
        </>
    )   
    
};  

export default Home;

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        alignSelf: 'center',
        overflow: 'hidden',
    },
    map: {
        flex: 1,
        borderRadius: 10,
    },
    rangeText: {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 17,
        width:'100%',
        paddingLeft:10,
        paddingRight:5  
    },
      
 })