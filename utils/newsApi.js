const https = require('https');
const express = require('express');
const WeekInMs = 7 * 24 * 60 * 60 * 1000;
const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Authorization' : 'Bearer f500386663e845aca59a5b0990355ec8'
      }
    }
const NewsApiConfig = {
  baseUrl: "https://newsapi.org/v2/everything?language=ru&pageSize=100",
  headers: {
    Authorization: "Bearer f500386663e845aca59a5b0990355ec8",
  },
};
const _getCurrentDateString = () => {
  return new Date().toISOString();
};
const _getWeekAgoDateString = () => {
  return new Date(Date.now() - WeekInMs).toISOString();
};
const getUrl = (query) => {
      return `${NewsApiConfig.baseUrl}&from=${_getWeekAgoDateString()}to=${_getCurrentDateString()}&q=${query}`
}


module.exports.getNews = (req, res, next) => {
  https.get( getUrl(req.body.query), options, (apiRes) => {
  let data = '';

  // A chunk of data has been received.
  apiRes.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  apiRes.on('end', () => {
    console.log(JSON.parse(data));
    res.send(JSON.parse(data));
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

};
