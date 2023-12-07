import { visit } from "unist-util-visit"
import { fromMarkdown } from 'mdast-util-from-markdown'
import { remark } from "remark"
import remarkParse from 'remark-parse'

// export function getCodeContent(markdown) {
// 	const raw = []
// 	// visit(markdown, "code", (node) => {
// 	// 	raw.push(node.value)
// 	// })
// 	return raw
// }

function getItems(node, current){
	if (!node) return {}

	if (node.type === 'code') {

	}
}

export async function getCodeContent( content ){
	const tree = fromMarkdown(content)
	tree.children.forEach( node => {
		// console.log(node.type)
	})
}
