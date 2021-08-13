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

var ffmpegmeta = require('fluent-ffmpeg')//.Metadata;

let send_voice_loss_time=500;

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
			await wait(1);
			//yield "";
			continue;
		}
		//console.log("TRUE----");
		let id=await make_voice_tasks.shift()();

		let run_f=async function(){
			return new Promise((resolve)=>{

				ffmpegmeta.ffprobe(`/temp_ram/temp${id}.mp3`, function(err,metadata) {
  					//console.log(require('util').inspect(metadata, false, null));
					console.log(metadata)
					if(metadata===undefined){
						resolve(0);
						return;
					}
					//if(!metadata.hasOwnProperty("format"))resolve(0);
					//console.log(metadata.format);
					console.log(metadata.format.duration);
					let wait_time=metadata.format.duration;
					resolve(wait_time);
				});
			})
		};

		let wait_time=await run_f();

		
		await wait(send_voice_loss_time+1000*wait_time);
	}
}


async function make_voice(text,id){
    //fs.writeFileSync(`temp${id}.txt`, text);
    //execSync(`open_jtalk temp${id}.txt -m /MMDAgent_Example-1.8/Voice/mei/mei_normal.htsvoice -x /var/lib/mecab/dic/open-jtalk/naist-jdic -ow temp${id}.mp3`, (err, stdout, stderr) => {})
    /*execSync(
	    `open_jtalk -m /MMDAgent_Example-1.8/Voice/mei/mei_normal.htsvoice -x /var/lib/mecab/dic/open-jtalk/naist-jdic -ow temp${id}.mp3`,
	    {stdio:text}
    );*/

	//text=text.replace(/^([0-9a-zA-Z]|[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]|[ぁ-んァ-ヶ])/g, '');
	
	text=text.replace(/\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/g, '');
	console.log(text);
	
	let run_f=async function(){
		return new Promise((resolve)=>{
    			
			let open_jtalk=exec(
		    		`open_jtalk -m /MMDAgent_Example-1.8/Voice/mei/mei_normal.htsvoice -x /var/lib/mecab/dic/open-jtalk/naist-jdic -ow /temp_ram/temp${id}.mp3`,
				{env:process.env}
	    		);
		
			/*
    			let open_jtalk=exec(
		    		`open_jtalk -x /var/lib/mecab/dic/open-jtalk/naist-jdic -ow /temp_ram/temp${id}.mp3`,
				{env:process.env}
	    		);
		*/

			open_jtalk.stdout.pipe(process.stdout);

			open_jtalk.stdin.setEncoding('utf-8');
			open_jtalk.stdin.write(text);
			open_jtalk.stdin.end();
	
			let is_command_end=false;

			open_jtalk.on("close",(code)=>{
				console.log("generated  voice file");
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

var connection={}

client.on('disconnect',message=>
{
	console.log("Disconnect");
	connection[message.guild.id]=null;
});

client.on('message', message =>
{
	message.G
	//console.log("TRUE0");
	//console.log(message.content);
	//console.log(message.content==".join");
	//console.log(message.member.voice.channel);
    if (message.content==".join" && message.member.voice.channel /* && connection==null*/)
    {
	//console.log(message.member.voice.channel);
	console.log("join the voice channel");
        message.member.voice.channel.join().then( connection2 => {
           connection[message.guild.id]=connection2;
        })
        .catch(console.log);
    }else if (message.content==".bye")
    {
        if(connection[message.guild.id]!=null){
            connection[message.guild.id].disconnect();
            connection[message.guild.id]=null;
        }
    }else{
        if(connection[message.guild.id]!=null){
		//console.log("TRUE4");
		let make_voice_task_id_now=make_voice_task_id;
		
		make_voice_tasks.push(async function(){
        		await make_voice(message.content,make_voice_task_id_now)
				
       			const dispatcher = connection[message.guild.id].play(`/temp_ram/temp${make_voice_task_id_now}.mp3`);
			//return message.content.length
			return make_voice_task_id_now;
		});
		

		make_voice_task_id++;
		make_voice_task_id%=make_voice_task_id_max;
        }
    }

});


client.login(process.env.BOT_KEY);

console.log("software started test");
//console.log(process.env.BOT_KEY);


//make_voice_tasks_run1=make_voice_tasks_run();





make_voice_tasks_run();

