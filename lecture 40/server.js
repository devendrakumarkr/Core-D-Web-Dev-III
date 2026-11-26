const express=require("express")
const WebSocket=require("socket.io")
const http=require("http")
const app=express()
const port=3000

const server=http.createServer(app)

const io=new WebSocket.Server(server,{
    cors:{
        origins:"*",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
    console.log("socket Connected:",socket.id)


    socket.on("message",(msg)=>{
        // socket.emit("message",msg) ///sent to the same user
        // io.emit("message",msg) ///sent to the all user
        socket.broadcast.emit("message",msg)
        // io.to("lA1GT0wcOw_nVcCzAAAC").emit("message",msg)// sent to a particaular user with their id
    })

    socket.on("disconnest",()=>{
        console.log("socket disconnected",socket.id)
    })

})


server.listen(port,()=>{
    console.log("connected to server")
})

