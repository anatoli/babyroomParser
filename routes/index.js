var express = require('express');

var router = express.Router();

function getBaseUrl(req) {
  var forwardedProto = req.headers['x-forwarded-proto'];
  var protocol = forwardedProto ? forwardedProto.split(',')[0] : req.protocol;

  return protocol + '://' + req.get('host');
}

function buildStructuredData(baseUrl) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'AI Growth Studio',
      url: baseUrl,
      email: 'hello@ai-growth.studio',
      sameAs: [
        baseUrl
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'AI Growth Studio',
      description: 'Интеграция AI-агентов для бизнеса: Nextbot, ElevenLabs и персональные AI-боты.',
      areaServed: 'Worldwide',
      serviceType: 'AI agent integration',
      url: baseUrl
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Интеграция AI-агентов для бизнеса',
      provider: {
        '@type': 'Organization',
        name: 'AI Growth Studio'
      },
      serviceType: 'Разработка и внедрение AI-ботов',
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock'
      }
    }
  ];
}

router.get('/', function(req, res) {
  var baseUrl = getBaseUrl(req);
  var canonicalUrl = baseUrl + '/';
  var pageTitle = 'Интеграция AI-агентов для бизнеса | Nextbot и ElevenLabs';
  var pageDescription = 'Внедряем Nextbot и ElevenLabs, создаем персональные AI-боты для продаж, поддержки и роста конверсии бизнеса 24/7.';

  res.render('index', {
    title: pageTitle,
    subtitle: 'Внедряем AI-агентов, которые продают, отвечают и масштабируют вашу команду 24/7.',
    seo: {
      title: pageTitle,
      description: pageDescription,
      canonical: canonicalUrl,
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      author: 'AI Growth Studio',
      themeColor: '#090812',
      keywords: 'интеграция ai агентов, nextbot, elevenlabs, чат-боты для бизнеса, ai автоматизация продаж, персональные ai боты',
      siteName: 'AI Growth Studio',
      locale: 'ru_RU',
      ogType: 'website',
      ogTitle: pageTitle,
      ogDescription: pageDescription,
      ogUrl: canonicalUrl,
      ogImage: baseUrl + '/images/og-cover.svg',
      twitterCard: 'summary_large_image',
      twitterTitle: pageTitle,
      twitterDescription: pageDescription,
      twitterImage: baseUrl + '/images/og-cover.svg'
    },
    structuredData: JSON.stringify(buildStructuredData(baseUrl)),
    highlights: [
      'Nextbot-сценарии для отдела продаж и поддержки',
      'Голосовые агенты на ElevenLabs с естественной речью',
      'Персональные боты под процессы вашей компании'
    ],
    services: [
      {
        title: 'Запуск Nextbot-воронок',
        description: 'Строим цепочки диалогов для квалификации лидов, назначения встреч и повторных касаний без потери теплых клиентов.'
      },
      {
        title: 'Интеграция ElevenLabs',
        description: 'Подключаем голосовых ассистентов в CRM, телефонию и чат-каналы, чтобы клиент получал быстрый и живой ответ в любое время.'
      },
      {
        title: 'Персональные AI-боты',
        description: 'Проектируем кастомных ботов под FAQ, продажи, обучение команды и внутренние регламенты с учетом вашего tone of voice.'
      }
    ],
    process: [
      'Аудит процессов: где AI даст максимум прибыли',
      'Проектирование архитектуры и сценариев диалогов',
      'Интеграция в сайт, мессенджеры, CRM и телефонию',
      'Аналитика, оптимизация и рост конверсии'
    ],
    metrics: [
      { value: 'до 62%', label: 'рост скорости первого ответа' },
      { value: '24/7', label: 'поддержка и обработка заявок' },
      { value: 'x3', label: 'ускорение квалификации лидов' }
    ]
  });
});

router.get('/robots.txt', function(req, res) {
  var baseUrl = getBaseUrl(req);

  res.type('text/plain');
  res.send(
    'User-agent: *\n' +
    'Allow: /\n\n' +
    'Sitemap: ' + baseUrl + '/sitemap.xml\n'
  );
});

router.get('/sitemap.xml', function(req, res) {
  var baseUrl = getBaseUrl(req);

  res.type('application/xml');
  res.send(
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    '  <url>\n' +
    '    <loc>' + baseUrl + '/</loc>\n' +
    '    <changefreq>weekly</changefreq>\n' +
    '    <priority>1.0</priority>\n' +
    '  </url>\n' +
    '</urlset>\n'
  );
});

module.exports = router;
