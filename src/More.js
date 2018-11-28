import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Text, Alert, Picker, TouchableNativeFeedback } from 'react-native';
import { Button, HeaderTitle, HeaderSide, Separator } from './components';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CONSTANTS from './helpers/constants';

export default class More extends Component{
    static navigationOptions = {
        headerTitle: <HeaderTitle text="More"/> ,
        headerLeft: <HeaderSide icon={CONSTANTS.logo}/> ,
        headerRight: <HeaderSide circle icon={require('./assets/images/user-pic.jpg')} onPress={()=> Alert.alert('','heheh')}/> ,
    }

    constructor(){
        super();
        this.state = {
           
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

                    <TouchableNativeFeedback onPress={()=>{}}>
                        <View style={styles.listItem}>
                            <Text>Settings</Text>      
                        </View>                      
                    </TouchableNativeFeedback>

                    <Separator/>
                    
                    <TouchableNativeFeedback onPress={()=>{}}>
                        <View style={styles.listItem}>
                            <Text>Help</Text>      
                        </View>                      
                    </TouchableNativeFeedback>

                    <Separator/>
                    
                    <TouchableNativeFeedback onPress={()=>{}}>
                        <View style={styles.listItem}>
                            <Text>About</Text>      
                        </View>                      
                    </TouchableNativeFeedback>

                    <Separator/>                    

                    {/* fill the empty space */}
                    <View style={{flex:1}}/>

                </ScrollView>
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
    },
    listItem:{
        padding:15,
        flex:1
    }
   
  });