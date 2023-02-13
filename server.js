const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const fs = require("fs")
const db = require("./services/db")

const port = 3000

function random(min, max) { return Math.floor(Math.random() * (max + 1 - min)) + min }

app.use(express.static(__dirname + "/public"))

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html")
})

server.listen(port, () => {
	console.log(`Example app listening on port ${port}.`)
})

io.on("connection", async (socket) => {
	const monospaceInputs = [
		"hello, world in c",
		"hello, world in c++",
		"!help"
	]

	const monkeImages = []

	fs.readdir("public/assets/img", (error, files) => {
		if (error) { throw error }
		files.forEach(file => {
			monkeImages.push(file)
		})
	})

	const table = await db.getIO()

	let availableCommands = "Available commands:"
	Object.keys(table).forEach(key => {
		availableCommands += "\r\n\t- " + key
	})
	availableCommands += "\r\n\t- monke"
	availableCommands += "\r\n\t- clear"

	socket.on("input", (input) => {
		if (input === "clear") {
			io.emit("clear")
		}
		else if (input === "monke") {
			// todo: this
			const randomIndex = random(0, monkeImages.length - 1)
			const randomImage = monkeImages[randomIndex]
			io.emit("output", `<img src="assets/img/${randomImage}">`)
		}
		else {
			let output = ""
			if (input === "!help") {
				output = availableCommands
			}
			else {
				output = table[input]
				if (output === undefined) {
					output = "I did not understand that ¯\\_(ツ)_/¯"
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
