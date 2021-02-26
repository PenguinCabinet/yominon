const Discord = require('discord.js');
const client = new Discord.Client();
const fs=require("fs");
const execSync= require('child_process').execSync;
const exec=require("child_process").exec;
const spawn=require("child_process").spawn;

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


async function make_voice(text,id){
    //fs.writeFileSync(`temp${id}.txt`, text);
    //execSync(`open_jtalk temp${id}.txt -m /MMDAgent_Example-1.8/Voice/mei/mei_normal.htsvoice -x /var/lib/mecab/dic/open-jtalk/naist-jdic -ow temp${id}.mp3`, (err, stdout, stderr) => {})
    /*execSync(
	    `open_jtalk -m /MMDAgent_Example-1.8/Voice/mei/mei_normal.htsvoice -x /var/lib/mecab/dic/open-jtalk/naist-jdic -ow temp${id}.mp3`,
	    {stdio:text}
    );*/
	
	let run_f=async function(){
		return new Promise((resolve)=>{
    			let open_jtalk=exec(
		    		`open_jtalk -m /MMDAgent_Example-1.8/Voice/mei/mei_normal.htsvoice -x /var/lib/mecab/dic/open-jtalk/naist-jdic -ow temp${id}.mp3`,
				{env:process.env}
	    		);

			open_jtalk.stdout.pipe(process.stdout);

			open_jtalk.stdin.setEncoding('utf-8');
			open_jtalk.stdin.write(text);
			open_jtalk.stdin.end();
	
			let is_command_end=false;

			open_jtalk.on("close",(code)=>{
				console.log("close");
				is_command_end=true;
				resolve();
			});
		});
	};

	await run_f();

	/*
	while(!is_command_end){
		//console.log(is_command_end);
	}*/


		//open_jtalk.stdin.write(text);
	//open_jtalk.stdin.end();
	
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
    if (message.content==".join" && message.member.voice.channel /* && connection==null*/)
    {
	//console.log(message.member.voice.channel);
	console.log("join the voice channel");
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
		
		make_voice_tasks.push(async function(){
        		await make_voice(message.content,make_voice_task_id_now)
				
       			const dispatcher = connection.play(`temp${make_voice_task_id_now}.mp3`);
			return message.content.length
		});
		

		make_voice_task_id++;
		make_voice_task_id%=make_voice_task_id_max;
        }
    }

});


client.login(process.env.BOT_KEY);

console.log("software started test");
console.log(process.env.BOT_KEY);


//make_voice_tasks_run1=make_voice_tasks_run();


//setInterval(function(){make_voice_tasks_run1.next();}, 100);


var co = require('co');

co(make_voice_tasks_run);
