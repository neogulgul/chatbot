const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const mysql = require("mysql")

const port = 3000

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "chatbot"
})

const table = {}

const monospaceInputs = [
	"dennis ritchie",
	"hello, world in c",
	"hello, world in c++",
	"!help"
]

db.connect((error) => {
	if (error) { throw error }
	db.query("SELECT * FROM io", (error, result) => {
		if (error) { throw error }
		result.forEach(row => {
			table[row.input] = row.output
		})

		main()
	})
})

function main() {
	app.use(express.static(__dirname + "/public"))

	app.get("/", (req, res) => {
		res.sendFile(__dirname + "/index.html")
	})

	server.listen(port, () => {
		console.log(`Example app listening on port ${port}.`)
	})

	io.on("connection", (socket) => {
		socket.on("input", (input) => {
			if (input === "clear") {
				io.emit("clear")
			}
			else {
				let output = ""
				if (input === "!help")
				{
					output += "Available commands:"
					Object.keys(table).forEach(key => {
						output += "\r\n\t- " + key
					})
				}
				else
				{
					output = table[input]
					if (output === undefined) {
						output = "I did not understand that..."
					}
				}
				output = output.replaceAll("<", "&lt;")                      // less than
				output = output.replaceAll(">", "&gt;")                      // greater than
				output = output.replaceAll(" ", "&nbsp;")                    // space
				output = output.replaceAll("\t", "&nbsp;&nbsp;&nbsp;&nbsp;") // tab
				output = output.replaceAll("\r\n", "<br>")                   // line break
				let monospace = false
				if (monospaceInputs.includes(input)) {
					monospace = true
					output = "<br>" + output
				}
				io.emit("output", output, monospace)
			}
		})
	})
}
