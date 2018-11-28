import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Text, Alert, AsyncStorage, Picker, TextInput, FlatList } from 'react-native';
import { Button, HeaderTitle, HeaderSide, Separator } from './components';
import Icon from 'react-native-vector-icons/MaterialIcons';



//API
import server from './api/server';
import { Api } from './api/server';


import { Card } from 'react-native-elements'

import CONSTANTS from './helpers/constants';

import TabItem from './components/TabItem'

export default class TukarPoin extends Component{
    static navigationOptions = {
        headerTitle: <HeaderTitle text="Tukar Poin"/> ,
        headerLeft: <HeaderSide icon={CONSTANTS.logo}/> ,
        headerRight: <HeaderSide circle icon={require('./assets/images/user-pic.jpg')} onPress={()=> Alert.alert('','heheh')}/> ,
    }

    constructor(){
        super();
        this.state = {
           pesan : null,
            user:{},
            user_detail:{},
            last_poin:0,
            currentTab:'Konser',
            data_resto: [],
            data_travel: [],
            data_merchan: [],
            data_konser: []
        }


        this._renderPromoItem = this._renderPromoItem.bind(this)
        this._refreshPromo = this._refreshPromo.bind(this)
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

                    <View style={{backgroundColor:'#f5f5f5',flexDirection:'row',padding:10}}>
                        <View style={{flex:1}}>
                            <Text style={styles.textPointLabel}>Your Points:</Text>
                            <Text style={styles.textPoint}>{this.state.user_detail.last_point}</Text>
                        </View>

                        <Button onPress={()=>{}}
                            style={{elevation:2}}
                            color={CONSTANTS.primaryColor} 
                            text="Top Up"/>
                        
                    </View>

                    <Separator/>
                    
                    {/* Tab */}
                    <View style={ styles.tabs }>
                        <TabItem active={ this.state.currentTab == 'Konser' } 
                            text="Konser"
                            onPress={() => {
                                this.setState({ currentTab:'Konser' }) 
                                
                            }}/>
                        <TabItem active={ this.state.currentTab == 'Merchandise' } 
                            text="Merchandise"
                            onPress={() => {
                                this.setState({ currentTab:'Merchandise' }) 
                                
                            }}/>
                        <TabItem active={ this.state.currentTab == 'Restaurant' } 
                            text="Restaurant"
                            onPress={() => {
                                this.setState({ currentTab:'Restaurant' }) 
                                
                            }}/>
                        <TabItem active={ this.state.currentTab == 'Traveling' } 
                            text="Traveling"
                            onPress={() => {
                                this.setState({ currentTab:'Traveling' }) 
                                
                            }}/>
                    </View>

                    <Separator/>     

                    { this._renderCurrentTab() }   


                   

                </ScrollView>
        )
    }

    /*============== tabs rendering function =========================*/

    _renderCurrentTab(){
        switch(this.state.currentTab){
            case 'Konser':
                return this._renderTabKonser();
            break;
            case 'Merchandise':
                return this._renderTabMerchandise();
            case 'Restaurant':
                return this._renderTabResto();
            case 'Traveling':
                return this._renderTabTravel();
            break;
            // default:
            //     return this._renderTabMerchandise();
            // break;                
        }
    }

    _renderTabKonser(){
        return( 
            <View> 
 
               <FlatList 
                        data={ this.state.data_konser } 
                        keyExtractor={ this._keyExtractor } 
                        renderItem={ this._renderPromoItem }/> 
 
            </View>  
        ) 
    }


     _renderTabResto(){ 
        return( 
            <View> 
 
               <FlatList 
                        data={ this.state.data_resto } 
                        keyExtractor={ this._keyExtractor } 
                        renderItem={ this._renderPromoItem }/> 
 
            </View>  
        ) 
    } 




    _renderTabTravel(){
         return( 
            <View> 
 
               <FlatList 
                        data={ this.state.data_travel } 
                        keyExtractor={ this._keyExtractor } 
                        renderItem={ this._renderPromoItem }/> 
 
            </View>  
        ) 
    }



    _renderTabMerchandise(){
         return( 
            <View> 
 
               <FlatList 
                        data={ this.state.data_merchan } 
                        keyExtractor={ this._keyExtractor } 
                        renderItem={ this._renderPromoItem }/> 
 
            </View>  
        ) 
    }





    _renderPromoItem({item,index}){ 
 
             return( 
            <View> 
 
               <Card  

                    image={{  uri: item.url}}
                    overlayColor="#33333388"                     
                   
                    featuredSubtitle= {item.point.base_point} 
                    featuredSubtitleStyle = {{fontSize: 23, fontWeight:'bold'}}
                > 
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                 <Text style={{fontSize: 8, alignItems:'center'}}>
    {item.promotion_desc}
  </Text>
  </View>
                </Card>
 
            </View>  
        ) 
    } 

    /*============== end of tabs rendering function =========================*/
    


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
          this._refreshPromo()
    }

    _keyExtractor = (item, index) => index 

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

        // let poin = this.state.user_detail.poin.map(function(val){
        //                 return val.point_balance
        //             })
        //             // test.join(",")
        //             this.setState({
        //                 last_poin: poin
        //             })

        // console.log(poin,'poinnyaaz')


         }).catch((error)=>{
            console.log('RefreshStat:error',error)

        })

    }


     async _refreshPromo(){
 
         let api = new Api()
        // Create API
        await api.create()
 
        let client = api.getClient()
       
 
        client.get('/masterResto').then((response) => {
            console.log('data Resto ',response.data)
 
            this.setState({
                data_resto : response.data
            })
 
 
         }).catch((error)=>{
            console.log('RefreshResto:error',error)
 
        })


          client.get('/masterTravel').then((response) => {
            console.log('data Travel ',response.data)
 
            this.setState({
                data_travel : response.data
            })
 
 
         }).catch((error)=>{
            console.log('RefreshTravel:error',error)
 
        })

          client.get('/masterMerchandise').then((response) => {
            console.log('data Merchan ',response.data)
 
            this.setState({
                data_merchan : response.data
            })
 
 
         }).catch((error)=>{
            console.log('RefreshMerchan:error',error)
 
        })

          client.get('/masterKonser').then((response) => {
            console.log('data Konser ',response.data)
 
            this.setState({
                data_konser : response.data
            })
 
 
         }).catch((error)=>{
            console.log('RefreshStat:error',error)
 
        })



 
    }




}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#f5f5f5',
    },
    listItem:{
        padding:10,
        // textAlignVertical: "top"
    },
     textBig:{
        fontSize:18,
        // fontWeight:'bold'
    },
    textPointLabel:{
        fontSize:16,
    },
    textPoint:{
        fontSize:18,
        color:'#333'
    },
     tabItem:{
        height: 45,
        paddingTop:8,
        paddingBottom:8,
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
     tabs:{
        flexDirection:'row',
        backgroundColor: '#fff'
    },
    cardGrid:{
        flexBasis:180,
    },    
    cardDesc:{
        padding:10,
        borderTopWidth:1,
        borderTopColor:'#ddd'
    },
  });