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
      description: 'Внедрение ИИ-менеджеров продаж для CRM и мессенджеров.',
      areaServed: 'Worldwide',
      serviceType: 'AI sales manager implementation',
      url: baseUrl
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Внедрение ИИ-менеджера продаж',
      provider: {
        '@type': 'Organization',
        name: 'AI Growth Studio'
      },
      serviceType: 'Автоматизация первичной воронки продаж',
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
  var pageTitle = 'ИИ-менеджер продаж для Bitrix24 и amoCRM | AI Growth Studio';
  var pageDescription = 'Внедряем ИИ-менеджера продаж под ваши процессы: быстрые ответы, квалификация лидов, автоматическое заполнение CRM и прозрачные KPI.';

  res.render('index', {
    title: pageTitle,
    subtitle: 'Ускоряет обработку заявок, снимает рутину с отдела продаж и помогает не терять клиентов 24/7.',
    seo: {
      title: pageTitle,
      description: pageDescription,
      canonical: canonicalUrl,
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      author: 'AI Growth Studio',
      themeColor: '#f2f4fb',
      keywords: 'ии менеджер продаж, bitrix24 ai, amocrm ai, автоматизация отдела продаж, ai воронка продаж',
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
    heroMetrics: [
      {
        value: '5-15 сек',
        label: 'время первого ответа клиенту'
      },
      {
        value: 'до 80%',
        label: 'рутинных диалогов без участия менеджера'
      },
      {
        value: '24/7',
        label: 'обработка обращений в любом канале'
      }
    ],
    trustItems: [
      'Договор и NDA',
      'Понятные этапы внедрения',
      'Поддержка после запуска'
    ],
    painPoints: [
      'Клиенты уходят, если не получают быстрый ответ в первые минуты.',
      'Менеджеры перегружены типовыми вопросами и тратят время не на продажи.',
      'Карточки в CRM заполняются не полностью, теряется контекст общения.',
      'В нерабочее время лиды остаются без реакции и остывают.'
    ],
    businessResults: [
      {
        title: 'Скорость реакции',
        description: 'ИИ-менеджер отвечает сразу, даже ночью и в выходные.'
      },
      {
        title: 'Качество первичного контакта',
        description: 'Единый стандарт коммуникации по всем каналам без человеческих срывов.'
      },
      {
        title: 'Прозрачная CRM',
        description: 'Контакты, статусы и история диалога фиксируются автоматически.'
      },
      {
        title: 'Фокус команды на сделках',
        description: 'Менеджеры работают с квалифицированными лидами, а не с рутиной.'
      }
    ],
    capabilities: [
      {
        title: 'Омниканальный вход',
        description: 'Принимает заявки с сайта, WhatsApp, Telegram и других каналов.'
      },
      {
        title: 'Квалификация и сегментация',
        description: 'Задает уточняющие вопросы и определяет приоритет лида.'
      },
      {
        title: 'Работа с возражениями',
        description: 'Использует согласованные сценарии и передает сложные кейсы менеджеру.'
      },
      {
        title: 'Follow-up сообщения',
        description: 'Автоматически возвращает клиента в диалог, если он прервался.'
      },
      {
        title: 'Передача с контекстом',
        description: 'Передает диалог менеджеру вместе с саммари и следующими шагами.'
      },
      {
        title: 'Контроль качества',
        description: 'Логи, аналитика и отчеты по конверсии доступны в одном окне.'
      }
    ],
    audience: [
      'Услуги и сервисные компании',
      'E-commerce и маркетплейсы',
      'Образование и онлайн-школы',
      'Медицина и клиники',
      'Недвижимость и агентства',
      'B2B-дистрибуция и консалтинг'
    ],
    implementation: [
      {
        title: 'Аудит текущего процесса',
        period: '1-3 дня',
        description: 'Разбираем воронку, каналы, скрипты и точки потери лидов.'
      },
      {
        title: 'Проектирование сценариев',
        period: '2-4 дня',
        description: 'Формируем структуру диалогов, правила квалификации и эскалации.'
      },
      {
        title: 'Настройка и интеграции',
        period: '3-7 дней',
        description: 'Подключаем CRM, мессенджеры и бизнес-системы через API/Webhook.'
      },
      {
        title: 'Пилот и контроль качества',
        period: '7-14 дней',
        description: 'Тестируем на части трафика, измеряем KPI и дорабатываем сценарии.'
      },
      {
        title: 'Масштабирование',
        period: 'постоянно',
        description: 'Расширяем сценарии и повышаем конверсию на основе реальных данных.'
      }
    ],
    integrations: [
      'Bitrix24',
      'amoCRM',
      'Telegram',
      'WhatsApp',
      'Instagram',
      'Сайт',
      'Google Sheets',
      '1C',
      'API/Webhook'
    ],
    cases: [
      {
        title: 'Онлайн-образование',
        summary: 'Ускорили обработку заявок и увеличили переход в консультацию.',
        points: ['Ответ: 15-40 мин -> 8 сек', 'Конверсия в консультацию: +31%', 'Горячие лиды сразу в CRM']
      },
      {
        title: 'Сервисный бизнес B2C',
        summary: 'Сняли первичную рутину с отдела и стабилизировали качество коммуникации.',
        points: ['До 72% первичных диалогов автоматизировано', 'Нагрузка менеджеров: -38%', 'Единый тон общения во всех каналах']
      },
      {
        title: 'E-commerce',
        summary: 'Убрали потери лидов в пиковые часы и ночью.',
        points: ['100% обработка входящих заявок', 'Стоимость первичного контакта: -28%', 'Повторные касания в авто-режиме']
      }
    ],
    plans: [
      {
        name: 'Базовый',
        target: 'Для запуска пилота',
        features: ['1-2 канала коммуникации', 'Базовая квалификация лидов', 'Интеграция с CRM и передача менеджеру']
      },
      {
        name: 'Расширенный',
        target: 'Для системной автоматизации',
        features: ['Мультиканальность и follow-up', 'Расширенная логика CRM', 'Отчетность по KPI и еженедельные улучшения']
      },
      {
        name: 'Корпоративный',
        target: 'Для сложных процессов',
        features: ['Кастомные сценарии и API-интеграции', 'SLA и приоритетная поддержка', 'Персональный менеджер проекта']
      }
    ],
    securityPoints: [
      'Работа по договору с фиксированными этапами и критериями приемки.',
      'Подписание NDA и регламента доступа к данным по запросу.',
      'Согласованные правила обработки персональных данных до запуска.',
      'Прозрачный регламент поддержки и управления изменениями.'
    ],
    faqs: [
      {
        question: 'Сколько занимает внедрение?',
        answer: 'Пилотный запуск занимает от 7 дней. Полноценный контур зависит от количества сценариев и глубины интеграций.'
      },
      {
        question: 'ИИ заменит менеджеров полностью?',
        answer: 'Обычно ИИ закрывает рутинные касания и первичную квалификацию, а менеджеры концентрируются на сложных переговорах и закрытии сделок.'
      },
      {
        question: 'Можно сохранить стиль общения бренда?',
        answer: 'Да. Мы настраиваем tone of voice, правила коммуникации и словарь под ваш бренд.'
      },
      {
        question: 'Что происходит, если ИИ не знает ответ?',
        answer: 'Срабатывает сценарий эскалации: клиент передается человеку с полной историей диалога и контекстом запроса.'
      },
      {
        question: 'Как измеряется эффект проекта?',
        answer: 'Через KPI пилота: скорость ответа, доля обработанных лидов, конверсия в этапы воронки и динамика нагрузки на отдел.'
      }
    ],
    contacts: {
      email: 'hello@ai-growth.studio',
      telegram: 'https://t.me/m/Q_flhooMNmYy'
    },
    legalNote: '*Meta Platforms Inc. признана экстремистской организацией и запрещена на территории РФ.'
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
