require('dotenv').config()
const ngrok = require('@ngrok/ngrok')

const startNgrok = async function () {
	try {
		const url = await ngrok.connect({
			authtoken: process.env.NGROK_AUTHTOKEN,
			proto: 'http',	// http/tcp/tls
			addr: process.env.PORT || 3000,
			region: 'in',
			// subdomain: process.env.SUBDOMAIN,	// Require paid plan
			onStatusChange: (status) => console.log('Ngrok Status: ', status),
			onLogEvent: (data) => console.log('Ngrok Data: ', data),
		})
		console.log('Ngrok Tunnel Created -> ', url)
		console.log('Ngrok Inspector -> http://127.0.0.1:4040')
	} catch (error) {
		console.log('Ngrok Error: ', error)
		process.exit(1)
	}
}

module.exports = startNgrok
