import Link from "next/link"
import { cn, formatDateMonthDay } from "@/lib/utils"

const ActivityCard = ({ entry, className }) => {
	let link;
	// console.log(entry)
	const typography = "text-sm text-gray-500";
	if (entry.URL !== null) {
		link = (
			<Link href={entry.URL} className={cn(typography, "text-blue-500 hover:underline")}>{entry.Description}</Link>
		)
	} else {
		link = (
			<p className={typography}>{entry.Description}</p>
		)
	}

	const date = formatDateMonthDay(entry.ActivityDate)
  return (
		<span className={cn("mx-auto w-full max-w-[480px] px-4 py-4 flex gap-4 items-center bg-white rounded-lg border border-slate-200", className)}>
			<p className="text-xs min-w-max p-2 pr-4 text-gray-400 border-r border-gray-200">{date}</p>
			{link}
			<ActivityTag 
				ActivityType={entry.ActivityType}
				ActionType={entry.ActionType} 
				className="ml-auto"/>
		</span>
  )
}

export default ActivityCard


const ActivityTag = ({ ActivityType, ActionType, className}) => {
	const actionText = ActivityType === "features" ? "feature" : ActionType;
	let bgColor;
	let textColor;
	switch (ActionType) {
		case "added":
			bgColor = "bg-green-100";
			textColor = "text-green-500";
			if (ActivityType === "features") {
				bgColor = "bg-blue-100";
				textColor = "text-blue-500";
			}
			break;
		case "updated":
			bgColor = "bg-purple-100";
			textColor = "text-purple-500";
			break;
		case "deleted":
			bgColor = "bg-red-100";
			textColor = "text-red-500";
			break;
		default:
			bgColor = "bg-gray-100";
			textColor = "text-gray-500";
			break;
		}
	return (
		<span className={cn("px-2 py-1 rounded-md text-xs", bgColor, textColor, className)}>{actionText}</span>
		)
}


