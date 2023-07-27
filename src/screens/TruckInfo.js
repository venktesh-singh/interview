import React, { useEffect,useState } from "react";  
import axios from 'axios';
import { StyleSheet, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import Header from "../components/Header";
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { useNavigation } from '@react-navigation/native';
import {baseUrl, getHeaders} from '../../src/constants';  
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import Feather from 'react-native-vector-icons/Feather';        
//import moment from 'moment';    

const TructInfo = (params) => {
        
    const navigation = useNavigation(); 
    const item = params?.route?.params?.post;
    //console.log("Sia New Data Params",item.id);                
    const image = item?.photo;
    const imageUrl = `${image}`;              
    
    const [soldcount,setSoldcount] = useState();
    const id = item?.id
    console.log("Sia New Data",soldcount);   
    const totalCost = soldcount?.reduce((sum, item) => sum + item.cost, 0);  

    useEffect(() => {  
        (async () => {
          try {
            const response = await axios({      
              method: 'get',
              url: `${baseUrl}/order/getbytruck/${id}`,    
              headers: await getHeaders(),
            });   
            if (response) {  
                setSoldcount(response.data.data); 
            }
          } catch (error) {   
            console.error(error);
          }       
        })();
    }, []);

 
   return (
    <>
       
        <Header title="Product Info"/>
        <ScrollView onScroll={(event) =>
        setStickyButtonPosition(event.nativeEvent.contentOffset.y)
      }
        scrollEventThrottle={16} contentContainerStyle={{ flexGrow: 1 }} style={[styles.card, styles.elevation]}>   
        <TouchableOpacity>
            <Icon name='arrow-back' onPress={() =>  navigation.navigate("Login Landing", {name: 'Login Landing'})} size={30} color={'#000'} style={{ marginRight: 10 }} />
        </TouchableOpacity>

        <View style={styles.listbox}>  
            <View style={[styles.mainbx,styles.emailbottom]}>
            {imageUrl ? 
                <Image
                source={{ uri: imageUrl }}   
                borderRadius={100} style={{ width: 175, height: 175 }}
                resizeMode="contain"
                />
                : null    
            }

                 
                <View style={[styles.workgrp,styles.sworkgrp]}>
                    <Fontisto name="person" size={35} color="#000" />
                    <View style={styles.innertex}>
                        <Text style={styles.titletext}>Name</Text>
                        <Text style={styles.subtext}>{item?.user_info?.firstName} {item?.user_info?.lastName}</Text>
                    </View>
                </View>
                
            </View>  


            <View style={[styles.mainbx,styles.emailbottom]}>
                <View style={styles.workgrp}>
                    <FontAwesome name="drivers-license" size={35} color="#000" />
                    <View style={styles.innertexs}>
                        <Text style={styles.titletext}>License No</Text>
                        <Text style={styles.subtext}> {item?.licenseNo} </Text>    
                    </View>
                </View>
                <View style={styles.workgrp}>
                    <Fontisto name="phone" style={{paddingLeft:18}} size={35} color="#000" />
                    <View style={styles.innertex}>
                        <Text style={styles.titletext}>Phone</Text>
                        <Text style={styles.subtext}>{item?.user_info?.phoneNumber}</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.mainbx,styles.emailbottom]}>
                <View style={styles.workgrp}>
                    <Feather name="user" size={35} color="#000" />
                    <View style={styles.innertex}>
                        <Text style={styles.titletext}>Truck Name</Text>  
                        <Text style={styles.subtext}>{item?.name}</Text>
                    </View>
                </View>
                <View style={styles.workgrp}>
                    <Fontisto name="date" size={35} color="#000" />
                    <View style={styles.innertex}>
                        <Text style={styles.titletext}>Joining Date</Text>
                        <Text style={styles.subtext}>{item?.joiningDate}</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.mainbx,styles.emailbottom]}>
                <View style={styles.workgrp}>
                    <MaterialIcons name="attach-money" size={35} color="#000" />
                    <View style={styles.innertex}>
                        <Text style={styles.titletext}>Sold Amount</Text>  
                        <Text style={styles.subtext}>{totalCost}</Text>  
                    </View>
                </View>
            </View>

        </View>

    </ScrollView>
    </>
   ) 
}   
export default TructInfo;

const styles = StyleSheet.create({
    sworkgrp:{padding: 5},   
    innertexs:{   
        paddingLeft: 5  
    },
    emailbottom:{        
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 2,
        borderStyle: "dashed",
    },
    imgworkgrp: {
        width: 170, 
        height: 170
    },
    card: {
        backgroundColor: 'red',    
        padding: 10,
        margin: 0,
        flexGrow : 1,
    },
    mainHeader: {
        fontSize: 25,
        fontWeight: "500",
        color: "",
        paddingTop: 15,
        // paddingBottom: 2,
        textTransform: "capitalize",
    },
    elevation: {
        backgroundColor: '#efefef',     
        elevation: 10,
    },
    sno: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#2399c7',
        marginBottom: 6,
    },
    listbox: {
        backgroundColor: '#fff',    
        padding: 10,
        borderRadius: 7,
        marginTop: 10,
        marginBottom: 10
    },
    mainbx: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    mainbxc: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop:10,  
    }, 
    workgrp: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
    },
    innertex: {
        paddingLeft: 5,
        width: 130,
    },
    titletext: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
    subtext: {
        fontSize: 16,
        fontWeight: 'normal',
        color:'#000'
    },
    buttonin : {
        flex: 1,
        textAlign:'right',
        backgroundColor: "#24a0ed",
        width: '100%',
        height: 'auto',
        borderRadius: 3,
        marginTop: 20,
        padding:5,
    },
    buttonintxt:{
        color:'#fff',
        textTransform:'uppercase',
        fontSize: 12,
    }
})