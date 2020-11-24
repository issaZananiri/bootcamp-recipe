const express = require('express')
const server = express()
const request = require('request')
const path = require('path')
const port = 8080
server.use(express.static(path.join(__dirname,`dist`)))
server.use(express.static(path.join(__dirname,`node_modules`)))
server.get('/sanity', (req, res) => res.send("OK"))
server.get('/', (req, res) => res.send("OK"))
server.get('/recipes/:ingredient', (req, res) => {
    const ingredient = req.params.ingredient
    let api = `https://recipes-goodness.herokuapp.com/recipes/${ingredient}`
    request(api, function (error, response, body) {
        let recipeData = JSON.parse(body).results
        let realData = recipeData.map(r => {
            return {
                title: r.title,
                ingredients: r.ingredients,
                thumbnail: r.thumbnail,
                href: r.href,
            }
        })
        res.send(realData)
    })
})
server.listen(port, () => console.log(`Server running on http://localhost:${port}`))
