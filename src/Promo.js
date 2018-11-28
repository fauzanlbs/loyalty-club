import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Dimensions, Text, Image, Alert, FlatList, TouchableNativeFeedback } from 'react-native';
import { Button, HeaderTitle, HeaderSide } from './components';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CONSTANTS from './helpers/constants';
const window = Dimensions.get('window');

export default class Promo extends Component{
    static navigationOptions = {
        headerTitle: <HeaderTitle text="News & Promo"/> ,
        headerLeft: <HeaderSide icon={CONSTANTS.logo}/> ,
        headerRight: <HeaderSide circle icon={require('./assets/images/user-pic.jpg')} onPress={()=> Alert.alert('','heheh')}/> ,
    }

    constructor(){
        super();

            this._onMessage = this._onMessage.bind(this)
            this._onPoin = this._onPoin.bind(this)
            this._onMerchant = this._onMerchant.bind(this)
            this._onKantor = this._onKantor.bind(this)
            this._onBerita = this._onBerita.bind(this)
            this._onPromosi = this._onPromosi.bind(this)
        this.state = {
           
        }
    }


    render(){
        const {navigation} = this.props;
        
        return(
                <View style={styles.container}>
                    <StatusBar
                        backgroundColor={CONSTANTS.primaryColorDarken}
                        translucent={false}
                        barStyle="light-content"
                        />

                    <View style={styles.menuRow}>
                        <MenuItem onPress={ this._onPoin }
                            iconName="attach-money"
                            text="Tukar Poin"/>

                        <MenuItem onPress={ this._onBerita }
                            iconName="assignment"
                            text="Berita"/>
                        
                        <MenuItem onPress={ this._onPromosi }
                            iconName="local-offer"
                            text="Promo"/>
                        
                         
                    </View>

                    <View style={styles.menuRow}>
                        <MenuItem onPress={ this._onMerchant}
                            iconName="beenhere"
                            text="Merchant Terdekat"/>

                         <MenuItem onPress={ this._onKantor }
                            iconName="account-balance"
                            text="Kantor Terdekat"/>
                        
                         <MenuItem onPress={ this._onMessage }
                            iconName="message"
                            text="Pesan"/>
                        
                       
                    </View>

                     <View style={styles.menuRow}>
                        <MenuItem onPress={()=>{Alert.alert('hehe')}}
                            iconName="help"
                            text="FAQ"/>
                        
                       <View style={{flex:1}}/>


                        <View style={{flex:1}}/>
                        
                       
                    </View>



                    {/* fill the empty space */}
                    <View style={{flex:1}}/>

                </View>
        )
    }


      _onMessage(){

        this.props.navigation.navigate('Message')

    }

    _onPoin(){

        this.props.navigation.navigate('TukarPoin')

    }

     _onMerchant(){

        this.props.navigation.navigate('Merchant')

    }

    _onBerita(){

        this.props.navigation.navigate('Berita')

    }

    _onPromosi(){

        this.props.navigation.navigate('Promosi')

    }

     _onKantor(){

        this.props.navigation.navigate('Kantor')

    }



}

class MenuItem extends Component{
    render(){
        const {iconName, iconSize, iconColor, text, ...props} = this.props;

        return(
            <TouchableNativeFeedback {...props}>
                <View style={{flex:1,backgroundColor:'white', alignItems:'center',paddingVertical:20}}>
                    <Icon name={iconName} size={28} color={CONSTANTS.primaryColor} />
                    <Text style={{marginTop:10,fontSize:11}}>{text}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#fff',
    },
    menuRow:{
        flexDirection:'row',
    }
   
  });