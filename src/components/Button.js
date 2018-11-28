import React, { Component } from 'react';
import { Image, TouchableHighlight, View , StyleSheet, Text, Dimensions } from 'react-native';

export default class Button extends Component{
    render(){
        const {children, style, textStyle, text, iconSource, color, ...props} = this.props;
        var icon;
        //if exsist iconSource prop
        if(iconSource){
            icon = <Image 
                        source={iconSource}
                        style={styles.icon}/>
        }

        return (
            <TouchableHighlight
                // activeOpacity={0.5}
                underlayColor={ color ? color+'aa' : '#ffffffaa'}
                {...props}                
                style={[styles.button, {backgroundColor:color}, style]}>
                    <View style={{
                            flexDirection:'row',
                            alignItems: 'center',   
                            justifyContent: 'center',                                                    
                            paddingVertical:10,                        
                            paddingHorizontal:15,                        
                        }}>
                        { icon }
                        <Text  style={[styles.text, textStyle]}> {text} </Text>
                    </View>
            </TouchableHighlight>
          );
    }
}



const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
        borderRadius:5,
        // borderColor:'#ffffff',
        // borderWidth:2,
        margin:8,
        alignItems: 'center',
        justifyContent: 'center',                                                            
    },
    text:{
        color:'#ffffff',
        fontSize:17,
    },
    icon:{
        resizeMode:'contain',
        width:20,
        height:20,
        marginRight:5
    }
});
  