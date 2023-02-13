const socket = io()

const messages = document.querySelector("#messages")
const send = document.querySelector("#send")
const input = document.querySelector("#input")

let lastInput = ""

function addMessage(message, monospace) {
	if (monospace) {
		messages.innerHTML += `<div class="message monospace">${message}</div>`
	}
	else {
		messages.innerHTML += `<div class="message">${message}</div>`
	}
}

document.body.onkeyup = (e) => {
	const key = e.key
	if (key === "ArrowUp"
	    &&
	    document.activeElement === input
	    &&
	    input.value != lastInput)
	{
		input.value  = lastInput
	}
}

send.onclick = (e) => {
	e.preventDefault()
	if (input.value) {
		addMessage("You: " + input.value)
		socket.emit("input", input.value.toLowerCase(), socket.id)
		lastInput = input.value
		input.value = ""
	}
}

socket.on("output", (output, monospace = false) => {
	addMessage("Bot: " + output, monospace)
	messages.scroll(0, messages.scrollHeight)
})

socket.on("clear", () => {
	while (messages.hasChildNodes()) {
		messages.removeChild(messages.firstChild)
	}
})
