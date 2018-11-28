import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Text, Alert, TouchableNativeFeedback, Image, AsyncStorage } from 'react-native';
import { Button, HeaderTitle, HeaderSide, Separator } from './components';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CONSTANTS from './helpers/constants';




//API
import server from './api/server';
import { Api } from './api/server';



const image = require('./assets/images/user-pic.jpg');

export default class Profile extends Component{
    static navigationOptions = {
        headerTitle: <HeaderTitle text="My Profile"/> ,
        headerLeft: <HeaderSide icon={CONSTANTS.logo}/> ,
        headerRight: (
            <HeaderSide onPress={()=> {}}>
                <Text style={{color:'#fff'}}>Edit</Text>
            </HeaderSide>
        ) ,
    }

    constructor(){
        super();

        this._refreshData = this._refreshData.bind(this)

        this.state = {
            user:{},
            user_detail:{}
        }
    }


    render(){
        const {navigation} = this.props;
        
        return(
            <ScrollView style={styles.container}>
                    <StatusBar
                        backgroundColor={CONSTANTS.primaryColorDarken}
                        translucent={false}
                        barStyle="light-content"
                        />

                    <View style={styles.profileHeader}>
                        <Image source={image} style={{width:100, height:100, borderRadius: 50 }}/>
                        <Text style={styles.textBig}>{this.state.user_detail.name} {this.state.user_detail.last_name}</Text>
                        <Text>Medan, Indonesia</Text>
                    </View>

                    <Separator/>
                    
                    <View style={styles.listItem}>
                        <Text style={styles.textSmall}>Alamat</Text>
                        <Text>{this.state.user_detail.address}</Text>
                    </View>

                    <Separator/>
                    
                    <View style={styles.listItem}>
                        <Text style={styles.textSmall}>ID Pelanggan / No Meter</Text>
                        <Text>{this.state.user_detail.username}</Text>
                    </View>

                    <Separator/>                    

                    <View style={styles.listItem}>
                        <Text style={styles.textSmall}>Type Pelanggan</Text>
                        <Text>Pasca Bayar</Text>
                    </View>

                    <Separator/>

                    <View style={styles.listItem}>
                        <Text style={styles.textSmall}>Email</Text>
                        <Text>{this.state.user_detail.email}</Text>
                    </View>

                    <Separator/>

                    <View style={styles.listItem}>
                        <Text style={styles.textSmall}>Phone Number</Text>
                        <Text>{this.state.user_detail.phone_number}</Text>
                    </View>

                    <Separator/>
                    {/* fill the empty space */}
                    <View style={styles.listItem}/>
                    <Separator/>

                    
                    <TouchableNativeFeedback onPress={()=>{}}>
                        <View style={styles.listItemTouch}>
                            <Text>Ganti ID Pelanggan / No Meter</Text>
                        </View>                      
                    </TouchableNativeFeedback>

                    <Separator/>

                    <TouchableNativeFeedback onPress={()=>{}}>
                        <View style={styles.listItemTouch}>
                            <Text>Ganti Password</Text>
                        </View>                      
                    </TouchableNativeFeedback>

                    <Separator/>                    
                    

                    

                </ScrollView>
        )
    }




    async componentWillMount(){
        try{
            let session = await AsyncStorage.getItem('user')
            let user = JSON.parse(session)
            console.log('user',user)
            this.setState({
                user: user
            })

           

        }catch(error){
            console.log('Drawer:willmount Eror read user data',error)
        }

          this._refreshData()
    }




      async _refreshData(){

         console.log('/customer/'+ this.state.user.id)

         let api = new Api()
        // Create API
        await api.create()

        let client = api.getClient()
       

        client.get('/customer/'+ this.state.user.table_detail_user_id).then((response) => {
            console.log('/customer/ ',response.data)

        this.setState({
            user_detail : response.data
        })


         }).catch((error)=>{
            console.log('RefreshStat:error',error)

        })

    }



}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
    },
    listItem:{
        padding:10
    },
    listItemTouch:{
        paddingHorizontal:10,
        paddingVertical:15,
    },
    textSmall:{
        fontSize:12,
    },
    textBig:{
        fontSize:18,
        margin:5,
        color:'#000'
    },
    profileHeader:{
        alignItems:'center',
        paddingVertical:15
    }
  });