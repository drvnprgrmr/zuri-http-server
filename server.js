const http = require('http')
const fs = require('fs').promises

const port = 8000
const host = 'localhost'


let homeFile, aboutFile, contactFile

// home file

fs.readFile(__dirname + "/home.html")
    .then(
        content => {
            homeFile = content
        }
    )
    .catch(
        err => {
            console.error('Could not read home.html file')
            process.exit(1)
        }
    )

// about file

fs.readFile(__dirname + "/about.html")
.then(
    content => {
        aboutFile = content
    }
)
.catch(
    err => {
        console.error('Could not read about.html file')
        process.exit(1)
    }
)

// contact file

fs.readFile(__dirname + "/contact.html")
.then(
    content => {
        contactFile = content
    }
)
.catch(
    err => {
        console.error('Could not read contact.html file')
        process.exit(1)
    }
)


const server = http.createServer(requestListener)

function requestListener(req, res) {
    res.setHeader("Content-Type", "text/html")
    res.writeHead(200)

    switch (req.url) {
        case "/home":
            res.end(homeFile)
            break
        case "/about":
            res.end(aboutFile)
            break
        case "/contact":
            res.end(contactFile)
            break
        default:
            res.end("404")
            
    }
        
}

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})