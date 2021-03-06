
const http = require('http');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const bluebird = require('bluebird');
const sanitizeHtml = require('sanitize-html');
const toMarkdown = require('to-markdown');
const { Promise } = bluebird;

async function promiseScrape(tag) {
  return new Promise((res, rej) => {
    try {
      const request = http.request({
        hostname: 'www.theoryland.com',
        path: `/intvsresults.php?kw=${escape(tag)}`
      }, (response) => {
        let html = '';
        response.setEncoding('UTF-8');
        response.on('data', (chunk) => {
          html += chunk;
        });
        response.on('error', rej);
        response.on('end', () => {
          res(html);
        });
      });
      request.on('error', rej);
      request.end();
    }
    catch(x) {
      console.error(`/intvsresults.php?kw=${tag}`, x);
    }
  });
}

async function parseHtml(html) {
  const allowedAttributes = sanitizeHtml.defaults.allowedAttributes;
  allowedAttributes.div = ['class'];
  html = sanitizeHtml(html, {
    allowedAttributes
  });
  const $ = cheerio.load(html);
  const wobs = $('.intv-entry-list > ul > li');
  const powerWoBs = {};
  wobs.each((i, e) => {
    const date = $(e).find('.int-date').text();
    const conversation = $(e).find('.entry-data > h4, .entry-data > div');
    const conversationTextLower = conversation.text().toLowerCase();
    const WoT = _.reduce(filters, (a, b) => {
      if(typeof a === 'boolean')
        return a || conversationTextLower.includes(b);
      return conversationTextLower.includes(a) || conversationTextLower.includes(b);
    });
    if(WoT)
      return;
    let tags = '';
    let id = '';
    let title = '';
    const filteredConversation = _.flatten(_.filter(conversation.map((index, element) => {
      element = $(element);
      if([0,1].includes(index)) {
        id += element.text().replace(/( |,|:|\n|\t)/g, '');
        if(index === 1) {
          title = element.text().trim();
        }
        return null;
      }
      if(index === conversation.length - 2)
        return null;
      if(index === conversation.length - 1) {
        tags = _.filter(_.map(element.text().trim().split(','), q => q.trim()));
        return null;
      }
      return _.filter(toMarkdown(sanitizeHtml(element.html().trim())).replace(/\ufffd/g, '\'').split('\n'));
    }).toArray()));

    powerWoBs[id] = {
      date,
      tags,
      title,
      conversation: filteredConversation,
      id
    };
  });

  return powerWoBs;
}

async function sleep(time) {
  return new Promise((res) => {
    setTimeout(res, time);
  });
}

const filters = ['wot', 'robert', 'jordan', 'wheel of time'];

exports.scrapeWobs = async function(tags) {
  const WoBs = {};
  for(let i = 0; i < tags.length; i++) {
    console.log({ tag: tags[i] });
    const [ wobs ] = await Promise.all([
      parseHtml(await promiseScrape(tags[i])),
      sleep(2000)
    ]);
    _.merge(WoBs, wobs);
  }
  await (async () => {
    return new Promise((res, rej) => {
      const dataPath = path.resolve('./utility/data.json');
      const data = JSON.stringify(WoBs, null, 2);
      fs.writeFile(dataPath, data, (err) => {
        if(err) rej(err);
        res();
      });
    });
  })();

  return WoBs;
};

exports.loadWobs = async function({ useSaved }, tags, server) {
  const { scrapeWobs } = server.app.helpers;
  let WoBs;
  if(useSaved) {
    try {
      WoBs = require('../../utility/data');
    }
    catch(x) {}
  }
  if(_.isEmpty(WoBs)) {
    WoBs = await scrapeWobs(tags || require('../../utility/tags'));
  }
  return WoBs;
};

exports.saveWoBs = async function({ useSaved }, WoBs, server) {
  const { wob } = server.db;
  const wobKeys = Object.keys(WoBs);
  await Promise.map(wobKeys, async (key) => {
    try {
      if(useSaved)
        await wob.remove();
      return await wob.create(WoBs[key]);
    }
    catch(x) {
      console.error(x);
    }
  });
  server.log('WoBs Saved!');
};
