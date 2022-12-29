const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const PORT = process.env.PORT || 3000;
const url = "https://www.skysports.com/football"
try {
  axios(url).then(response =>{
    const data = response.data;
    const $ = cheerio.load(data);
    let store = [];

    $(".news-list__item", data).each(function (){
      const title = $(this).text();
      const url = $(this).find("a").attr("href");
      store.push({
        title,
        url,
      });
      app.get("/",(req,res)=>{
        res.send(store);
      });
     });
  });
} catch (error) {
  console.log(error);
}

app.listen(PORT, () => {
  console.log(`server is running on PORT:${PORT}`);
});