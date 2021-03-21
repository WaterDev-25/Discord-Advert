const Discord = require('discord.js');
const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const bodyParser = require("body-parser");
const config = require('./config.json');
const client = new Discord.Client();

var app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

app.get("/", (req, res) => {
    res.render("pages/index");
});

app.post("/api", (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let color = req.body.color;

    const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setDescription(content)

    const channel = client.channels.cache.get(config.channel_id);
    channel.send(embed);

    //res.render("pages/index");
    res.send("The message has been sent.");
});

app.listen(8080);

client.login(config.token);