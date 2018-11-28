import React, { Component } from 'react';
import { Image, TouchableHighlight, View , StyleSheet, TextInput } from 'react-native';

export default class TextInputIcon extends Component{
    render(){
        const {children, style, containerStyle, iconLeftSource, placeholder, colorScheme, ...props} = this.props;
        var iconLeft;
        //if exsist iconSource prop
        if(iconLeftSource){
            iconLeft = <Image 
                        source={iconLeftSource}
                        style={styles.icon}/>
        }

        return (
            <View style={[{borderBottomWidth:1,borderBottomColor: colorScheme ? colorScheme+'aa' : 'transparent'}, styles.container, containerStyle ]}>
                { iconLeft }
                <TextInput 
                    {...props} 
                    placeholder={placeholder}
                    style={[{color: colorScheme ? colorScheme : defaultColor},styles.textInput, style, ]}
                    placeholderTextColor={ colorScheme ? colorScheme+'aa' : defaultColor}
                    // underlineColorAndroid={ colorScheme ? colorScheme+'aa' : defaultColor}
                    underlineColorAndroid='transparent'
                    />
            </View>
          );
    }
}

const defaultColor= '#333333';

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        // flex:1,
        marginVertical:5,
        alignItems:'center'
    },
    textInput:{
        flex:1,
        paddingVertical:10,
        height:40,
    },
    icon:{
        resizeMode:'contain',
        width:20,
        height:20,
        marginRight:5
    },
});
  