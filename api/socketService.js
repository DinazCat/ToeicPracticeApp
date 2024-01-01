import io from 'socket.io-client';
import auth from '@react-native-firebase/auth';
const SOCKET_URL = 'http://192.168.1.11:3000'

class WSService {
    initializeSocket = async()=>{
        try{
            this.socket = io(SOCKET_URL,{
                transports:['websocket']
            })
            // console.log("initializing socket", this.socket)

            this.socket.on('connect',(data)=>{
                console.log("socket connected")
            })

            this.socket.on('disconnect',(data)=>{
                console.log("socket disconnected")
            })

            this.socket.on('error',(data)=>{
                console.log("socket error", data)
            })
            //  this.socket.emit('UserId',auth().currentUser.uid)
        }
        catch(error){
            console.log('socket is not initialize', error)
        }
        
    }
    emit(event,data={}){
        this.socket.emit(event, data)
    }
    on(event,cb){
        this.socket.on(event, cb)
    }
    removeListener(listenerName){
        this.socket.removeListener(listenerName)
    }
}
const socketServices = new WSService()
export default socketServices