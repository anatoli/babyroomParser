#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const http = require('http');
const app = require('../app');

const outputDir = path.resolve(__dirname, '..', 'docs');
const outputStylesDir = path.join(outputDir, 'stylesheets');
const outputImagesDir = path.join(outputDir, 'images');
const pagesBaseUrl = 'https://aibotstudio.info/';

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeStaticFiles(renderedHtml) {
  const normalizedHtml = renderedHtml
    .replaceAll('https://aibotstudio.info/', pagesBaseUrl)
    .replace('href="/stylesheets/style.css"', 'href="./stylesheets/style.css"');

  ensureDir(outputDir);
  ensureDir(outputStylesDir);
  ensureDir(outputImagesDir);

  fs.writeFileSync(path.join(outputDir, 'index.html'), normalizedHtml, 'utf8');
  fs.copyFileSync(
    path.resolve(__dirname, '..', 'public', 'stylesheets', 'style.css'),
    path.join(outputStylesDir, 'style.css')
  );
  fs.copyFileSync(
    path.resolve(__dirname, '..', 'public', 'images', 'og-cover.svg'),
    path.join(outputImagesDir, 'og-cover.svg')
  );

  fs.writeFileSync(
    path.join(outputDir, 'robots.txt'),
    'User-agent: *\nAllow: /\n\nSitemap: ' + pagesBaseUrl + 'sitemap.xml\n',
    'utf8'
  );
  fs.writeFileSync(
    path.join(outputDir, 'sitemap.xml'),
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      '  <url>\n' +
      '    <loc>' + pagesBaseUrl + '</loc>\n' +
      '    <changefreq>weekly</changefreq>\n' +
      '    <priority>1.0</priority>\n' +
      '  </url>\n' +
      '</urlset>\n',
    'utf8'
  );
  fs.writeFileSync(path.join(outputDir, '.nojekyll'), '', 'utf8');
}

function build() {
  const server = app.listen(0, '127.0.0.1', function () {
    const port = server.address().port;
    const request = http.request(
      {
        host: '127.0.0.1',
        port: port,
        path: '/',
        method: 'GET',
        headers: {
          Host: 'aibotstudio.info',
          'X-Forwarded-Proto': 'https'
        }
      },
      function (response) {
        let data = '';
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
          data += chunk;
        });
        response.on('end', function () {
          if (response.statusCode !== 200) {
            server.close(function () {
              process.stderr.write('Failed to render index: HTTP ' + response.statusCode + '\n');
              process.exit(1);
            });
            return;
          }

          writeStaticFiles(data);
          server.close(function () {
            process.stdout.write('Docs build complete.\n');
          });
        });
      }
    );

    request.on('error', function (error) {
      server.close(function () {
        process.stderr.write('Build request failed: ' + error.message + '\n');
        process.exit(1);
      });
    });

    request.end();
  });
}

build();
