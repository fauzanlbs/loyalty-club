import React, { Component } from 'react';
import { Image, View , StyleSheet, Text, Dimensions, TouchableNativeFeedback } from 'react-native';
/** 
 * centering the header Title component
 * use with react-navigation header
 */
export class HeaderTitle extends Component{
    render(){
        const {children, style, text, ...props} = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.text}>{text}</Text>
            </View>
          );
    }
}

/** 
 * Header Left or Right component
 * can use as button or icon
 * use with react-navigation header
 */
export class HeaderSide extends Component{
    render(){
        const {children, style, text, icon, iconStyle, circle, ...props} = this.props;

        return (
            <TouchableNativeFeedback 
                background={TouchableNativeFeedback.Ripple('#555555aa',true)}
                {...props}>
                <View style={[styles.sideContainer, style]}>
                    { icon ?  <Image source={icon} style={[{width:40,height:40, borderRadius: circle ? 20 : 0},iconStyle]}/>  : null }
                    { children }
                </View>
            </TouchableNativeFeedback>
          );
    }
}


const styles = StyleSheet.create({
   container:{
       flex:1, 
       alignSelf:'center',
       justifyContent:'center',
    },
   text:{
       fontSize:18,
       color:'white',
       fontWeight:'bold',
    },
    sideContainer:{
        paddingHorizontal:10,
        flex:1, 
        alignSelf:'center',
        justifyContent:'center',
    }
});
  