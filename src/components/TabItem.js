import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'

// Asset
import Icon from 'react-native-vector-icons/MaterialIcons'

import CONSTANTS from '../helpers/constants';




class TabItem extends Component {

    constructor(props){
        super(props)
    }

    render(){
        return(
            <TouchableOpacity onPress={ this.props.onPress || null } style={[styles.tabItem,this.props.active ? styles.tabActive : {}]}>
                <Text style={ styles.tabText }>{ this.props.text || 'ITEM'}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    tabItem:{
        height: 45,
        paddingTop:8,
        paddingBottom:8,
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    tabActive:{
        borderBottomWidth:3,
        borderColor: CONSTANTS.primaryColor,
    },
    tabText: { 
        fontSize:13,
       
        color: 'grey'
    }
})
export default TabItem