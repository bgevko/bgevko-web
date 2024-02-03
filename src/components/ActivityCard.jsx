import Link from "next/link"
import { cn } from "@/lib/utils"

const ActivityCard = ({ date, description, href=null, tagType, className }) => {
	let link;
	const typography = "text-sm text-gray-500";
	if (href !== null) {
		link = (
			<Link href={href} className={cn(typography, "text-blue-500 hover:underline")}>{description}</Link>
		)
	} else {
		link = (
			<p className={typography}>{description}</p>
		)
	}
  return (
		<span className={cn("mx-auto w-full max-w-[480px] px-4 py-4 flex gap-4 items-center bg-white rounded-lg border border-slate-200", className)}>
			<p className="text-xs min-w-max p-2 pr-4 text-gray-400 border-r border-gray-200">{date}</p>
			{link}
			<CardTag tagType={tagType} className="ml-auto"/>
		</span>
  )
}

export default ActivityCard


const CardTag = ({ tagType, className}) => {
	let bgColor;
	let textColor;
	switch (tagType) {
		case "article":
			bgColor = "bg-green-100";
			textColor = "text-green-500";
			break;
		case "feature":
			bgColor = "bg-blue-100";
			textColor = "text-blue-500";
			break;
		case "update":
			bgColor = "bg-purple-100";
			textColor = "text-purple-500";
			break;
		case "remove":
			bgColor = "bg-red-100";
			textColor = "text-red-500";
			break;
		default:
			bgColor = "bg-gray-100";
			textColor = "text-gray-500";
			break;
		}
	return (
		<span className={cn("px-2 py-1 rounded-md text-xs", bgColor, textColor, className)}>{tagType}</span>
		)
}


