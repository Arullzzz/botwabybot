let fetch = require('node-fetch')
let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {
	if (!args || !args[0]) return conn.reply(m.chat, `⺀ Format salah!\n\n*Contoh* : _${usedPrefix + command} lathi_`, m)
	let text = args.join` `
	let name = conn.getName(m.sender)
	fetch('https://mnazria.herokuapp.com/api/jooxnich?search=' + encodeURIComponent(text))
    	.then(res => res.json())
    	.then(joox => {
    fetch('http://crop.us.to/api.php?url=' + joox.result.mp3Url)
    	.then(res => res.json())
    	.then(json => {
	if(json.error == false) {
    		conn.reply(m.chat, global.wait, m)
    		conn.sendFile(m.chat, joox.result.imgSrc, 'thumbnail.jpg', `*[ JOOX PLAY ]*\n\n	○ ${joox.result.msinger + ' - ' + joox.result.msong}\n\n*Sedang mengirim audio . . .*`, m)
    		conn.sendFile(m.chat, joox.result.mp3Url, joox.result.msinger + ' - ' + joox.result.msong + '.mp3', '', m, false, { asDocument: true })
			}
		})
	}) .catch(() => { conn.reply(m.chat,global.error, m) })
}
handler.help = ['joox'].map(v => v + ' _title_')
handler.tags = ['downloader','premium']
handler.command = /^(joox)$/i
handler.fail = null
handler.limit = true
handler.premium = true
handler.exp = 500
module.exports = handler