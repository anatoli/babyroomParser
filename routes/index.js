var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var resolve = require('url').resolve;
var fs = require('fs');
let brands = ['Cybex', 'GB', 'RÖMER/BRITAX'];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/7d', function(req, res, next) {
  var URL = 'https://7d.by/catalog/kolyaski';
  request(URL, function (err, res2, body) {
    if (err) console.error(err);
    let brandsUrl = {};
    var $ = cheerio.load(body);
    brands.map((brand, index)=>{
      var value = $('[name="ms|vendor"]').find(`option:contains(${brand.toUpperCase()})`).val();
      var text = $('[name="ms|vendor"]').find(`option:contains(${brand.toUpperCase()})`).text();
      $('[name="ms|vendor"] ').children().map((index2, el)=>{
        // var text = el.children[0].data;
        if (text.toUpperCase().indexOf(brand.toUpperCase()) !== -1 ) {
          brandsUrl[brand]={name: brand, value: value, url:'https://7d.by/catalog/kolyaski?ms|vendor='+value };
        }
      });
    });
    fs.writeFileSync("parsingFiles/7D/7d.json", JSON.stringify(brandsUrl), function(err){
      if(err) console.error(err); // если возникла ошибка
      console.log("Асинхронная запись файла завершена. Содержимое файла:");
      BrandPage();
    });
  });
});

router.get('/7dPage', (req, res, next) => {
    BrandPage();
});
 function BrandPage(url='', name='') {
   fs.readFile('parsingFiles/7D/7d.json', 'utf8', (err, data) => {
     if (err) console.error(err);
     console.log(data);
     const parseData = JSON.parse(data);
     for (let key in parseData) {
       request(`${parseData[key].url}`, (err, res, body) => {
         if (err) throw err;
         let $ = cheerio.load(body);
         let listURL = {};
         let array = $('.col-md-4 .text-center');
         array.map((i, el) => {
           listURL[i]= {url: el.attribs['href'], name: parseData[key].name }
         });
         fs.writeFileSync(`parsingFiles/7D/7d_${parseData[key].name.split('/')[0]}_listURL.json`, JSON.stringify(listURL), function(error){
           if(error) throw error; // если возникла ошибка
           getItem();
         })
       })
     }
   })
 }

 function getItem() {
   brands.map((brand, index)=>{
     fs.readFile(`parsingFiles/7D/7d_${brand.split('/')[0]}_listUrl.json`, 'utf8', (err, data) => {
       if(err) console.error(err);
       let listItems = {};
       const listData = JSON.parse(data);
        for (let key in listData) {
         parseItemPage(listData[key])
             .then((model) => {
                listItems[key] = model;
              })
             .catch((err)=> {
                console.error(err)
             })
       };
       fs.writeFile(`parsingFiles/7D/7d_${brand.split('/')[0]}_Items.json`, JSON.stringify(listItems), function(error){
         if(error) throw error; // если возникла ошибка
       })
     })
   })
 }
 function parseItemPage(el) {
   return new Promise((resolve, reject) => {
       request(`https://7d.by/${el.url}`, (err, res, body) => {
         if (err) reject(err);

         let $ = cheerio.load(body);
         let modelItem = {
           name: $('h1').text(),
           brand: el.name,
           url: el.url,
           count: '',
           img: getImageURL(),
           description: ''
         };
         function getImageURL() {
            console.log('STARTANULLLL!')
           const node = $('[data-fancybox="gallery"] img');
           for ( let key in node ) {
              console.log(node[key]);
           };
         }
         resolve(modelItem)
       })
   })
 }



module.exports = router;
