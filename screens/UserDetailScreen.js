import React, { Component,useState } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text ,Alert} from 'react-native';
import { firebase } from '../database/firebaseDb';
import { ThemeProvider, Button, Input, Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import RNPickerSelect from 'react-native-picker-select';
import { CheckBox } from 'react-native-elements';

 
class UserDetailScreen extends Component{

    constructor(){
        super();

        this.state = {
            name:'',
            description:'',
            select:'',
            foodCategory:'',
            price:'',
            image:'',
            selectedValue:'',
            rawMaterial:[],
            
            
            isLoading: true
        }
    }

        componentDidMount() {
        const dbRef = firebase.firestore().collection('firebase').doc(this.props.route.params.userKey);
        dbRef.get().then((res) => {
            if (res.exists) {
                const user = res.data();
                this.setState({
                    key: res.id,
                    name: user.name,
                    description: user.description,
                    select: user.select,
                    selectedValue: user.selectedValue,
                    foodCategory: user.foodCategory,
                    image: user.image,
                    price: user.price,
                    rawMaterial1:user.rawMaterial1,
                    rawMaterial2:user.rawMaterial2,
                    rawMaterial:user.rawMaterial,
                    isLoading: false
                })
            } else {
                console.log('Document does not exist!');
            }
        })
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val !== '' ? val : null; // ถ้า val ไม่ใช่ค่าว่าง ให้เก็บค่า val ถ้า val เป็นค่าว่าง ให้เก็บค่า null
        this.setState(state);
    }



    handleCheck1 = () => {
        this.setState({
            isSelected1: true,
            isSelected2: false,
            select: 'ธรรมดา'
        });
    };
    handleCheck2 = () => {
        this.setState({
            isSelected1: false,
            isSelected2: true,
            select: 'พิเศษ'
        });
    };

    updateUser() {
        this.setState({
            isLoading: true
        });
    
        const { name, description, select, selectedValue, foodCategory,image, price, rawMaterial1, rawMaterial2 } = this.state;
    
        // เช็คค่า numberViews และ topLike ว่าไม่ใช่ undefined หรือไม่
        const rawMaterial = [];
        if (typeof rawMaterial1 !== 'undefined' && typeof rawMaterial2 !== 'undefined') {
            rawMaterial.push(rawMaterial1, rawMaterial2);
        }
    
        const updateDBRef = firebase.firestore().collection('firebase').doc(this.state.key);
        updateDBRef.set({
            name: name || '',
            description: description || '',
            select: select || '',
            selectedValue: selectedValue || '',
            foodCategory: foodCategory || '',
            image: image || '',
            price: price || '',
            rawMaterial: rawMaterial,  // ส่งค่า rawMaterial ที่เช็คค่าไม่ใช่ undefined เพื่อเขียนลงใน Firestore
            rawMaterial1: typeof rawMaterial1 !== 'undefined' ? rawMaterial1 : null,
            rawMaterial2: typeof rawMaterial2 !== 'undefined' ? rawMaterial2 : null,
        }).then((docRef) => {
            this.setState({
                key: '',
                name: '',
                description: '',
                select: '',
                selectedValue: '',
                foodCategory: '',
                image: '',
                price: '',
                rawMaterial1: '',
                rawMaterial2: '',
                isLoading: false
            });
            this.props.navigation.navigate('UserScreen');
        })
        .catch((err) => {
            console.error('Error:', err),
            this.setState({
                isLoading: false,
            })
        });
    }
    

    deleteUser() {
        const dbRef = firebase.firestore().collection('firebase').doc(this.props.route.params.userKey);
        dbRef.delete().then(() => {
            console.log("Item removed from database");
            this.props.navigation.navigate('UserScreen');
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
    
    openTwoButtonAlert() {
        Alert.alert(
            'Delete User',
            'Are you sure?',
            [
                {text: 'Yes', onPress: () => this.deleteUser()},
                {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'}
            ],
            {
                cancelable: true
            }
        );
    }




    render() {

        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        const placeholder = {
            label: this.state.band,
            value: null,
          };
        
          const options = [
            {label: 'ต้มจืด', value: 'ต้มจืด' },
            { label: 'ต้มยำ', value: 'ต้มยำ' },
            { label: 'ผัด', value: 'ผัด' },
            { label: 'แกง', value: 'แกง' },
            { label: 'ของทอด', value: 'ของทอด' },
            { label: 'ของหวาน', value: 'ของหวาน' },
            { label: 'ขนมกินเล่น', value: 'ขนมกินเล่น' }
        ];
      
        return (
            <View style={styles.container}>
            <ScrollView >
                <Image
                    source={{ uri: this.state.image }}
                    style={{ width: 350, height: 200, alignSelf: 'center',borderRadius:10 }}
                    containerStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
                />
                <Text style={{marginTop:20}}>ชื่อเมนูอาหาร :</Text>
                <Input
                    placeholder={'ชื่อเมนูอาหาร'}
                    value={this.state.name}
                    onChangeText={(val) => this.inputValueUpdate(val, 'name')}
                />
                <Text>คำอธิบาย :</Text>
                <Input
                    placeholder={'คำอธิบาย '}
                    value={this.state.description}
                    onChangeText={(val) => this.inputValueUpdate(val, 'description')}
                />
                <Text>เลือก :</Text>
                <Input
                    placeholder={'พิเศษ'}
                    value={this.state.select}
                    onChangeText={(val) => this.inputValueUpdate(val, 'select')}
                />
                    <CheckBox
                            checked={this.state.isSelected1}
                            onPress={this.handleCheck1}
                            title={"ธรรมดา"}
                        />
                        <CheckBox
                            checked={this.state.isSelected2}
                            onPress={this.handleCheck2}
                            title={"พิเศษ"}
                        />
                 <Text>หมวดอาหาร :</Text>
                    <RNPickerSelect
                        placeholder={placeholder}
                        items={options}
                        onValueChange={(val) => this.inputValueUpdate(val, 'foodCategory')}
                        value={this.state.foodCategory}
                        style={pickerSelectStyles}
                    />
                <Text>URL Link รูปภาพ :</Text>
                <Input
                    placeholder={'URL Link รูปภาพ'}
                    value={this.state.image}
                    onChangeText={(val) => this.inputValueUpdate(val, 'image')}
                />
                <Text>ราคา :</Text>
                <Input
                    placeholder={'price'}
                    value={this.state.price}
                    keyboardType='numeric'
                    onChangeText={(val) => this.inputValueUpdate(val, 'price')}
                />

                <Text>วัตถุดิบ 1 : {this.state.rawMaterial[0]}</Text>
                <Input 
                    leftIcon={
                        <Icon 
                            name=''
                            size={30}
                            color='#0085E6'
                        />
                    }
                    placeholder={'  วัตถุดิบ 1'}
                    value={this.state.rawMaterial1}
    onChangeText={(val) => this.inputValueUpdate(val, 'rawMaterial1')}
                />
                <Text></Text>
                <Text>วัตถุดิบ 2 : {this.state.rawMaterial[1]}</Text>
                <Input 
                    leftIcon={
                        <Icon 
                            name=''
                            size={30}
                            color='#0085E6'
                        />
                    }
                    placeholder={'  วัตถุดิบ 2'}
                    value={this.state.rawMaterial2}
    onChangeText={(val) => this.inputValueUpdate(val, 'rawMaterial2')}
                />

                    
                    
                    
                <Button
                    icon={
                        <Icon
                            name="wrench"
                            size={15}
                            color="#fff"
                        />
                    }
                    title='  แก้ไข'
                    buttonStyle={{
                        backgroundColor: "#ef6f0d"
                    }}
                    onPress={() => this.updateUser()}
                />
                <Button
                    icon={
                        <Icon
                            name="trash"
                            size={15}
                            color="#fff"
                        />
                    }
                    title='  ลบข้อมูล'
                    containerStyle={{
                        marginTop: 10
                    }}
                    buttonStyle={{
                        backgroundColor: "red"
                    }}
                    onPress={() => this.openTwoButtonAlert()}
                />
            </ScrollView>
            </View>
        )
    }
    
}


const theme = {
    Button: {
        raised: true
    }
}

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
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        overflowY: 'scroll',
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    preloader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
      label: {
        fontSize: 16,
        marginBottom: 10,
      },
      selectedText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
      },
})

export default UserDetailScreen;