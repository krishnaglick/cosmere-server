
const tags = require('./tags');
const { wob } = require('./model');
const http = require('http');
const cheerio = require('cheerio');
const _ = require('lodash');

async function promiseScrape(tag) {
  return new Promise((res, rej) => {
    console.log({tag});
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
  const $ = cheerio.load(html);
  const wobs = $('.intv-entry-list > ul > li');
  const powerWoBs = [];
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
    const filteredConversation = _.filter(conversation.map((index, element) => {
      element = $(element);
      if([0,1].includes(index)) {
        id += element.text().replace(/( |,|:|\n|\t)/g, '');
        return null;
      }
      if(index === 1) {
        title = element.text();
      }
      if(index === conversation.length - 2)
        return null;
      if(index === conversation.length - 1) {
        tags = _.filter(_.map(element.text().trim().split(','), q => q.trim()));
        return null;
      }
      return element.text().trim();
    }).toArray());

    powerWoBs.push({
      date,
      tags,
      title,
      conversation: filteredConversation,
      id
    });
  });

  return powerWoBs;
}

async function sleep(time) {
  return new Promise((res) => {
    setTimeout(res, time);
  });
}

const filters = ['wot', 'robert', 'jordan', 'wheel of time'];

(async () => {
  try {
    const [,,usedSaved] = process.argv;
    let wobs = [];
    if(usedSaved) {
      wobs = require('./data');
    }
    else {
      for(let i = 0; i < tags.length; i++) {
        wobs.push(await parseHtml(await promiseScrape(tags[i])));
        sleep(1000);
      }
      (require('fs')).writeFileSync(require('path').resolve('./data.json'), JSON.stringify(wobs, null, 2), 'UTF-8');
    }
    await Promise.all(_.map(wobs, async (words) => {
      for(let q = 0; q < words.length; q++) {
        try {
          await wob.create(words[q]);
        }
        catch(x) {
          console.error(x);
        }
      }
    }));
    process.exit(0);
  }
  catch(x) {
    console.error(x);
    process.exit(1);
  }
})();
