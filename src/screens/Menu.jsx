import axios from 'axios';   
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import Switch from '../components/Switch';
import { bindActionCreators } from 'redux';  
import { connect } from 'react-redux';
import * as truckActions from '../redux/actions/truck-actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { addCart } from '../redux/actions/cart-actions';
import {baseUrl, getHeaders} from '../../src/constants'; 
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';   
import { useNavigation } from '@react-navigation/native';
import {
  Block,
  Checkbox,
  theme,
  Button,
  Input,
  Radio,
  Text,
  Toast,     
  Card,     
} from 'galio-framework';
import { Images, argonTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

const Menu = (props) => {  
  const [toastInfo, setToastInfo] = useState({ color: '', message: '' });
  const [isShow, setShow] = useState(false);
  const geturldata = `${baseUrl}/cart/getbycart/${props.route?.params?.truck?.id}`;
  //console.log("Sia Get url Too",geturldata);  
  //console.log("Sia Get Too",data);   
  
  useEffect(() => {
    props.truckActions.getTruckMenu(props.route?.params?.truck?.id);
  }, []);

  useEffect(() => {
    console.log('===>secondUseeffcet');
    console.log('=====>CART', props.route?.params?.truck?.photo);  
  }, []);

  const handleToast = (message, color) => {
    setShow(true);
    setToastInfo({ message, color });
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

    
  const [cost, setCost] = useState('');
  const [name, setName] = useState('');
  const [ratings, setRatings] = useState('');
  const [review, setReview] = useState('');
  const [soldCount, setSoldCount] = useState('');
  const [quantity, setQuantity] = useState('');
  const [photo, setPhoto] = useState([]);
  
  const addToCart = (categoryId, food) => {     
    props.truckActions?.addToCart(categoryId, food);
    ///console.log("Category And ID",categoryId, food);

    const data = {
      name: name,
      cost: cost,
      soldCount: soldCount,
      ratings:ratings,
      review:review, 
      photo: props.route?.params?.truck?.photo,   
      quantity:quantity    
    };
    addCart(data);
    console.log("Post data", data)
  };

  const removeFromCart = (categoryId, food) => {
    props.truckActions?.removeFromCart(categoryId, food);
  };

    
  return (
    <>
      <Header title={props.route?.params?.truck?.name} />
      <Block flex style={{ backgroundColor: argonTheme.COLORS.PRIMARY }}>
        <ImageBackground source={Images.DefaultBg} style={{ flex: 1, zIndex: 1 }}>
          <Block style={styles.imageBlock}>
            <Image
              source={
                props.route.params?.truck?.photo
                  ? {
                    uri: `data:image/jpg;base64,${props.route?.params?.truck?.photo}`,
                  }
                  : Images.MunchezeLogo
              }
              style={styles.truckImage}
            />
            <Block>
              <FAIcon name="star" color={argonTheme.COLORS.PRIMARY} size={25} />
              <Text bold color={argonTheme.COLORS.BLACK}>
                {props.route?.params?.truck.ratings}
              </Text>
            </Block>
            <Block>
              <Ionicon
                style={{ backgroundColor: 'green' }}
                name="location-sharp"
                size={20}
                color={argonTheme.COLORS.WARNING}
              />
              <Text bold color={argonTheme.COLORS.BLACK}>
                {props.route?.params?.truck?.user_info?.addresses[0]?.city},{' '}
                {props.route?.params?.truck?.user_info?.addresses[0]?.pincode}
              </Text>
            </Block>
          </Block>

          {props.cart && props.cart.length > 0 ? (
            <Block row space="between" style={styles.cartInfo}>
              <Block>
                <Text bold color={argonTheme.COLORS.WHITE}>
                  {props.totalQuantity}{' '}
                  {props.totalQuantity > 1 ? 'Items' : 'Item'} | &#8377;{' '}
                  {props.totalCost}
                </Text>
                <Text color={argonTheme.COLORS.WHITE}>
                  From: {props.route?.params?.truck?.name}
                </Text>
              </Block>
              <Block>
                <Button
                  onPress={() => props.navigation.push('Cart')}
                  size="small"
                  color={argonTheme.COLORS.SECONDARY}>
                  <Text color={argonTheme.COLORS.PRIMARY} bold>
                    View Cart{' '}
                    <FAIcon
                      name="shopping-basket"
                      color={argonTheme.COLORS.PRIMARY}
                      size={20}
                    />
                  </Text>
                </Button>
              </Block>
            </Block>
          ) : null}
          {props.menu && props.menu.length == 0 ? (
            <Block style={styles.NoFoodBlock}>
              <Text>There are no food items in this truck.</Text>
            </Block>
          ) : (
            <Block flex style={styles.menuBlock}>
              <ScrollView>
                {props.menu &&
                  props.menu.map((category, id) => (
                    <ScrollView key={`c_${id}`}>
                      <Block style={styles.categoryHeader}>
                        <Text size={18} bold color={argonTheme.COLORS.PRIMARY}>
                          {category.name}
                        </Text>
                      </Block>
                      {category.food_info &&
                        category.food_info.map((food, idx) => (
                          <Block key={`f_${idx}`} style={styles.tableRow}>
                            <Block row center>
                              <Image
                                source={
                                  food.photo
                                    ? {
                                      uri: `data:image/jpg;base64,${food.photo}`,
                                    }
                                    : Images.MunchezeLogo
                                }
                                style={styles.foodImage}
                              />
                              <Block>
                                <Text bold size={18}>
                                  {food.name}
                                </Text>
                                <Text>&#8377; {food.cost}</Text>
                              </Block>
                            </Block>
                            {food.quantity == 0 ? (
                              <Block>
                                <Button
                                  onPress={() => {
                                    food.available
                                      ? addToCart(category.id, food)
                                      : null;
                                  }}
                                  color={
                                    food.available
                                      ? argonTheme.COLORS.PRIMARY
                                      : argonTheme.COLORS.MUTED
                                  }
                                  size="small">
                                  <Text bold color={argonTheme.COLORS.WHITE}>    
                                    ADD
                                  </Text>
                                </Button>
                              </Block>
                            ) : (
                              <Block>
                                <Button
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                  }}
                                  size="small">
                                  <TouchableOpacity
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      width: 40,
                                      justifyContent: 'center',
                                    }}
                                    onPress={() =>
                                      removeFromCart(category.id, food)
                                    }>
                                    <Text>
                                      <FAIcon
                                        name="minus"
                                        color={argonTheme.COLORS.MUTED}
                                        size={20}
                                      />
                                    </Text>
                                  </TouchableOpacity>
                                  <Text
                                    bold
                                    color={argonTheme.COLORS.WHITE}
                                    size={20}>
                                    {food.quantity}
                                  </Text>
                                  <TouchableOpacity
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      width: 40,
                                      justifyContent: 'center',
                                    }}
                                    onPress={() =>
                                      addToCart(category.id, food)
                                    }>
                                    <Text>
                                      <FAIcon
                                        name="plus"
                                        color={argonTheme.COLORS.MUTED}
                                        size={20}
                                      />
                                    </Text>
                                  </TouchableOpacity>
                                </Button>
                              </Block>
                            )}
                          </Block>
                        ))}
                    </ScrollView>
                  ))}
              </ScrollView>
            </Block>
          )}
        </ImageBackground>
        <Toast
          isShow={isShow}
          style={styles.toast}
          positionIndicator="top"
          color={toastInfo.color}>
          <Text bold size={14} color={argonTheme.COLORS.WHITE}>
            {toastInfo.message}
          </Text>
        </Toast>
      </Block>
    </>
  );
};
const styles = StyleSheet.create({
  truckImage: {
    width: 100,
    height: 100,
    position: 'relative',
    alignSelf: 'center',
    borderRadius: 50,
    margin: 10,
    borderWidth: 5,
  },
  foodImage: {
    width: 50,
    height: 50,
    position: 'relative',
    alignSelf: 'center',
    borderRadius: 50,
    margin: 10,
    borderWidth: 5,
  },
  imageBlock: {
    width: width,
    backgroundColor: argonTheme.COLORS.BLOCK,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // borderBottomLeftRadius: 10
  },
  cartInfo: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: argonTheme.COLORS.PRIMARY,
  },
  menuBlock: {
    width: width,
    backgroundColor: argonTheme.COLORS.WHITE,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 7,
  },
  NoFoodBlock: {
    backgroundColor: argonTheme.COLORS.WHITE,
    padding: 20,
    borderRadius: 20,
    flexDirection: 'column',
    height: height - 750,
    elevation: 10,
    marginTop: 10,
  },
  toast: {
    position: 'absolute',
    top: 0,
  },
  tableContainer: {
    flex: 1,
    padding: 18,
    paddingTop: 35,
    backgroundColor: '#ffffff',
  },
  tableHeader: {
    marginTop: 5,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: argonTheme.COLORS.BORDER_COLOR,
    marginBottom: 3,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    borderBottomColor: argonTheme.COLORS.BORDER_COLOR,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: argonTheme.COLORS.WHITE,
  },
  TableText: {
    margin: 10,
  },
  tableData: {
    height: height - 500,
  },
  categoryHeader: {
    backgroundColor: argonTheme.COLORS.SECONDARY,
    padding: 20,
    borderRadius: 10,
    borderTopWidth: 3,
    borderStyle: 'solid',
    borderColor: argonTheme.COLORS.SECONDARY,
    elevation: 2,
  },
});
const mapStateToProps = (state, props) => {
  // console.log('=====>>>>>MapStateCart', state.truckReducer.cart)
  // console.log('=====>>>>>MapStateMenu', state.truckReducer.menu)
  return {
    menu: state.truckReducer.menu,
    cart: state.truckReducer.cart,
    totalCost: state.truckReducer.totalCost,
    totalQuantity: state.truckReducer.totalQuantity,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    truckActions: bindActionCreators(truckActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
