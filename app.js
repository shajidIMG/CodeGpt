import express from "express";
import cors from "cors"
// const cors = require('cors')
const app = express()
import * as dotenv from "dotenv"
import { Configuration, OpenAIApi } from "openai";

dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.API_KEY
})

const openai = new OpenAIApi(configuration)

app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(express.json())
app.set('view engine', "ejs")
app.use(express.static('public'))

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



app.listen(3000,console.log("SerVer is Started"))





