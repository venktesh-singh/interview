import React, {useState, useEffect, useRef} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FAIcon from 'react-native-vector-icons/dist/FontAwesome';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as truckActions from '../redux/actions/truck-actions';
import {
  Block,
  Checkbox,
  theme,
  Button,
  Input,
  Radio,
  Toast,
  Text,
  Card,
} from 'galio-framework';
import {Images, argonTheme} from '../constants';
import RNPickerSelect from 'react-native-picker-select';
import {launchImageLibrary} from 'react-native-image-picker';

let {height, width} = Dimensions.get('window');

const CustomModal = ({
  modalVisible,
  hideModal,
  truck_id,
  truckActions,
  categories,
}) => {
  // console.log("truck_id in Modal===>", truck_id)
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [soldCount, setSoldCount] = useState('');
  const [category, setCategory] = useState();
  const [available, setAvailable] = useState(true);
  const [toastInfo, setToastInfo] = useState({color: '', message: ''});
  const [isShow, setShow] = useState(false);
  const [foodImgSource, setFoodImgSource] = useState(null);
  const [photo, setPhoto] = useState(null);
  const selectPlaceholder = {
    label: 'Choose a category...',
    value: null,
    color: argonTheme.COLORS.PRIMARY,
  };
  useEffect(() => {
    truckActions.getCategories();
  }, []);

  const categoryList = () => {
    let categoryArray =
      categories &&
      categories.map(el => {
        return {
          label: el.name,
          value: el.id,
        };
      });
    return categoryArray || [];
  };

  const handleToast = (message, color) => {
    setShow(true);
    setToastInfo({message, color});
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  const clearForm = () => {
    setCost('');
    setName('');
    setCategory('');
    setSoldCount('');
    setFoodImgSource(null);
  };

  const imageSelect = imageType => {
    launchImageLibrary(
      {
        title: 'You can choose one image',
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 200,
        maxWidth: 200,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled photo picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          let source = {uri: response?.uri};
          setFoodImgSource(source?.uri);
          setPhoto(response.base64);
        }
      },
    );
  };

  const addFoodItem = () => {
    if (!name || !cost || !category || !soldCount) {
      handleToast('Please fill all the required details', 'warning');
      return;
    }
    let foodData = {
      name: name,
      cost: cost,
      soldCount: soldCount,
      available: available,
      truck_id: truck_id,
      photo: photo,
      category_id: category,
    };
    // console.log("===>fooddata", typeof cost)
    truckActions.addFoodItem(foodData, data => {
      if (data !== 'error') {
        handleToast('The food item was added successfully!', 'success');
        clearForm();
      } else {
        handleToast('The food item was not added. Try again later', 'error');
        return;
      }
    });
  };

  return (
    <Block style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          hideModal();
        }}>
        <Block flex style={styles.modalView}>
          <Block row space="between" style={styles.header}>
            <Text bold size={20} color={argonTheme.COLORS.WHITE}>
              Add a food item
            </Text>
            <TouchableOpacity onPress={() => hideModal()}>
              <Text>
                <FAIcon
                  name="close"
                  size={25}
                  color={argonTheme.COLORS.WHITE}
                />
              </Text>
            </TouchableOpacity>
          </Block>
          <Block flex={0.5} style={{marginTop: height * 0.095}}>
            <Block
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <Block width={width * 0.5}>
                <Input
                  border
                  placeholder="Food Item Name"
                  placeholderTextColor={argonTheme.COLORS.PRIMARY}
                  color={argonTheme.COLORS.BLACK}
                  value={name}
                  onChangeText={text => setName(text)}
                />
              </Block>
              <Block width={width * 0.4}>
                <Input
                  border
                  placeholder="Cost"
                  keyboardType="numeric"
                  placeholderTextColor={argonTheme.COLORS.PRIMARY}
                  color={argonTheme.COLORS.BLACK}
                  value={cost}
                  onChangeText={text => setCost(text)}
                />
              </Block>
            </Block>
            <Block
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <Block width={width * 0.5}>
                <RNPickerSelect
                  style={pickerSelectStyles}
                  useNativeAndroidPickerStyle={false}
                  placeholder={selectPlaceholder}
                  value={category}
                  onValueChange={value => setCategory(value)}
                  items={categoryList()}
                />
              </Block>
              <Block width={width * 0.4}>
                <Input
                  border
                  placeholder="Sold Count"
                  keyboardType="numeric"
                  placeholderTextColor={argonTheme.COLORS.PRIMARY}
                  color={argonTheme.COLORS.BLACK}
                  value={soldCount}
                  onChangeText={text => setSoldCount(text)}
                />
              </Block>
            </Block>
            <Block center>
              <Button
                color={argonTheme.COLORS.SECONDARY}
                onPress={() => imageSelect()}>
                <Text bold color={argonTheme.COLORS.PRIMARY}>
                  {foodImgSource === null
                    ? 'Pick an image'
                    : 'Choose another image'}
                </Text>
              </Button>
              {foodImgSource === null ? null : (
                <Block row>
                  <Image
                    source={{uri: foodImgSource}}
                    style={styles.imageBox}
                    resizeMode="contain"
                  />
                  <TouchableOpacity
                    onPress={() => setFoodImgSource(null)}
                    style={{
                      position: 'absolute',
                      left: width - 242,
                      elevation: 5,
                      backgroundColor: '#EEEEEE',
                    }}>
                    <FAIcon
                      name="close"
                      size={30}
                      color={argonTheme.COLORS.MUTED}
                    />
                  </TouchableOpacity>
                </Block>
              )}
            </Block>
            <Block row center style={{marginTop: 20, marginBottom: 20}}>
              <TouchableOpacity onPress={() => setAvailable(!available)}>
                <Text>
                  {available ? (
                    <FAIcon
                      size={20}
                      name="check-square-o"
                      color={argonTheme.COLORS.PRIMARY}
                    />
                  ) : (
                    <FAIcon
                      size={20}
                      name="square-o"
                      color={argonTheme.COLORS.PRIMARY}
                    />
                  )}
                </Text>
              </TouchableOpacity>
              <Text bold size={18} color={argonTheme.COLORS.PRIMARY}>
                {available ? ' Available' : ' Not Available'}
              </Text>
            </Block>

            <Block row center>
              <Button onPress={() => addFoodItem()}>
                <Text bold size={20} color={argonTheme.COLORS.WHITE}>
                  {' '}
                  Add{' '}
                  <FAIcon
                    name="plus"
                    size={20}
                    color={argonTheme.COLORS.WHITE}
                  />
                </Text>
              </Button>
            </Block>
          </Block>
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
      </Modal>
    </Block>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: argonTheme.COLORS.WHITE,
  },
  modalView: {
    flex: 1,
    backgroundColor: argonTheme.COLORS.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    backgroundColor: argonTheme.COLORS.PRIMARY,
    height: height * 0.1,
    alignItems: 'center',
    padding: 15,
  },
  toast: {
    position: 'absolute',
    top: 65,
  },
  imageBox: {
    marginLeft: 0,
    width: 200,
    height: 200,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: argonTheme.COLORS.BORDER_COLOR,
    borderRadius: 8,
    color: argonTheme.COLORS.BLACK,
    marginLeft: 4,
    paddingLeft: 15,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
function mapStateToProps(state, props) {
  return {
    categories: state.truckReducer.categories,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    truckActions: bindActionCreators(truckActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomModal);
