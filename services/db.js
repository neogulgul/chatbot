const mysql = require("mysql2/promise")

async function getConnection() {
	return mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "chatbot"
	})
}

async function getIO() {
	const connection = await getConnection()
	const result = await connection.execute("SELECT * FROM io")
	const table = {}
	result[0].forEach(row => {
		table[row.input] = row.output
	})
	await connection.end()
	return table
}

module.exports = {
	getIO
}
