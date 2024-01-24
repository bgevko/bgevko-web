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
const db = require('./db')

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
	let dbPostType;
	if (type == 'blog') dbPostType = 'BlogPosts'
	else if (type == 'projects') dbPostType = 'ProjectPosts'
	else if (type == 'notes') dbPostType = 'NotesPosts'
	else {
		console.error("getPostBySlug:error: invalid argument. Must be 'blog', 'projects', or 'notes'")
		return null
	}

	if (slug === undefined) {
		return null
	}

	try {
		const query = await db.pool.query(`SELECT * FROM ${dbPostType} WHERE slug = ?`, [slug])
		const source = query[0][0].content

		const { content, frontmatter } = await compileMDX({
			source,
			components: MDXComponents,
			options: {
				parseFrontmatter: true,
				mdxOptions,
			}
		})
		const id = slug
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
	let dbPostType;
	if (type == 'blog') dbPostType = 'BlogPosts'
	else if (type == 'projects') dbPostType = 'ProjectPosts'
	else if (type == 'notes') dbPostType = 'NotesPosts'
	else {
		console.error("getPostSlugs:error: invalid argument. Must be 'blog', 'projects', or 'notes'")
		return null
	}

	try {
		const postSlugs = await db.pool.query(`SELECT slug FROM ${dbPostType}`)
		return postSlugs[0].map((slug) => slug.slug)
	} catch (err) {
		console.error("getAllSlugs:error: ", err)
		return []
	}
}

export async function getAllPosts(type) {
	let dbPostType;
	if (type == 'blog') dbPostType = 'BlogPosts'
	else if (type == 'projects') dbPostType = 'ProjectPosts'
	else if (type == 'notes') dbPostType = 'NotesPosts'
	else {
		console.error("getAllPosts:error: invalid argument. Must be 'blog', 'projects', or 'notes'")
		return null
	}

	try {
		const posts = await db.pool.query(`SELECT * FROM ${dbPostType}`)
		return posts[0]
	} catch (err) {
		console.error("getAllPosts:error: ", err)
		return []
	}
}

export async function addPost(post) {
	let dbPostType;
	if (!post || !post.type || !post.slug || !post.content) {
		console.error("addPost:error: invalid argument. Must be an object with type, slug, and content")
		return null
	}
	if (post.type == 'blog') dbPostType = 'BlogPosts'
	else if (post.type == 'projects') dbPostType = 'ProjectPosts'
	else if (post.type == 'notes') dbPostType = 'NotesPosts'
	else {
		console.error("addPost:error: invalid argument. Post.type be 'blog', 'projects', or 'notes'")
		return null
	}
	try {
		const query = await db.pool.query(`INSERT INTO ${dbPostType} (slug, content) VALUES (?, ?)`, [post.slug, post.content])
		return query[0]
	} catch (err) {
		console.error("addPost:error: ", err)
		return null
	}
}

export async function queryPostBySlug(slug, type) {
	let dbPostType;
	if (type == 'blog') dbPostType = 'BlogPosts'
	else if (type == 'projects') dbPostType = 'ProjectPosts'
	else if (type == 'notes') dbPostType = 'NotesPosts'
	else {
		console.error("removePostBySlug:error: invalid argument. Must be 'blog', 'projects', or 'notes'")
		return null
	}
	try {
		const query = await db.pool.query(`SELECT * FROM ${dbPostType} WHERE slug = ?`, [slug])
		return query[0]
	} catch (err) {
		console.error("removePostBySlug:error: ", err)
		return null
	}
}

export async function removePostBySlug(slug, type) {
	let dbPostType;
	if (type == 'blog') dbPostType = 'BlogPosts'
	else if (type == 'projects') dbPostType = 'ProjectPosts'
	else if (type == 'notes') dbPostType = 'NotesPosts'
	else {
		console.error("removePostBySlug:error: invalid argument. Must be 'blog', 'projects', or 'notes'")
		return null
	}
	try {
		const query = await db.pool.query(`DELETE FROM ${dbPostType} WHERE slug = ?`, [slug])
		return query[0]
	} catch (err) {
		console.error("removePostBySlug:error: ", err)
		return null
	}
}

export async function updatePostBySlug(slug, post, type) {
	let dbPostType;
	if (type == 'blog') dbPostType = 'BlogPosts'
	else if (type == 'projects') dbPostType = 'ProjectPosts'
	else if (type == 'notes') dbPostType = 'NotesPosts'
	else {
		console.error("updatePostBySlug:error: invalid argument. Must be 'blog', 'projects', or 'notes'")
		return null
	}
	try {
		const query = await db.pool.query(`UPDATE ${dbPostType} SET content = ? WHERE slug = ?`, [post.content, slug])
		// return `Query result: ${query[0]}`
		return query[0]
	} catch (err) {
		console.error("updatePostBySlug:error: ", err)
		return null
	}
}
