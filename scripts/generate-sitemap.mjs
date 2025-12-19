import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'http://localhost:5173').replace(/\/$/, '')

const projectRoot = path.resolve(__dirname, '..')
const mockDataPath = path.join(projectRoot, 'src', 'data', 'mockData.js')
const { products } = await import(pathToFileURL(mockDataPath).href)

const staticRoutes = ['/', '/catalog', '/about', '/contact', '/cart', '/checkout', '/minha-conta']
const productRoutes = products.map((p) => `/product/${p.slug}`)

const urls = [...staticRoutes, ...productRoutes].map((route) => `${siteUrl}${route}`)

const now = new Date().toISOString()
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map((loc) => `  <url><loc>${loc}</loc><lastmod>${now}</lastmod></url>`)
    .join('\n') +
  `\n</urlset>\n`

const publicDir = path.join(projectRoot, 'public')
fs.mkdirSync(publicDir, { recursive: true })

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8')

const robotsPath = path.join(publicDir, 'robots.txt')
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8')
  const updated = robots.replace(/Sitemap: .*$/m, `Sitemap: ${siteUrl}/sitemap.xml`)
  fs.writeFileSync(robotsPath, updated, 'utf8')
}

console.log(`sitemap.xml gerado (${urls.length} URLs)`)
