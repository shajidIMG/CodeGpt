const express = require("express")
const router = express.Router()
const Model = require('./model/noteModel')

router.route('/addImage').post(async(req,res)=>{
    try {
        const image = await Model.create(req.body)
        return res.json({success:true,message:"Image is uploaded successfully"})
    
    } catch (error) {
        return res.json({success:false,message:error})
    }
    
    })

    router.route('/getImage').get(async(req,res)=>{
        try {
            let parsed = await Model.find()
            let page = Number(req.query.page) || 1
            let per_page = Number(req.query.perPage) || 5
           let offset = (page - 1) * per_page
    
      let  totalPages = Math.ceil(parsed.length / per_page)
    //   console.log(totalPages,page,offset,per_page)
        let nextPage = (totalPages > page) ? page + 1 : null
        parsed  = parsed.slice(offset).slice(0, per_page)
        res.status(200).json({data:parsed,totalPages,nextPage,page})
        
        } catch (error) {
            return res.json({success:false,message:error})
        }
        
        })

    module.exports = router