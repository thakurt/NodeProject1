const express = require('express')
const app = express()
const PORT = process.env.PORT || 1234


//making static files available to app.js
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))

// seting the templating engine
app.set('views', './src/views')
app.set('view engine', 'ejs')



// Routers // using the routes from news.js
const newsRouter = require('./src/routes/news')
app.use('/', newsRouter)

//listen
app.listen(PORT, () => {
    console.log(`Server is running at Port number ${PORT}`)
})