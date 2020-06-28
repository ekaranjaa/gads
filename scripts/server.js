const express = require('express')
const path = require('path')
const app = express()

const open = require('open')
const port = 3000

const chalk = require('chalk')

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../src/index.html')))

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log(chalk.green('Development server started at http://localhost:3000'))
        open(`http:localhost:${port}`)
    }
})
