import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Text, Alert, Picker, TextInput, ToastAndroid } from 'react-native';
import { Button, HeaderTitle, HeaderSide, Separator } from './components';
import Icon from 'react-native-vector-icons/MaterialIcons';

//API
import server from './api/server';
import { Api } from './api/server';

import CONSTANTS from './helpers/constants';


export default class Message extends Component{
    static navigationOptions = {
        headerTitle: <HeaderTitle text="Message"/> ,
        headerLeft: <HeaderSide icon={CONSTANTS.logo}/> ,
        headerRight: <HeaderSide circle icon={require('./assets/images/user-pic.jpg')} onPress={()=> Alert.alert('','heheh')}/> ,
    }

    constructor(){
        super();
        this._sendMail = this._sendMail.bind(this)

        this.state = {
            subject : null,
            pesan : null,
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

                    <Separator/>
                    
                    <View style={styles.listItem}>
                        <Text>Silahkan kirim pesan anda</Text>
                       
                    </View>

                    <Separator/>
                    
                    <View style={styles.listItem}>
                        <TextInput style = {{textAlignVertical: "top"}}
                        multiline={true}
                        numberOfLines={2}
                        onChangeText={ (text) => this.setState({ subject:text }) }
                        placeholder="Subject"
                        placeholderTextColor="grey"
                        value={this.state.subject}/>
                    </View>

                    <View style={styles.listItem}>
                        <TextInput style = {{textAlignVertical: "top"}}
                        multiline={true}
                        numberOfLines={10}
                        placeholder="Message"
                        placeholderTextColor="grey"
                        onChangeText={ (text) => this.setState({ pesan:text }) }
                        value={this.state.pesan}/>
                    </View>

                    <Separator/>                    


                        <Button onPress={ this._sendMail }
                        style={{borderWidth:0,elevation:2}}
                        color={CONSTANTS.primaryColor} 
                        text="Kirim Pesan"/>
                   

                    

                   

                </ScrollView>
        )
    }
     async _sendMail(){
        // New API
        let api = new Api()
        // Create API
        await api.create()

        let client = api.getClient()

        // Post data to server
        let data = {
            subject: this.state.subject,
            pesan: this.state.pesan,
        }

        console.log('Request data',data)

        client.post('/customer/sendMessage',data)
        .then((response) => {
            console.log('Post Pesan Success',response.data)
            
            if(response.status == 200){
         
                
                ToastAndroid.show("Pesan Berhasil Dikirim",ToastAndroid.SHORT)
                                          
                this.props.navigation.goBack()
                
            }else{
                ToastAndroid.show("Failed to send message",ToastAndroid.SHORT)
                
            }
        })
        .catch((error) => {
            console.log('Error create post data',error)
            console.log('Error',error.response)
            console.log('Request',error.request)
            ToastAndroid.show("Error send post data to server",ToastAndroid.SHORT)
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