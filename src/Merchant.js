import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Text, Alert, Picker, TouchableNativeFeedback, AsyncStorage, FlatList } from 'react-native';
import { Button, HeaderTitle, HeaderSide, Separator } from './components';
import Icon from 'react-native-vector-icons/MaterialIcons';

import MapView from 'react-native-maps';

import CONSTANTS from './helpers/constants';

//API
import server from './api/server';
import { Api } from './api/server';

export default class Merchant extends Component{
    static navigationOptions = {
        headerTitle: <HeaderTitle text="Lokasi Merchant"/> ,
        headerLeft: <HeaderSide icon={CONSTANTS.logo}/> ,
        headerRight: <HeaderSide circle icon={require('./assets/images/user-pic.jpg')} onPress={()=> Alert.alert('','heheh')}/> ,
    }

    constructor(){
        super();
        this.state = {
           data_kantor: [],
           latDefault:0,
           lonDefault:0,
        }

        this._refreshOffice = this._refreshOffice.bind(this)
        this._getMarker = this._getMarker.bind(this)
      //  this._renderKantorItem = this._renderKantorItem.bind(this)
        
    }


    render(){
        const {navigation} = this.props;

        
        return(



         
                  
                <MapView
        style={ styles.map }
        initialRegion={{
          latitude: 3.9,
          longitude: 98.6739605,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
       >


       {this._getMarker()}
       </MapView>


        

              
 
            
            



                 


                    

                   

               
        );
    }




   

    _keyExtractor = (item, index) => index 





    _getMarker(){


        if(this.state.data_kantor){

            let markers = this.state.data_kantor.map((data,index) => {
                console.log('komponen lat', data)

                return(

                          <MapView.Marker
                            coordinate={{latitude:  data.lat,
                            longitude: data.lon}}
                            title={data.name}
                            description={data.address}
                         />
                )

            })

            return markers
        }

   


    }


    async _refreshOffice(){
 
         let api = new Api()
        // Create API
        await api.create()
 
        let client = api.getClient()
       
 
        client.get('/masterMerchant').then((response) => {
            console.log('data Office ',response.data)
 
            this.setState({
                data_kantor : response.data,
                latDefault: response.data[0].lat,
                lonDefault: response.data[0].lon
                
              
            })

            console.log(this.state.data_kantor[0].lat, 'ini data lat pertama')
           
 
 
         }).catch((error)=>{
            console.log('RefreshResto:error',error)
 
        })



 
    }



     componentWillMount(){
       

         

          this._refreshOffice()


          
    }

    componentDidMount(){


        

    }

}

const styles = StyleSheet.create({
    container:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    },
    map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
    
   
  });