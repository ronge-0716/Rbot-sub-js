const discord = require('discord.js');
const config = require('./config.json');
const bot = new discord.Client();

bot.on('message', (message) => {
  
  	if(message.isMemberMentioned(bot.user))
	{
		message.reply( '呼びましたか？' );
		return;
	}
  
    if(message.content.indexOf(config.prefix) !== 0) return;
const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
  
  if(command === "ping") {
message.channel.send(` Ping を確認しています...`)
        .then((pingcheck) => pingcheck.edit(`botの速度|${pingcheck.createdTimestamp - message.createdTimestamp} ms\nAPIの速度|${Math.round(bot.ping)}ms`))
  }//ping
  
  if(command  === 'help'){
    message.channel.send({
      embed:{
        title:"Rbot-subのヘルプです",
        color:Math.floor(Math.random()* 100000),
        footer:{
          text:"©ろんげ･|9 Ø /V (?, €#6269",
        },
        description:"今はほとんど機能ないです...すいません...",
        fields:[
          {
            name:"ping",
            value:"botの速さです"
          },
        ]
      }
    })
  }//bot説明

});

bot.on('ready', message =>
{
	console.log('Rbotsb is doing now');
bot.user.setPresence({ game: { name: "[rs!help]でヘルプを表示!Rbotのサブbotです！"} });  
  bot.channels.forEach(channel => {
      const ch_name = "rbot起動ログ";
       if (channel.name === ch_name) {
          channel.send(
  {embed: {
    color: 753684,
    description: 'Rbot-subが起動しました！'
  }}
);
            return;
        }
        return;
    });
});

bot.on('message', async message => {
  const { inspect } = require('util');
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'eval') {
    // Put your userID here
    if (message.author.id !== '502816456052834314', '502816456052834314') {

    let evaled;
    try {
      evaled = await eval(args.join(' '));
      message.channel.send(inspect(evaled));
      console.log(inspect(evaled));
    }
    catch (error) {
      console.error(error);
      message.reply('エラーが発生しました');
    }
  }else message.channel.send("あなたは開発者ではありません")
  }
});//evalコマンド

if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	console.log('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}

bot.login( process.env.DISCORD_BOT_TOKEN );