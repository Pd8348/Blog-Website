const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express() 
dotenv.config()


mongoose.connect("mongodb+srv://dhruv8348:1234@cluster0.vph34nr.mongodb.net/")
.then(console.log("MongoDB connected"))
.catch((e)=>console.log(e))

app.set('view engine','ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.get('/',async(req,res)=>{
    const articles = await Article.find().sort({createdAt: "desc"})
    res.render('articles/index',{articles:articles})
})

app.use('/articles',articleRouter)
app.listen(3000)