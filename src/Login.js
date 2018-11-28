import React, { Component } from 'react';
import { AsyncStorage, Dimensions, Image, ToastAndroid, ImageBackground, View, ScrollView, Text, TextInput, StatusBar, StyleSheet, Modal, Keyboard} from 'react-native';
import { Button, TextInputIcon } from './components';

import CONSTANTS from './helpers/constants';

//API
import server from './api/server';
import { Api } from './api/server';


// Navigation
import { NavigationActions } from 'react-navigation'

const window = Dimensions.get('window');

export default class Login extends Component{
    constructor(){
        super();

        this._onLoginClick   = this._onLoginClick.bind(this);

        this.state = {
            modalLoginVisible:false,
            keyboardShow:false,
        }

        this._keyboardDidShow = this._keyboardDidShow.bind(this);
        this._keyboardDidHide = this._keyboardDidHide.bind(this);
        
    }

    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow () {
        // console.log('Keyboard Shown');
        this.setState({keyboardShow:true})
    }

    _keyboardDidHide () {
        // console.log('Keyboard Hidden');
        this.setState({keyboardShow:false})        
    }

    render(){
        const {navigation} = this.props;
        
        return(
            <ScrollView 
                style={{flex:1}}
                keyboardShouldPersistTaps="always">
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                    barStyle="light-content"
                />
                <ImageBackground 
                    source={require('./assets/images/login-bg.jpg')}
                    style={{
                        flex:1,
                        height:window.height,
                    }}>
                    <View style={styles.container}>
                        <Image style={styles.logo}
                            source={CONSTANTS.logo}/>
                        <Text style={styles.textWhite}>PLC PLN</Text>
                        <View style={{flex:1}}/>
                        
                        <Button onPress={()=>{ navigation.navigate('Register') }}                            
                            style={styles.button}
                            text="Sign Up"/>
                        
                        <Button onPress={()=>{this.setState({modalLoginVisible:!this.state.modalLoginVisible})}}   
                            style={styles.button}
                            text="Login"/>

                        <Modal
                            visible={this.state.modalLoginVisible}
                            animationType={'slide'}
                            transparent={true}
                            onRequestClose={() => this.setState({modalLoginVisible:!this.state.modalLoginVisible})}>
                            
                            <View style={{flex:this.state.keyboardShow ? 0 : 1}}/>

                            <ScrollView 
                                contentContainerStyle={styles.modalLoginContainer}
                                keyboardShouldPersistTaps="always">

                                <TextInputIcon 
                                    containerStyle={styles.inputLogin}
                                    colorScheme="#ffffff"
                                    placeholder="Username / ID Meter"
                                    value={ this.state.username }
                                    onChangeText={ (text) => this.setState({ username:text }) }/>
                                
                                <TextInputIcon 
                                    containerStyle={styles.inputLogin}                                    
                                    colorScheme="#ffffff"
                                    secureTextEntry={true}
                                    placeholder="Password"
                                    value={ this.state.password }
                                    onChangeText={ (text) => this.setState({ password:text }) }/>

                                <View style={{flex:1}}/>

                                <Button onPress={ this._onLoginClick }
                                    style={styles.button}
                                    text="Login"/>
                            </ScrollView>

                        </Modal>
                    </View>
                </ImageBackground>
            </ScrollView>
        )
    }


   async _onLoginClick(){

        

         let api = new Api()
        // Create API
        await api.create()

        

        let client = api.getClient()



        
       

        // END new api
        let { navigate } = this.props.navigation




        // Login logic
        let user = client.post('/authenticate',{
            username: this.state.username,
            password: this.state.password
        }).then(async (response) => {
            console.log('login success',response.data)
            console.log('response',user)
            let data = response.data

    

            if(response.status == 200){ //OK

                ToastAndroid.show("Login success!",ToastAndroid.SHORT)

                try{
                    let user = response.data
                    let token = user.token
                    // Remove Token
                    delete user.token
                    await AsyncStorage.setItem('user',JSON.stringify(user))
                    await AsyncStorage.setItem('api_token', token)
                }catch(error){
                    console.log('Error save user data',error)
                }

                // Navigate to Home
                // const resetAction = NavigationActions.reset({
                //     index: 0,
                //     actions: [
                //         NavigationActions.navigate({ routeName: 'Home'})
                //     ]
                // })
                // this.props.navigation.dispatch(resetAction)

                this.setState({modalLoginVisible:!this.state.modalLoginVisible})
                this.props.navigation.navigate('Home')

            }
        }).catch((error) => {
            console.log('login error',error)

            if(error.response == 401){
                ToastAndroid.show("Login failed! Please check your credential",ToastAndroid.SHORT)
                return
            }

            if(error.response == 422){
                ToastAndroid.show("Your login is not valid, please check again!",ToastAndroid.SHORT)
                return
            }

            ToastAndroid.show("Login failed! Please check your credential",ToastAndroid.SHORT)
        })



    }

}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#333333aa',
        flex:1,
        alignItems:'center',
        padding:10,
    },
    textWhite: {
      color: 'white',
      marginTop: 10,
    },
    logo:{
        backgroundColor:'yellow',
        width:100,
        height:120,
        marginTop:100,
    },
    button:{
        width:250,
        height:50,
        marginVertical:10,
        borderColor:'#ffffff',
        borderWidth:2,
    },
    modalLoginContainer:{
        flex:1,
        alignItems:'center',        
        backgroundColor: CONSTANTS.primaryColor,
        paddingVertical:20,
    },
    inputLogin:{
        width:250,
        marginVertical:10
    }
  });
