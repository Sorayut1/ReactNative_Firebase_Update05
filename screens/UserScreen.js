import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text ,Image,TouchableOpacity} from 'react-native';
import { ListItem, Badge } from 'react-native-elements';
import { firebase } from '../database/firebaseDb';

  
class UserScreen extends Component {
    constructor() {
        super();

        this.firestoreRef = firebase.firestore().collection('firebase');
        this.state = {
            isLoading: true,
            userArr: []
        }
    }

    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getCollection = (querySnapShot) => {
        const userArr = [];
        querySnapShot.forEach((res) => {
            const { name, description, select,foodCategory,price,image,rawMaterial1,rawMaterial2 ,rawMaterial} = res.data();
            userArr.push({
                key: res.id,
                res,
                name,
                description,
                select,
                foodCategory,
                price,
                image,
                rawMaterial1,
                rawMaterial2,
                rawMaterial
            })
        })
        this.setState({
            userArr,
            isLoading: false
        })
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }

        return(
            <View style={{flex: 1}}>
            <ScrollView>
                
                {
                    this.state.userArr.map((item, i) => {
                        return (
                            <TouchableOpacity
    key={i}
    style={{ borderBottomWidth: 1, paddingVertical: 10  }}
    onPress={() => {
        this.props.navigation.navigate('UserDetailScreen', {
            userKey: item.key
        })
    }}
>   
    {/* <Badge 
        value={i+1}
    /> */}
    <View style={{ flexDirection:'row' }}>
        <Image
            source={{ uri: item.image }}
            style={{ width: 170, height: 170 ,marginLeft:10,borderRadius:10}}
        />
        <View style={{ marginLeft: 10,gap:10 }}>
            <Text style={{fontSize:18,fontWeight:'700'}}>ชื่อเมนู: {item.name}</Text>
            <Text>รายละเอียด: {item.description}</Text>
            <Text>เลือก: {item.select}</Text>
            <Text>หมวดอาหาร: {item.foodCategory}</Text>
            <Text>ราคา: {item.price} บาท</Text>
        </View>
    </View>
</TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    preloader: {
        
        
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default UserScreen;