import * as axios from 'axios'
import { AsyncStorage } from 'react-native'


//const server = "http://sikat.plnsumut.co.id/api"
//const server = "http://devsrv.mindaperdana.com/sikat-backend/public/api"
//const server = "http://localhost:8000/api"
const server = "http://simkat.plnsumut.co.id/plc/public/api"

// Check If user is authenticated
let api_token = null

// (async () => {
//     try{
//         api_token = await AsyncStorage.getItem('api_token')
//     }catch(error){
//         console.log('API:server read api token error')
//     }
// })()

const client = axios.create({
    baseURL: server,
    timeout: 10000,
    headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
    }
})

export default client

class Api {

    constructor(){
        this.api_token = null
        this.client = null
        //this.api_url = "http://devsrv.mindaperdana.com/sikat-backend/public/api"
        //this.api_url = "http://localhost:8000/api"
        this.api_url = "http://simkat.plnsumut.co.id/plc/public/api"
        
    }

    async create(){
        try{
            this.api_token = await AsyncStorage.getItem('api_token')
        }catch(error){
            console.log('API:server read api token error')
        }

        let headers = {
            'Content-Type':'application/json',
            'Accept':'application/json'
        }

        if(this.api_token){
            headers.Authorization = `Bearer ${this.api_token}`
        }

        this.client = axios.create({
            baseURL: this.api_url,
            timeout: 10000,
            headers: headers
        })
    }

    getClient(){
        return this.client
    }
}

export { Api }