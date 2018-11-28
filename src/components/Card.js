import React, { Component } from 'react';
import { Image, View , StyleSheet, Text, TouchableNativeFeedback, ImageBackground } from 'react-native';

export default class Card extends Component{
    render(){
        const {children, style, image, imageMode, overlayColor, featuredText, featuredText2,featuredTextStyle, ...props} = this.props;

        return(
            <TouchableNativeFeedback {...props}
                useForeground={true}>
                <View style={[styles.container,style]}>

                    <ImageBackground source={image} 
                        imageStyle={[
                            styles.imageStyle, 
                            imageMode ? {resizeMode:imageMode} : null, //cover(default), contain
                            { borderBottomLeftRadius: children ? 0 : 5, borderBottomRightRadius: children ? 0 : 5 }
                         ]}
                        style={{minHeight:120,justifyContent:'flex-end'}}>

                        <View style={overlayColor ? {backgroundColor:overlayColor, borderRadius:5, flexDirection: 'row',justifyContent:'flex-end'} : null}>
                            <Text style={[{margin:5, flex:1},featuredTextStyle]}>{featuredText}</Text>
                            <Text style={[{margin:5},featuredTextStyle]}>{featuredText2}</Text>
                        </View>

                    

                       
                    </ImageBackground>

                    {children}
                </View>
            </TouchableNativeFeedback>            
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        elevation:2,
        margin:5,
        borderRadius:5,
        // flexGrow:1,    
    },
    imageStyle:{
        borderTopLeftRadius:5,
        borderTopRightRadius:5
    }
})