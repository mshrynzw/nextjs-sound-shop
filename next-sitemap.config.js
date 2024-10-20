/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yourwebsite.com',
  generateRobotsTxt: true,
  outDir: './public',
}