var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var resolve = require('url').resolve;
var fs = require('fs');
xml2js = require('xml2js');

router.get('/', function(req, res, next) {
    let parser = new xml2js.Parser();
    console.log(`DeirNameFile = ${__dirname + '/ex.xml'} =>`);
    fs.readFile(__dirname + '/foo.xml', function(err, data) {
        parser.parseString(data, function (err, result) {
            console.dir(result);
            console.log('Done');
            res.send(result[1]);
        });
    });
});

module.exports = router;

