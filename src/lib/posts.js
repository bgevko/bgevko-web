import { promises as fs } from 'fs'
import matter from "gray-matter"
import { compileMDX } from 'next-mdx-remote/rsc'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import MDXComponents from '@/components/MDXComponents'
import { formatDate } from '@/lib/utils'
import { visit } from "unist-util-visit"

const path = require('path')

const autolinkOptions = {
	properties: {
		className: ["subheading-anchor"],
		ariaLabel: "Link to section",
	},
}

const rehypeExtractCodeContents = () => (tree) => {
	visit(tree, (node) => {
		if (node?.type === "element" && node?.tagName === "pre") {
			const codeValue = []
			const [codeEl] = node.children

			codeEl.children.forEach((child) => {
				codeValue.push(child.value)
				if (child.children) {
					codeValue.push(child.children[0].value)
				}
			})
			const data = codeValue.filter(Boolean).join("")
			node.properties["codeData"] = data
		}
	})
}

const mdxOptions = {
	remarkPlugins: [],
	rehypePlugins: [
		rehypeSlug,
		rehypeHighlight,
		[ rehypeAutolinkHeadings, autolinkOptions ],
		[ rehypeExtractCodeContents ],
	],
}

export async function getPostBySlug(slug, type) {
	if (type != 'blog' && type != 'projects' && type != 'notes') {
		console.error("getPostBySlug:error: invalid argument. Must be 'blog', 'projects', or 'notes'")
		return null
	}

	if (slug === undefined) {
		return null
	}

	try {
		const fileDir = `content/${type}/${slug}.mdx`
		const source = await fs.readFile(fileDir, 'utf8')

		const { content, frontmatter } = await compileMDX({
			source,
			components: MDXComponents,
			options: {
				parseFrontmatter: true,
				mdxOptions,
			}
		})
		// console.log("Pre component: ", content.props.components.pre)
		const id = slug.replace(/\.mdx?$/, '')
		const postObj = {
			meta: { 
				id, 
				date: frontmatter.date !== undefined ? formatDate(frontmatter.date) : null,
				category: frontmatter.category || "General",
				title: frontmatter.title, 
				description: frontmatter.description,
				image: frontmatter.image,
				tags: frontmatter.tags || [],
				href: `/${type}/${slug}`,
				backlink: `/${type}`,
				featured: frontmatter.featured ? true : false,
			},
			content,
			raw: source,
		}

		return postObj
	} catch (err) {
		console.error("getPostBySlug:error: ", err)
		return null
	}
}

export async function getPostsMeta(type) {
	if (type != 'blog' && type != 'projects' && type != 'notes') {
		console.error("getPostsMeta:error: invalid argument. Must be 'blog', 'projects', or 'notes'")
		return null
	}
	try {
		const slugs = await getPostSlugs(type)

		if (!slugs) {
			return []
		}

		const postsMeta = await Promise.all(slugs.map(async (slug) => {
			const post = await getPostBySlug(slug, type)
			if (post) {
				return post.meta}
			}))

		return postsMeta.sort((a, b) => new Date(b.date) - new Date(a.date));
	} catch (err) {
		console.error("getPostsMeta:error: ", err)
		return []
	}
}

async function getPostSlugs(type) {
	// Assumes that the directory is in the `content` folder
	try {
		// const fileDir = path.join(process.cwd(), 'content', dir)
		const fileDir = `content/${type}`

		const filenames = await fs.readdir(fileDir, 'utf8')

		return filenames
			.filter(path => /\.mdx?$/.test(path))
			.map(path => path.replace(/\.mdx?$/, ''))
	} catch (err) {
		console.error("getAllSlugs:error: ", err)
	}
}

