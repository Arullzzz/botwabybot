let fetch = require('node-fetch')
let handler = async (m, { conn, text, command  }) => {

  if (!text) throw `*Masukkan inputan yang benar ! Contoh :*\n*.${command} HL|Gans*`

  var text1 = text.split('|')[0]
  var text2 = text.split('|')[1]

  let img = global.API('xteam', '/textpro/3dmetalsilver', {
    text: text1,
    text2: text2
  }, 'APIKEY')
  
  m.reply(global.wait)
  conn.sendFile(m.chat, img, 'img.jpg', null, m)
}
handler.help = ['3dmetalsilver'].map(v => v + ' _text|text_')
handler.tags = ['creator']
handler.limit = true
handler.exp = 5000
handler.command = /^(3dmetalsilver)$/i
module.exports = handler