require('dotenv').config()

const express = require('express')
// import cors from "cors"
const cors = require('cors')
// const cors = require('cors')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const Model = require('./model/noteModel')
// import { Configuration, OpenAIApi } from "openai";
const{ Configuration,OpenAIApi } = require('openai')

// import {connectDB} from "./db/connect";
const router = require("./routes")



const configuration = new Configuration({
    apiKey: process.env.API_KEY
})

const openai = new OpenAIApi(configuration)

app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(express.json())
app.set('view engine', "ejs")
app.use(express.static('public'))

app.use("/",router)

// app.get('/addImge',async(req,res)=>{
//     try {
//         const image = await userSchema.create([  {
         
//             "imgUrl": "https://images.unsplash.com/photo-1682406749096-b2bb00e1d8f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
//             "description": "bike,bikeclyle"
//         },
//         {
      
//             "imgUrl": "https://media.istockphoto.com/id/1397503546/photo/generic-suv-car.jpg?s=612x612&w=is&k=20&c=iLS78aBpsJrgPPfIAmdoda9HJal471XdBCCEQPe7Ajc=",
//             "description": "car vehicle,fourwheeler"
//         },
//         {
         
//             "imgUrl": "https://media.istockphoto.com/id/1161805849/photo/strawberry-vanilla-chocolate-ice-cream-with-waffle-cone-on-marble-stone-backgrounds.jpg?s=612x612&w=is&k=20&c=gzyg1DzTN-h8-8Jm7QyyUkJ_Bp2nC3Is_URDgRid5zU=",
//             "description": "ice,icecream,food"
//         },
//         {
          
//             "imgUrl": "https://media.istockphoto.com/id/1388645967/photo/pensive-thoughtful-contemplating-caucasian-young-man-thinking-about-future-planning-new.jpg?s=1024x1024&w=is&k=20&c=l5DUIl05Tni3BqFvepuOlOxje_yfhnvoYXFR_vPl5Ac=",
//             "description": "man,person,human"
//         },
//         {
         
//             "imgUrl": "https://media.istockphoto.com/id/1311655328/photo/im-the-best-asset-in-my-business.jpg?s=1024x1024&w=is&k=20&c=slgSdrwzwX_yohBts0TWsCgU8Dy4wodjwlOJlq4jdbA=",
//             "description": "female,girl,human"
//         },
//         {
//             "imgUrl": "https://images.unsplash.com/photo-1682250705830-11c1cecbd3ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
//             "description": "Forest , tree, snow"
//         },
//         {
//             "imgUrl": "https://images.unsplash.com/photo-1674574124792-3be232f1957f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
//             "description": "girls, pink, black"
//         },
//         {
//             "imgUrl": "https://images.unsplash.com/photo-1682542686319-393272073c6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//             "description": "mahal,palace,house"
//         }])
//         return res.json({success:true,message:"Image is uploaded successfully"})
    
//     } catch (error) {
//         return res.json({success:false,message:error})
//     }
    
//     })

app.get("/",(req,res)=>{
    res.render("home",{title:"CODEGPT"})
    res.end()
})

app.post("/",async(req,res)=>{
    try {
        const prompt = req.body.prompt
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            stop: ["\"\"\""],
            // stop: [" Human:", " AI:"],
          })

          res.status(200).send({
            bot: response.data.choices[0].text
          })
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})





const start = async()=>{
  
    // await connectDB('mongodb+srv://shajid10032000:10032000@nodejs-practice.1snhbwp.mongodb.net/gallery?retryWrites=true&w=majority')
  await  mongoose.connect('mongodb+srv://shajid10032000:10032000@nodejs-practice.1snhbwp.mongodb.net/gallery?retryWrites=true&w=majority')

    app.listen(3000,console.log(`Server is listening at ${3000}`))  
    console.log("kkkkk");
}

start()





