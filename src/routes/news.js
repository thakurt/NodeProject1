const { default: axios } = require('axios');
const express = require('express')
const newsRouter = express.Router()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
newsRouter.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
newsRouter.use(bodyParser.json())

// Home page router 
newsRouter.get('/', (req, res) => {
    res.render('index')
})

newsRouter.get('/news', async (req, res) => {

    try {

        // storing the api in url
        const url = 'http://newsapi.org/v2/top-headlines?' +
            'country=in&' +
            'apiKey=81df1da26fd54a9dbe7dcf6c9203c8cb';

        // for await and axios goto read me
        const newsApi = await axios.get(url)

        res.render('news', {
            articles: newsApi.data.articles
        })
    } catch (err) {
        if (err.response) {
            console.log(err)
        }

    }
})



newsRouter.post('/search', async (req, res) => {
    const search = req.body.search
    try {

        const url = `http://newsapi.org/v2/everything?q=${search}&apiKey=81df1da26fd54a9dbe7dcf6c9203c8cb`;

        const newsApi = await axios.get(url)
        res.render('news', { articles: newsApi.data.articles })

        // if there are any error then we will get it to console
    } catch (error) {
        if (error.response) {
            console.log(error)
        }

    }
})

// About us Router
newsRouter.get('/about', (req, res) => {
    res.render('about')
})

module.exports = newsRouter
