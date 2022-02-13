[English README](./README_en.md)
# よみのん
よみのんはOSSのDiscord読み上げBotです

# 特徴
* よみのんはオンプレミス環境で動作しOSSです
* よみのんはDockerを利用しているため、簡単にデプロイできます
* よみのんはクラウドサービスを利用していません
* よみのんはラズパイ上で動作することができます(ARMv6はサポートしていません)

# Quick strat

## よみのんの構築(推奨方法)

```bash
git clone https://github.com/PenguinCabinet/yominon
cd yominon
vim docker-compose-example.yml 
# docker-compose-example.ymlの環境変数のBOT_KEYに開発者ページで作成したDiscord BotのKeyを入力してください
#もしくはホストOS上で"export yominon_BOT_KEY=<your discord bot key>"を実行します
docker-compose -f docker-compose-example.yml up -d
```

## よみのんの構築(ほかのやりかた)

自前でビルドするため、時間がかかります

```bash
git clone https://github.com/PenguinCabinet/yominon
cd yominon
vim docker-compose.yml 
# docker-compose.ymlの環境変数のBOT_KEYに開発者ページで作成したDiscord BotのKeyを入力してください
#もしくはホストOS上で"export yominon_BOT_KEY=<your discord bot key>"を実行します
docker-compose up -d
```

## Botの作成

[Discordの開発者ページ](http://discord.com/developers/)にアクセスしてBotを作成したのち、よみのんに適切な権限を与えてください
```
よみのんに必要な権限
* メッセージを読む
* メッセージの履歴を読む
* ボイスチャンネルへの接続
* 発言
```

#  使い方

1. あなたがボイスチャンネルに接続します
2. よみのんが読むことのできる適切なテキストチャンネルに".join"と入力します
3. よみのんがあなたと同じボイスチャンネルに参加します
4. よみのんがよみのんが読むことのできるテキストチャンネルで書き込まれたテキストを読み上げます
5. よみのんを退出させたい場合、".bye"と入力します


# よみのんに使用しているソフトウェア

```
open jtalk
mmdagent
```
