# Yominon
Yominon is the bot reading aloud the text messages on the the voice channel for Discord.

# Features
* Yominon is on premises and OSS.
* Yominon use Docker and deploy easily.
* Yominon don't require cloud services.
* Yominon can also run on Raspberry Pi. 

# Quick strat
```bash
git clone https://github.com/pengincoalition/yominon
cd yominon
vim docker-compose.yml #You write your discord bot key in BOT_KEY of environment variables.
docker-compose up
```

Please [make the key of the Discord bot](http://discord.com/developers/) and give Yominon the authority appropriately.

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
