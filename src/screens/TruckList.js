import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as truckActions from '../redux/actions/truck-actions';
import {Block, Text, Toast} from 'galio-framework';
import {argonTheme} from '../constants';
import FAIcon from 'react-native-vector-icons/Fontisto';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import axios from 'axios';
import {baseUrl, getHeaders} from '../../src/constants';
const {width} = Dimensions.get('screen');

const TruckList = props => {
  // const context = useContext(UserContext);
  const [truckList, setTruckList] = useState([]);
  const [toastInfo, setToastInfo] = useState({color: '', message: ''});
  const [isShow, setShow] = useState(false);

  const getData = async () => {
    axios({
      method: 'GET',
      url: `${baseUrl}/truck/getall/customer?latitude=28.833990&longitude=78.743332&distance=200`,
      headers: await getHeaders(),
    })
      .then(response => {
        if (response) {
          setTruckList(response.data.data);
        } else {
          handleToast('Some error occurred. Try again later.', 'error');
          return;
        }
      })
      .catch(error => console.log(error));
  };
  useEffect(() => {
    getData();
  }, []);

  const handleToast = (message, color) => {
    setShow(true);
    setToastInfo({message, color});
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  return (
    <>
      <Header title="Trucks" />
      <Block flex style={{backgroundColor: '#F4F5F7'}}>
        <ScrollView>
          {truckList &&
            truckList.map((truck, id) => (
              <TouchableOpacity
                onPress={() => props.navigation.push('Menu', {truck: truck})}
                key={`t_${id}`}
                style={styles.TruckContainer}>
                <Block row>
                  <FAIcon
                    name="truck"
                    color={
                      truck.offline
                        ? argonTheme.COLORS.MUTED
                        : argonTheme.COLORS.PRIMARY
                    }
                    size={25}
                  />
                  <TouchableOpacity style={styles.truckName}>
                    <Text bold size={20}>
                      {truck.name}
                    </Text>
                  </TouchableOpacity>
                </Block>
                <Block row space="between">
                  <Block row style={{marginTop: 10}}>
                    <Ionicon
                      name="location-sharp"
                      size={20}
                      color={argonTheme.COLORS.MUTED}
                    />
                    <Text color={argonTheme.COLORS.MUTED}>
                      {/* {truck?.user_info?.addresses[0]?.city},{'Noida '}
                      {truck?.user_info?.addresses[0]?.pincode},{'201303'} */}
                      {truck?.user_info?.address}
                    </Text>
                  </Block>
                  <Block row>
                    <FAIcon
                      name="star"
                      color={argonTheme.COLORS.WARNING}
                      size={20}
                    />
                    <Text>Ratings: {truck.ratings}</Text>
                  </Block>
                </Block>
              </TouchableOpacity>
            ))}
        </ScrollView>
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
  TruckContainer: {
    padding: 20,
    width: width,
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: 'column',
    borderColor: argonTheme.COLORS.BORDER_COLOR,
  },
  truckName: {
    marginLeft: 10,
  },
  toast: {
    position: 'absolute',
    top: 0,
  },
});

// const mapStateToProps = (state, props) => {
//   // console.log('state.truck', state.truckReducer.truck_info)
//   return state;
// };
// const mapDispatchToProps = dispatch => {
//   return {
//     truckActions: bindActionCreators(truckActions, dispatch),
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(TruckList);
export default TruckList;
