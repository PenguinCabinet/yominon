const Discord = require('discord.js');
const client = new Discord.Client();
const fs=require("fs");
const execSync= require('child_process').execSync;

var make_voice_task_id=0;
var make_voice_task_id_max=128;

var make_voice_tasks=[];

const worker = require('worker_threads');

async function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`wait: ${time}`);
    }, time);
  });
}

async function make_voice_tasks_run(){
	while(true){
		//console.log(make_voice_tasks.length);
		if(make_voice_tasks.length==0)
		{
			await wait(100);
			continue;
		}
		//console.log("TRUE----");
		let n=await make_voice_tasks.shift()();
		await wait(1000+100*n);
	}
}


function make_voice(text,id){
    fs.writeFileSync(`temp${id}.txt`, text);
    execSync(`open_jtalk temp${id}.txt -m /MMDAgent_Example-1.8/Voice/mei/mei_normal.htsvoice -x /var/lib/mecab/dic/open-jtalk/naist-jdic -ow temp${id}.mp3`, (err, stdout, stderr) => {})
}

client.once('ready', () => {
    console.log('Ready');
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
	console.log("TRUE1");
        message.member.voice.channel.join().then( connection2 => {
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
		//console.log("TRUE4");
		let make_voice_task_id_now=make_voice_task_id;
		
		make_voice_tasks.push(function(){
			return new Promise(resolve => {
        			make_voice(message.content,make_voice_task_id_now);
        			const dispatcher = connection.play(`temp${make_voice_task_id_now}.mp3`);
				resolve(message.content.length);
			});
		});
		
		//worker.postMessage({"text":,message.content,"id":make_voice_task_id_now,"BOT_KEY":process.env.BOT_KEY,"connection":connection});

		make_voice_task_id++;
		make_voice_task_id%=make_voice_task_id_max;
        }
    }

});


client.login(process.env.BOT_KEY);

console.log("software started");
console.log(process.env.BOT_KEY);


//make_voice_tasks_run1=make_voice_tasks_run();


//setInterval(function(){make_voice_tasks_run1.next();}, 100);


var co = require('co');

co(make_voice_tasks_run);
