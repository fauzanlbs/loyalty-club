import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Text, Alert, Picker, AsyncStorage, TextInput, ToastAndroid } from 'react-native';
import { Button, HeaderTitle, HeaderSide, Separator } from './components';
import Timeline from 'react-native-timeline-listview'

//API
import server from './api/server';
import { Api } from './api/server';

import CONSTANTS from './helpers/constants';


export default class Promosi extends Component{
    static navigationOptions = {
        headerTitle: <HeaderTitle text="Promosi"/> ,
        headerLeft: <HeaderSide icon={CONSTANTS.logo}/> ,
        headerRight: <HeaderSide circle icon={require('./assets/images/user-pic.jpg')} onPress={()=> Alert.alert('','heheh')}/> ,
    }

    constructor(){
        super();

        this.state = {
            dataNews:[],
            arrNews:[]
        }



    }


    render(){
        const {navigation} = this.props;
        this.data = this.state.arrNews;
        // console.log(JSON.stringify(this.newslist()) ,'newslist 1');
        // console.log(this.newslist() ,'newslist 2');
        console.log(this.state.arrNews ,'arrNews');
        // console.log(this.state.arrNews ,'DATA');

        return(
                <ScrollView style={styles.container}>
                    <View style={styles.listItem}>

                    <Timeline
                      data={ this.data }
                      circleSize={20}
                      circleColor='rgb(45,156,219)'
                      lineColor='rgb(45,156,219)'
                      timeContainerStyle={{minWidth:52, marginTop: -2}}
                      innerCircle={'dot'}
                      timeStyle={{textAlign: 'center', backgroundColor:'#0C92A6', color:'white', padding:2, borderRadius:13}}
                      descriptionStyle={{textAlign: 'justify',fontSize:11,color:'gray'}}
                      titleStyle={{textAlign: 'justify',fontSize:14,color:'black'}}
                      
                    />
                    </View>
                   
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

          this._refreshPromosi()
          // this.newslist()
    }


    async _refreshPromosi(){
 
         let api = new Api()
        // Create API
        await api.create()
 
        let client = api.getClient()
       
 
        client.get('/masterPromo').then((response) => {
            console.log('data Promosi ',response.data)
 
            this.setState({
                dataNews : response.data
            }) 
            let dataArray = [];
            for (var i = 0; i < response.data.length; i++) {
                dataArray.push({ time: '09:00', title: this.state.dataNews[i].promotion_title, description: this.state.dataNews[i].promotion_desc });
            }
            this.setState({
                arrNews : dataArray
            }) 

         }).catch((error)=>{
            console.log('RefreshResto:error',error); 
        })
     }

}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
    },
    listItem:{
        margin:10
    }
   
  });