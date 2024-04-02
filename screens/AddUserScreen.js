import React, { useState } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View , TouchableOpacity} from 'react-native';
import { ThemeProvider, Button, Text, Input, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import { firebase } from '../database/firebaseDb';
import { CheckBox } from 'react-native-elements';
// import { MaterialIcons } from '@expo/vector-icons';
const AddUserScreen = ({ navigation }) => {
    const dbRef = firebase.firestore().collection('firebase');
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [select, setSelect] = useState("");
    const [foodCategory, setFoodCategory] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [rawMaterial, setRawMaterial] = useState([[]]);
    // const [rawMaterial1, setRawMaterial1] = useState("");
    // const [rawMaterial2, setRawMaterial2] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSelected1, setIsSelected1] = useState(false);
    const [isSelected2, setIsSelected2] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    const inputValueUpdate = (val, prop) => {
        switch(prop) {
            case 'name':
                setName(val);
                break;
            case 'description':
                setDescription(val);
                break;
            case 'price':
                setPrice(val);
                break;
            case 'image':
                setImage(val);
                break;
            case 'foodCategory':
                setFoodCategory(val);
                break;
            case 'rawMaterial':
                setRawMaterial(val);
                break;
            // case 'rawMaterial2':
            //     setRawMaterial2(val);
            //     break;
            default:
                break;
        }
    }

    const handleCheck1 = () => {
        setIsSelected1(true);
        setIsSelected2(false);
        setSelect('ธรรมดา');
    };
  
    const handleCheck2 = () => {
        setIsSelected1(false);
        setIsSelected2(true);
        setSelect('พิเศษ');
    };

    const storeUser = () => {
        if (name === '') {
            alert('Fill at least the name!');
        } else {
            setIsLoading(true);
            dbRef.add({
                name,
                description,
                select,
                foodCategory: selectedValue ,
                price,
                image,
                rawMaterial
            }).then((res) => {
                setName('');
                setDescription('');
                setSelect('');
                // selectedValue('');
                setPrice('');
                setImage('');
                setRawMaterial(["",""]);
                // setRawMaterial2('');
                setIsSelected1(false);
                setIsSelected2(false);
                setSelectedValue(null);
                setIsLoading(false);
                navigation.navigate('UserScreen');
            })
            .catch((err) => {
                console.log('Error found: ', err);
                setIsLoading(false);
            })
        }
    }

    if (isLoading) {
        return (
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E" />
            </View>
        )
    }

    const placeholder = {
        label: 'หมวดอาหาร',
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

    return(
        <View style={styles.container}>
            <ScrollView >
                <Image
                    source={{ uri: image }}
                    style={{ width: 340, height: 200, alignSelf: 'center',borderRadius:10 }}
                    containerStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
                />
                <Text style={{marginTop:20}}>ชื่อเมนูอาหาร :</Text>
                <Input 
                    leftIcon={
                        <Icon 
                            name=''
                            size={20}
                            color='#0085E6'
                        />
                    }
                    placeholder={'  ชื่อเมนูอาหาร'}
                    value={name}
                    onChangeText={(val) => inputValueUpdate(val, 'name')}
                />
                <Text>คำอธิบาย :</Text>
                <Input 
                    leftIcon={
                        <Icon 
                            name=''
                            size={20}
                            color='#0085E6'
                        />
                    }
                    placeholder={'  คำอธิบาย'}
                    value={description}
                    onChangeText={(val) => inputValueUpdate(val, 'description')}
                />
                <Text>หมวดอาหาร :</Text>
                <RNPickerSelect
                    placeholder={placeholder}
                    items={options}
                    onValueChange={(value) => setSelectedValue(value)}
                    value={selectedValue}
                    style={pickerSelectStyles}
                />
                <Text>เลือก :</Text>
                <CheckBox
                    checked={isSelected1}
                    onPress={handleCheck1}
                    title={"ธรรมดา"}
                />
                <CheckBox
                    checked={isSelected2}
                    onPress={handleCheck2}
                    title={"พิเศษ"}
                />


                <Text>ราคา :</Text>
                <Input 
                    leftIcon={
                        <Icon 
                            name=''
                            size={20}
                            color='#0085E6'
                        />
                    }
                    placeholder={'  ราคา'}
                    value={price}
                    keyboardType='numeric'
                    onChangeText={(val) => inputValueUpdate(val, 'price')}
                />
                <Text>URL Link รูปภาพ :</Text>
                <Input 
                    leftIcon={
                        <Icon 
                            name=''
                            size={30}
                            color='#0085E6'
                        />
                    }
                    placeholder={'  Link รูปภาพ'}
                    value={image}
                    onChangeText={(val) => inputValueUpdate(val, 'image')}
                />
                <Text>วัตถุดิบ 1 :</Text>
                <Input 
                    leftIcon={
                        <Icon 
                            name=''
                            size={30}
                            color='#0085E6'
                        />
                    }
                    placeholder={'  วัตถุดิบ 1'}
                    value={rawMaterial[0]}
                    onChangeText={(val) => {
                        const newRawMaterial = [...rawMaterial];
                        newRawMaterial[0] = val;
                        setRawMaterial(newRawMaterial);
                    }}
                />
                <Text>วัตถุดิบ 2 :</Text>
                <Input 
                    leftIcon={
                        <Icon 
                            name=''
                            size={30}
                            color='#0085E6'
                        />
                    }
                    placeholder={'  วัตถุดิบ 2'}
                    value={rawMaterial[1]}
                    onChangeText={(val) => {
                        const newRawMaterial = [...rawMaterial];
                        newRawMaterial[1] = val;
                        setRawMaterial(newRawMaterial);
                    }}
                />
                <Button 
                    icon={
                        <Icon 
                            name='check'
                            size={15}
                            color='white'
                        />
                    }
                    title='  เพิ่มเมนูอาหาร'
                    buttonStyle={{
                        backgroundColor: "#ef6f0d"
                    }}
                    onPress={() => storeUser()}
                />
                <Button 
                
                    icon={
                        <Icon 
                            name='users'
                            size={15}
                            color='white'
                        />
                    }
                    title='  เมนูอาหารทั้งหมด'
                    onPress={() => navigation.navigate('UserScreen')}
                    containerStyle={{
                        marginTop: 10
                    }}
                    buttonStyle={{
                        backgroundColor: "red"
                    }}
                />
                
            </ScrollView>
        </View>
    );
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
    checkbox1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        marginLeft: 10,
        gap:10,
        marginTop:5,
    },
    checkbox2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        marginTop:5,
        marginLeft: 1,
        gap:10
    },
})

export default AddUserScreen;
