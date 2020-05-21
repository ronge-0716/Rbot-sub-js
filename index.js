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
  
	  if(command === "sjoin") {
    message.channel.send(
        {embed:{
          title:'bot導入サーバー',
           color: 3066993,
          description: (bot.guilds.map(g => g.name).join("\n")),
          fields: [{
            name: "導入サーバー数",
            value: `${bot.guilds.size}サーバー` },
          ]
        }
      }
      );

  }

if (command === "info"){
    if(message.author.id == '502816456052834314'){
      const infoMessage = args.join(" ");
      const infoch_name = "rbot-info";
      bot.channels.forEach(channel => {
        if (channel.name === "rbot-info"){
          channel.send({embed:{
              title:'Rbotインフォ',
              color: 3066993,
              timestamp: new Date(),
                thumbnail: {
                  url: message.guild.iconURL
                },
              description: (infoMessage),
            }});
          }
        });
}else{message.channel.send('あなたはこのコマンドを実行できません！')}
  }

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
    description: 'Rbot-subが起動しました！',
    fields:[
      {
        name:"認識しているサーバー数",
        value:bot.guilds.size
      },
      {
        name:"認識しているチャンネル数",
        value:bot.channels.size
      },
      {
        name:"認識している人数",
        value:bot.users.size
      },
    ]
  }}
);
            return;
        }
        return;
    });
});

bot.on('message', async (msg) => {

  if (!msg.content.toLowerCase().startsWith(config.prefix) || msg.author.bot) return;
  const args = msg.content.slice(config.prefix.length).split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command == 'help') {
    msg.delete()
    const options = { limit: 15 * 1000, min: 1, max: 10, page: 1}


//helpのページ
    const pages = {
      1: {
        title:"Rbot-subのヘルプです",
        color:3066993,
        description:"下にあるリアクションを押してページ移動してください\nゴミ箱のリアクションを押すとこの埋め込みを消すことができます",
        footer:{
          text:"1/10"
        }
    },//ページ1
      2: {
        title:"作成中..."
      }
    }
//helpのページ

    const awaitReactions = async (msg, m, options, filter) => {
      const { min, max, page, limit } = options;
      m.awaitReactions(filter, { max: 1, time: limit, errors: ['time'] })
        .then(async (collected) => {
        const reaction = collected.first()

        if (reaction.emoji.name === '⬅') {
      await removeReaction(m, msg, '⬅');
      if (options.page != options.min) {
      options.page = options.page - 1;
      await m.edit({ embed: pages[options.page] });
      }
  awaitReactions(msg, m, options, filter);
        }

    else if (reaction.emoji.name === '➡') {
  await removeReaction(m, msg, '➡');
  if (options.page != options.max) {
      options.page = options.page + 1;
      await m.edit({ embed: pages[options.page] });
  }
  awaitReactions(msg, m, options, filter);
    }

    else if (reaction.emoji.name === '🗑') {
  return await m.delete();
    }
    else {
      awaitReactions(msg, m, options, filter);
    };



        }).catch(() => {});
}

    const m = await msg.channel.send({ embed: pages[options.page] });
    await m.react('⬅');
    await m.react('➡');
    await m.react('🗑');

    const filter = (reaction, user) => {
      return ['⬅', '➡', '🗑'].includes(reaction.emoji.name) && user.id == msg.author.id;
    };
    awaitReactions(msg, m, options, filter);
    const removeReaction = async (m, msg, emoji) => {
  try { m.reactions.find(r => r.emoji.name == emoji).users.remove(msg.author.id); } catch(err) {}
    }

    }//command helpの()
});//client.onの()

bot.on('message', async message => {
	if(message.content.indexOf(config.prefix) !== 0) return;
  const { inspect } = require('util');
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase()

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
