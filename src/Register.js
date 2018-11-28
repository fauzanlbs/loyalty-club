import React, { Component } from 'react';
import { AsyncStorage, View, ScrollView, StyleSheet, StatusBar, Dimensions, DeviceEventEmitter, ToastAndroid } from 'react-native';
import { Button, TextInputIcon } from './components';



//API
import server from './api/server';
import { Api } from './api/server';



import CONSTANTS from './helpers/constants';
const inputColorScheme = '#ffffff'
const window = Dimensions.get('window');

// import { getTagId, readTag, writeTag } from 'nfc-react-native';

import NFC, {NfcDataType, NdefRecordType} from "react-native-nfc";

export default class Register extends Component{
    constructor(){
        super();

        this._onSavePress = this._onSavePress.bind(this)

        this.state = {
            form_fullname:null,
            form_id_meter:null,
            form_nfc:null,
            form_pass:null,
            form_tlp:null,
            form_mail:null
        }
    }




   componentDidMount() {


    this.bindNfcListener();



  }



   bindNfcListener(){
      NFC.addListener((payload)=>{
       

         this.setState({
                    
                    form_nfc: payload.data.id
                });
       
      })
    }



    render(){
        const {navigation} = this.props;
        
        return(
            <View style={{flex:1,backgroundColor:CONSTANTS.primaryColor}}>
                <StatusBar
                        backgroundColor="transparent"
                        barStyle="light-content"
                    />
                <ScrollView keyboardShouldPersistTaps="always">
                    <View style={styles.container}>
                        <TextInputIcon 
                            containerStyle={styles.inputLogin}
                            colorScheme={inputColorScheme}
                            placeholder="Fullname"
                            value={ this.state.form_fullname }
                            onChangeText={ (text) => this.setState({ form_fullname:text }) }/>
                        
                        <TextInputIcon 
                            containerStyle={styles.inputLogin}                                    
                            colorScheme={inputColorScheme}
                            placeholder="ID Meters"
                            value={ this.state.form_id_meter }
                            onChangeText={ (text) => this.setState({ form_id_meter:text }) }/>


                        <TextInputIcon 
                            containerStyle={styles.inputLogin}                                    
                            colorScheme={inputColorScheme}
                            placeholder="No Telepon"
                            value={ this.state.form_tlp }
                            onChangeText={ (text) => this.setState({ form_tlp:text }) }/>

                         <TextInputIcon 
                            containerStyle={styles.inputLogin}                                    
                            colorScheme={inputColorScheme}
                            placeholder="Email"
                            value={ this.state.form_mail }
                            onChangeText={ (text) => this.setState({ form_mail:text }) }/>


                         <TextInputIcon 
                            editable={false}
                            containerStyle={styles.inputLogin}                                    
                            colorScheme={inputColorScheme}
                            placeholder="ID NFC Card"
                            value={ this.state.form_nfc }
                            onChangeText={ (text) => this.setState({ form_nfc:text }) }/>

                        <Button
                            onPress={this.readTagId}
                            text="Get ID of Tag"
                            />


                        <TextInputIcon 
                            containerStyle={styles.inputLogin}                                    
                            colorScheme={inputColorScheme}
                            secureTextEntry={true}
                            placeholder="Password"
                            value={ this.state.form_pass }
                            onChangeText={ (text) => this.setState({ form_pass:text }) }/>
                        
                        <TextInputIcon 
                            containerStyle={styles.inputLogin}                                    
                            colorScheme={inputColorScheme}
                            secureTextEntry={true}                            
                            placeholder="Re-type Password"/>

                        <View style={{marginBottom:20}}/>

                        <Button onPress={ this._onSavePress }   
                            style={styles.button}
                            text="Sign Up"/>
                        </View>
                </ScrollView>
            </View>
        )
    }


    async _onSavePress(){


       let api = new Api()
        // Create API
        await api.create()

        let client = api.getClient()

        if(!this.state.form_nfc){
            this.setState({
                form_nfc : this.state.form_tlp
            });
        }

        let data = {

            username: this.state.form_id_meter,
            phone_number: this.state.form_tlp,
            idnfc: this.state.form_nfc,
            pass: this.state.form_pass,
            name: this.state.form_fullname,
            idmeter: this.state.form_id_meter,
            email: this.state.form_mail,
                }

        console.log(data,'datanya')


         client.post('/customer',data)
        .then((response) => {
            console.log('Post Gardu Response',response.data)
            
            if(response.status == 200){
       
             ToastAndroid.show("Selamat, anda mendapatkan 20 poin",ToastAndroid.LONG)
             this.props.navigation.goBack()
            }

         })
        .catch((error) => {
            console.log('Error create post data',error)
            console.log('Error',error.response)
            console.log('Request',error.request)
            ToastAndroid.show("Data customer sudah ada",ToastAndroid.SHORT)
        })

        }

}

const styles = StyleSheet.create({
    button:{
        width:250,
        marginVertical:10,
        borderColor:'#ffffff',
        borderWidth:2,
    },
    container:{
        flex:1,
        alignItems:'center',        
        backgroundColor: CONSTANTS.primaryColor,
        paddingVertical:30,
    },
    inputLogin:{
        width:250,
        marginVertical:10
    }
  });