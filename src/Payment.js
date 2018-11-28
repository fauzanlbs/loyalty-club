import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, Text, Alert, Picker } from 'react-native';
import { Button, HeaderTitle, HeaderSide, Separator } from './components';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CONSTANTS from './helpers/constants';

export default class Payment extends Component{
    static navigationOptions = {
        headerTitle: <HeaderTitle text="Payment"/> ,
        headerLeft: <HeaderSide icon={CONSTANTS.logo}/> ,
        headerRight: <HeaderSide circle icon={require('./assets/images/user-pic.jpg')} onPress={()=> Alert.alert('','heheh')}/> ,
    }

    constructor(){
        super();
        this.state = {
           isDone: false
        }


        this._refreshData = this._refreshData.bind(this)
        this._showInfo = this._showInfo.bind(this)
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

                    <View style={styles.listItem}>


                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                         <Image source={require('./assets/images/card.png')} style={{height:180}}/>
                            </View>
                        
                    </View>

                    <Separator/>
                    
                    {this.state.isDone?(
                   this. _showInfo()
                   ):(<View/>)

                  }    

                    <View style={styles.listItem}>
                        <Text>Saldo</Text>
                        <Text>50000</Text>
                    </View>

                    <Separator/>

                    <View style={styles.listItem}>
                        <Picker
                        selectedValue={this.state.language}
                        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                            <Picker.Item label="50.000" value="50000" />
                            <Picker.Item label="100.000" value="100000" />
                        </Picker>

                        <Button onPress={()=>{}}
                            style={{elevation:2}}
                            color={CONSTANTS.primaryColor} 
                            text="Bayar Sekarang"/>
                    </View>

                    

                    {/* fill the empty space */}
                    <View style={{flex:1}}/>

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

         


           
         
    }


    componentDidMount(){


         this._refreshData()



    }


     _showInfo(){

            return(

                 <View>
                     <View style={styles.listItem}>
                        <Text>ID Pelanggan</Text>
                        <Text>123</Text>
                    </View>

                    <Separator/>
                    
                    <View style={styles.listItem}>
                        <Text>Poin Terakhir</Text>
                        <Text>{this.state.user_detail.last_point}</Text>
                    </View>
                </View>
            )
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


         this.setState({
            isDone: true
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
    }
   
  });