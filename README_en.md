# Yominon
Yominon is the bot reading aloud the text messages on the the voice channel for Discord.

# Features
* Yominon is on premises and OSS.
* Yominon use Docker and deploy easily.
* Yominon don't require cloud services.
* Yominon can also run on Raspberry Pi(NOT supported ARMv6). 

# Quick strat
```bash
git clone https://github.com/PenguinCabinet/yominon
cd yominon
vim docker-compose.yml #You write your discord bot key in BOT_KEY of environment variables in this file.
#Or you use "export yominon_BOT_KEY=<your discord bot key>".
docker-compose up -d
```

Please [make the key of the Discord bot](http://discord.com/developers/) and give Yominon the authority appropriately.
```
The needed authority for Yominon.
* Connect voice channels.
* Speak in voice channels.
* Read messages in text channels.
* See channels.
```

#  How to use

1. Yourself join in the voice channel.
2. You write ".join" on any text channel Yominon can read.
3. Yominon join in the voice channel same with you.
4. Yominon read aloud new text message on any text channel Yominon can read.
5. Yominon exit on the voice channel when someone write ".bye" on any text channel Yominon can read.


# Used softwares.

```
open jtalk
mmdagent
```
