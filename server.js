//install first before doing the import from the node-modules folder
import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import mongoose from "mongoose"
import dotenv from "dotenv"
import session from "express-session"
import passport from "passport"
import localStrategy from "passport-local"
import MongoStore from "connect-mongo"
import User from './models/Users.js'
import Space from './models/Spaces.js'
import Review from './models/Reviews.js'
import { storage } from './utils/cloudinary.js'
import multer from 'multer'
const upload = multer({ storage })

dotenv.config()     //to use the process dotenv variable

//initialization of app
const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

//mongoes are open database connection


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.listen(process.env.port || 3000, () => {
    mongoose.connect(process.env.database)
    mongoose.connection.on("error", console.error.bind(console, "Connection Error"))
    mongoose.connection.once("open", () => {
        console.log("database connected")
    })
    console.log("we are online: http://localhost:3000")
})


app.get("/", async (req, res) => {
    try {
        const featuredProperty = await Space.find().sort({ rating: -1 }).limit(3)
        let reviews = await Review.find().limit(12);
        res.locals.title = 'Home'
        res.render("index", { featuredProperty: featuredProperty, reviews: reviews });
    } catch (error) {
        console.log(error.message)
    }

})

app.get('/about', async (req, res) => {
    try {

        const aboutProperty = await Space.find().sort({ rating: -1 }).limit(6)
        let reviews = await Review.find().limit(12)
        res.locals.title = 'About Us'
        res.render('about', { aboutProperty: aboutProperty, reviews: reviews })
    } catch (error) {
        console.log(error.message)
    }

})

app.get('/amenities', (req, res) => {
    res.locals.title = 'Amenities'
    res.render("amenities")
})
app.get('/admin', async (req, res) => {
    try {
        res.locals.title = 'Admin'
        let spaces = await Space.find()
        res.render('admin/home', { spaces })
    } catch (error) {
        console.log(error.message)
    }
})
app.get('/admin/add-room', (req, res) => {
    res.locals.title = 'Add Room'
    res.render('admin/add-room')
})
app.get('/contact', (req, res) => {
    res.locals.title = 'Contact Us'
    res.render("contact")
})
app.post('/admin/add-room', upload.array('image'), async (req, res) => {
    try {
        res.locals.title = 'Add room'
        let checkData = await Space.findOne({ name: req.body.name });
        if (checkData) {
            res.redirect('/admin/add-room')
        }
        else {
            req.body.image = req.files.map(f => ({
                url: f.path,
                filename: f.filename
            }))

            await new Space(req.body).save();
            res.redirect('/admin')
        }
    } catch (error) {
        console.log(error.message)
    }

})
app.get('/admin/edit/:id', async (req, res) => {
    try {
        res.locals.title = 'Edit Room'
        let editSpace = await Space.findById(req.params.id)
        res.render('admin/edit', { editSpace })
    } catch (error) {
        console.log(error.message);
    }
})



app.use(express.static(path.join(__dirname, 'public')))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))




