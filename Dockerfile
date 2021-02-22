FROM ubuntu:18.04

RUN apt-get update \
  && apt-get -y install --no-install-recommends \
    hts-voice-nitech-jp-atr503-m001 \
    open-jtalk \
    open-jtalk-mecab-naist-jdic \
    sox \
    nodejs \
    ffmpeg

RUN apt install curl -y

RUN apt install npm -y

RUN npm config set strict-ssl false

RUN npm install n -g

RUN n stable

RUN apt purge -y nodejs npm
RUN node -v

RUN npm install discord.js node-opus opusscript

COPY ./src/ /

WORKDIR /

ENV PYTHONIOENCODING utf-8 

RUN curl -L "https://ja.osdn.net/frs/g_redir.php?m=jaist&f=mmdagent%2FMMDAgent_Example%2FMMDAgent_Example-1.8%2FMMDAgent_Example-1.8.zip" -o /model.zip

RUN ls

RUN apt install zip -y

RUN unzip model.zip

RUN ls


CMD ["node","main.js"]

