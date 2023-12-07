import { getPostsMeta } from '@/lib/posts'

export default async function sitemap() {
	const blogMeta = await getPostsMeta('blog')
	const projectsMeta = await getPostsMeta('projects')
	const notesMeta = await getPostsMeta('notes')
	const meta = [...blogMeta, ...projectsMeta, ...notesMeta]

	const dynamicRoutes = meta.map((post) => {
		return {
			url: `${process.env.BASE_URL}${post.href}`,
			lastModified: new Date().toISOString(),
		}
	})

	const staticRoutes = ['', '/blog', '/projects', '/notes', '/contact'].map(
		(route) => {
			return {
				url: `${process.env.BASE_URL}${route}`,
				lastModified: new Date().toISOString(),
			}
		})

	return [...dynamicRoutes, ...staticRoutes]
}
