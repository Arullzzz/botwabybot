let handler = async (m, { conn, text, participants }) => {
  function getRandom(min,max){
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random()*(max-min+1)) + min
  }

  user = text.split('@')[1] + "@s.whatsapp.net"

  if (typeof global.DATABASE.data.users[user] == 'undefined') return m.reply(`*Orang yang anda tag tidak terdaftar di bot.*`)

  if (!text){
    return conn.reply(m.chat,'*Tag nama orang yang ingin anda sewa jasanya.*',m)
  }else if(global.DATABASE.data.users[text] == "undefined"){
    return conn.reply(m.chat,'*Orang yang anda tag tidak menawarkan jasa apapun.*',m)
  }else {


    if (m.sender == user){
      return conn.reply(m.chat,'*Tidak bisa menyewa diri sendiri',m)
    }else if (global.DATABASE.data.users[m.sender].exp < global.DATABASE.data.users[user].price){
      return conn.reply(m.chat,`Uang anda miliki tidak cukup untuk membeli jasa dari @${user.split('@')[0]}\n\nSaldo anda : Rp. ${global.DATABASE.data.users[m.sender].exp.toLocaleString()},-\nHarga jasa : Rp. ${global.DATABASE.data.users[user].price.toLocaleString()},-`,m,{contextInfo: {
        mentionedJid: [user]
      }})
    }else {
      if (global.DATABASE.data.users[user].job === "x"){
        return conn.reply(m.chat,'*Orang yang anda tag tidak menawarkan jasa apapun.*',m)  
      }else if (global.DATABASE.data.users[user].job === "lonte"){
        global.DATABASE.data.users[m.sender].exp -= global.DATABASE.data.users[user].price
        global.DATABASE.data.users[user].exp += global.DATABASE.data.users[user].price
        conn.reply(m.chat,`*❏  J A S A  L O N T E*\n\n@${m.sender.split('@')[0]} : "Aku masukin ya sayang ahhh"\n@${user.split('@')[0]} : "Aduuh pelan pelan dong, enaaak"\n@${m.sender.split('@')[0]} : "Aaaah aaaahhh, croooot"\n\nBiaya sewa : Rp. ${global.DATABASE.data.users[user].price.toLocaleString()}`,m,{contextInfo: {
          mentionedJid: [m.sender,user]
        }})
        global.DATABASE.data.users[user].price = 0
        global.DATABASE.data.users[user].job = "x"
      }else if (global.DATABASE.data.users[user].job === "pijat"){
        global.DATABASE.data.users[m.sender].exp -= global.DATABASE.data.users[user].price
        global.DATABASE.data.users[user].exp += global.DATABASE.data.users[user].price
        conn.reply(m.chat,`*❏  J A S A  P I J A T*\n\n@${m.sender.split('@')[0]} : "Bagian sininya pijat yang enak ya bangsat"\n@${user.split('@')[0]} : "Iya suhu, sabar, ini lagi di pijat, huft"\n@${m.sender.split('@')[0]} : "Aaaah aaaahhh jangan ke alat vital dooong"\n\nBiaya sewa : Rp. ${global.DATABASE.data.users[user].price.toLocaleString()}`,m,{contextInfo: {
          mentionedJid: [m.sender,user]
        }})
        global.DATABASE.data.users[user].price = 0
        global.DATABASE.data.users[user].job = "x"
      }else if (global.DATABASE.data.users[user].job === "sepong"){
        global.DATABASE.data.users[m.sender].exp -= global.DATABASE.data.users[user].price
        global.DATABASE.data.users[user].exp += global.DATABASE.data.users[user].price
        conn.reply(m.chat,`*❏  J A S A  S E P O N G*\n\n@${m.sender.split('@')[0]} : "Ayok aku buka dulu celananya"\n@${user.split('@')[0]} : "Waduh gede kali om, mmppsss"\n@${m.sender.split('@')[0]} : "Croooot, telen ayo telen"\n\nBiaya sewa : Rp. ${global.DATABASE.data.users[user].price.toLocaleString()}`,m,{contextInfo: {
          mentionedJid: [m.sender,user]
        }})
        global.DATABASE.data.users[user].price = 0
        global.DATABASE.data.users[user].job = "x"
      }else if (global.DATABASE.data.users[user].job === "maling"){
        let users = participants.map(u => u.jid)
        var tag
		    tag = users[Math.floor(users.length * Math.random())]
        while(typeof global.DATABASE.data.users[tag] == "undefined" || global.DATABASE.data.users[tag].limit == 0) tag = users[Math.floor(users.length * Math.random())]
        limitMax = getRandom(1,Math.floor(global.DATABASE.data.users[user].price/100000)*2)
        if (global.DATABASE.data.users[tag].limit < limitMax){
          limitMax = global.DATABASE.data.users[tag].limit
        }
        global.DATABASE.data.users[tag].limit -= limitMax
        global.DATABASE.data.users[m.sender].limit += limitMax
        global.DATABASE.data.users[m.sender].exp -= global.DATABASE.data.users[user].price
        global.DATABASE.data.users[user].exp += global.DATABASE.data.users[user].price
        conn.reply(m.chat,`*❏  J A S A  M A L I N G*\n\n@${user.split('@')[0]} : "Woy bangsat sini gw maling limit lu !"\n@${tag.split('@')[0]} : "Ampuuuun ndan, hiks hiks"\n\n_5 Menit kemudian_\n\n@${user.split('@')[0]} : "Ni bos hasil maling limitnya si @${tag.split('@')[0]} cuma dapet ${limitMax} limit"\n@${m.sender.split('@')[0]} : "Oke siap njing"\n\nBiaya sewa : Rp. ${global.DATABASE.data.users[user].price.toLocaleString()}`,m,{contextInfo: {
          mentionedJid: [m.sender,user,tag]
        }})
        global.DATABASE.data.users[user].price = 0
        global.DATABASE.data.users[user].job = "x"
      }
    }
  }

}
handler.help = ['sewa _@user_']
handler.tags = ['fun','game']
handler.command = /^sewa$/i
handler.admin = false
handler.group = true
handler.botAdmin = false
handler.limit = true
module.exports = handler