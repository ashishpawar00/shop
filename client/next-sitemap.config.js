/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://laxmikrashikendra.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
  },
  exclude: ['/admin/*', '/admin', '/login', '/404'],
  transform: async (config, path) => ({
    loc: path,
    changefreq: path === '/' ? 'daily' : config.changefreq,
    priority: path === '/' ? 1.0 : path.startsWith('/products') ? 0.8 : config.priority,
    lastmod: new Date().toISOString(),
  }),
};
