const Discord = require('discord.js');
const client = new Discord.Client();
const fs=require("fs");
const execSync= require('child_process').execSync;

function make_voice(text){
    fs.writeFileSync("temp.txt", text);
    execSync(`open_jtalk temp.txt -m /MMDAgent_Example-1.8/Voice/mei/mei_normal.htsvoice -x /var/lib/mecab/dic/open-jtalk/naist-jdic -ow temp.mp3`, (err, stdout, stderr) => {})
}

client.once('ready', () => {
    console.log('準備完了！');
});

var connection=null

client.on('disconnect',message=>
{
	console.log("disconnect");
	connection=null;
});

client.on('message', message =>
{
	//console.log("TRUE0");
	//console.log(message.content);
	//console.log(message.content==".join");
	//console.log(message.member.voice.channel);
    if (message.content==".join" /*&& message.member.voice.channel && connection==null*/)
    {
	    //console.log("TRUE1");
        message.member.voice.channel.join().then( connection2 => {
            /*
            const dispatcher = connection.playFile('test.mp3');
            dispatcher.on('end', reason => {
                connection.disconnect();
            });
            */
           connection=connection2;
        })
        .catch(console.log);
    }else if (message.content==".bye")
    {
        if(connection!=null){
            connection.disconnect();
            connection=null;
        }
    }else{
        if(connection!=null){
            make_voice(message.content)
            const dispatcher = connection.play('temp.mp3');
        }
    }

});


client.login(process.env.BOT_KEY);
