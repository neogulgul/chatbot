const socket = io()

const messages = document.querySelector("#messages")
const send = document.querySelector("#send")
const input = document.querySelector("#input")

function addMessage(message, monospace) {
	if (monospace) {
		messages.innerHTML += `<div class="message monospace">${message}</div>`
	}
	else {
		messages.innerHTML += `<div class="message">${message}</div>`
	}
}

send.onclick = (e) => {
	e.preventDefault()
	if (input.value) {
		addMessage("You: " + input.value)
		socket.emit("input", input.value.toLowerCase())
		input.value = ""
	}
}

socket.on("output", (output, monospace) => {
	addMessage("Bot: " + output, monospace)
	messages.scroll(0, messages.scrollHeight)
})

socket.on("clear", () => {
	while (messages.hasChildNodes()) {
		messages.removeChild(messages.firstChild)
	}
})
