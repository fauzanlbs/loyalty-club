import React, { Component } from 'react';
import { Image, View , StyleSheet, Text, Dimensions, TouchableNativeFeedback } from 'react-native';

export default class Separator extends Component{
    render(){
        const {style, ...props} = this.props;

        return(
            <View {...props} style={[{height:1,backgroundColor:'#ddd'},style]} />            
        )
    }
}