import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Dimensions, Text, Image, ImageBackground, AsyncStorage, Alert, FlatList } from 'react-native';
import { Button, HeaderTitle, HeaderSide, Separator } from './components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';


//API
import server from './api/server';
import { Api } from './api/server';


import CONSTANTS from './helpers/constants';
const window = Dimensions.get('window');

export default class Home extends Component{
    static navigationOptions = ({navigation})=>  {
        return {
            headerTitle: <HeaderTitle text="Home"/> ,
            headerLeft: <HeaderSide icon={CONSTANTS.logo}/> ,
            headerRight: <HeaderSide circle icon={require('./assets/images/user-pic.jpg')} 
                            onPress={()=> {
                                        Alert.alert(
                                            'Anda yakin ingin keluar','',
                                            [
                                                {text: 'Cancel', onPress: ()=> console.log('Cancel Pressed'), style: 'cancel'},
                                                {text: 'OK', onPress: ()=> navigation.state.params.handleLogout() },
                                            ],{ cancelable: false }
                                        )
                                    }}/> ,
        }
    }
    

    constructor(){
        super();

           this._onLogout = this._onLogout.bind(this);
           this._refreshData = this._refreshData.bind(this)
           this._refreshInfo = this._refreshInfo.bind(this)

        this.state = {
            user:{},
            user_detail:{},
            last_poin:null,
            data:[
                {key:1,task:'Segera lakukan pembayaran listrik anda',date:'20-02-2018'},
                {key:1,task:'Dapatkan diskon sushi tei bagi pelanggan yang memiliki minimal 100 poin',date:'28-02-2018'},
                {key:1,task:'Dapatkan diskon tiket XXI bagi pelanggan gold',date:'28-02-2019'},
               
            ],
            slides:[
                {image:'http://www.slidesjs.com/img/example-slide-350-1.jpg'},
                {image:'http://www.slidesjs.com/img/example-slide-350-2.jpg'},
                {image:'http://www.slidesjs.com/img/example-slide-350-3.jpg'},
            ],
            data_news:[],
            data_promo:[]
        }
    }

    renderSlider(){
         if(this.state.slideReady){
             if(this.state.data_news.length > 0){
                let slideshow = this.state.data_news.map((item,index) =>
                    <View style={styles.slide} key={index}>
                        <Image
                            style={styles.imageslide}
                            source={{
                                uri: item.url
                            }}/>  
                    </View>
                );

                return(
                    <Swiper height={80}
                        autoplay={true} autoplayTimeout={5}>
                        {slideshow}
                    </Swiper>
                )
            }
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
                        {this.renderSlider()}
                    <View style={{}}>
                        
                        

                        <View style={styles.greetingBox}>
                                <Text style={styles.textWhite}>Hallo, {this.state.user_detail.name}</Text>
                                <Text style={[styles.textWhite, styles.textBig]}>{/*this.state.user_detail.last_name*/}</Text>
                                <Text style={styles.textWhite}>{/*this.state.user.username*/}</Text>
                                <Text style={[styles.textWhite, styles.textBig]}>POIN ANDA : {this.state.user_detail.last_point}</Text>
                                <Text style={styles.textWhite}>Rp. 50000 </Text>
                        </View>

                    <View style={styles.sectionHead}>
                        <Text style={{fontSize:15, fontWeight:'bold'}}>Information</Text>
                    </View>

                    <FlatList 
                        data={this.state.data_news}
                        keyExtractor={ this._keyExtractor }
                        renderItem={({item}) => (
                                <View style={styles.listItem}>
                                    <Text style={{fontSize:12}}>{item.promotion_title}</Text>
                                    <Text style={{fontSize:9}}>{item.promotion_desc}</Text>
                                </View>
                            )}
                        ItemSeparatorComponent={({highlighted}) => (
                                <Separator/>
                            )}/>
                     </View>
                </ScrollView>
        )
    }



    async _onLogout(){

         ////this.props.navigation.goBack()
         //console.log('yuhuuz')

        //  AsyncStorage.removeItem('user').then(() => {
        //             console.log('Home:logout = User data removed')
        //             // const resetAction = NavigationActions.reset({
        //             //     index: 0,
        //             //     actions: [
        //             //         NavigationActions.navigate({ routeName: 'Login'})
        //             //     ]
        //             // })
        //            // this.props.navigation.dispatch(resetAction)
        //         }).catch((error)=> {
        //             console.log('Home:logout = Error',error)
        //             ToastAndroid.show("Logout error",ToastAndroid.SHORT)
        // })


        this.props.navigation.navigate('Login')


    //      const resetAction = NavigationActions.reset({
    //   index: 0,
    //   actions: [
    //     NavigationActions.navigate({ routeName: 'Login'})
    //   ]
    // })
    // this.props.navigation.dispatch(resetAction)

    }

    async componentWillMount(){
        try{
            let session = await AsyncStorage.getItem('user')
            let user = JSON.parse(session)
            console.log('user',user)
            this.setState({
                user: user
            })

           

        }catch(error){
            console.log('Drawer:willmount Eror read user data',error)
        }

           this._refreshData()
           this._refreshInfo()
    }


    _keyExtractor = (item, index) => index 



    async _refreshData(){

         console.log('/customer/'+ this.state.user.id)

         let api = new Api()
        // Create API
        await api.create()

        let client = api.getClient()
       

        client.get('/customer/'+ this.state.user.table_detail_user_id).then((response) => {
            console.log('/customer/ ',response.data)

        this.setState({
            user_detail : response.data
        })

        // let poin = this.state.user_detail.poin.map(function(val){
        //                 return val.point_balance
        //             })
        //             // test.join(",")
        //             this.setState({
        //                 last_poin: poin
        //             })

        // console.log(poin,'poinnyaaz')


         }).catch((error)=>{
            console.log('RefreshStat:error',error)

        })

    }




     async _refreshInfo(){

        

         let api = new Api()
        // Create API
        await api.create()

        let client = api.getClient()
       

        client.get('/masterNews').then((response) => {
        this.setState({
            data_news : response.data
        })

        console.log(this.state.data_news, 'isi data news')

         }).catch((error)=>{
            console.log('RefreshNews:error',error)

        })


          client.get('/masterInfo').then((response) => {
        this.setState({
            data_promo : response.data
        })

        console.log(this.state.data_promo, 'isi data info')

         }).catch((error)=>{
            console.log('RefreshInfo:error',error)

        })


          this.setState({
                slideReady:true
            });

    }

    componentDidMount(){
        //fetch api slideshow
        //TO DO fetch slideshow with api
        let timeout = setTimeout(function(){
            this.setState({
                slideReady:true
            });
        }.bind(this),3000);

        // binding action via header, ref:
        // https://github.com/react-navigation/react-navigation/issues/145#issuecomment-281418095
        this.props.navigation.setParams({handleLogout:this._onLogout});
    }

}

const styles = StyleSheet.create({
    button:{
        width:250,
        marginVertical:10,
    },
    container:{
        flex:1,
        backgroundColor: '#fff',
    },
    greetingBox:{
        backgroundColor:CONSTANTS.primaryColor,
        alignItems:'center',
        padding:15,
    },
    textWhite:{
        color:'#fff',
        fontSize: 11
        // marginVertical:2,
    },
    textBig:{
        fontSize:20,
        // fontWeight:'bold'
    },
    sectionHead:{
        backgroundColor:'#ddd',
        padding:10
    },
    listItem:{
        padding:10,
    },
    //swiper slideshow
    slide: {
        flex: 1,
        backgroundColor: '#9DD6EB',
    },
    imageslide:{
        flex:1,
        resizeMode:'stretch'
    },
  });