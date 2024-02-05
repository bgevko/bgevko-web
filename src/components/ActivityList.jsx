'use client';
import React, {useState, useMemo} from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Components
import ActivityCard from '@/components/ActivityCard.jsx'

const ActivityList = ( { activityLogs } ) => {
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(5)
	const [totalPages, setTotalPages] = useState(1)

	const activityCards = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage
		const end = start + itemsPerPage
		const currentActivityLogs = activityLogs.slice(start, end)

		return currentActivityLogs.map((entry, index) => {
			return (
				<ActivityCard key={index} entry={entry} />
			)
		})
	}, [activityLogs, currentPage, itemsPerPage])

	const pageNumbers = useMemo(() => {
		const pageNumbers = []
		for (let i = 1; i <= Math.ceil(activityLogs.length / itemsPerPage); i++) {
			pageNumbers.push(i)
		}
		return pageNumbers
	}, [activityLogs, itemsPerPage])

	const buttonStyle = "w-[40px] h-[40px] text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
	const activeButtonStyle = "border text-slate-600 hover:bg-white cursor-default"
	const pageButtons = pageNumbers.map((number) => {
			return (
				<button 
					key={number} 
					onClick={() => handlePageChange(number)}
					className={`${buttonStyle} ${currentPage === number ? activeButtonStyle : ''}`}
					>{number}
				</button>
			)
		})

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	return (
			<section className="-mx-4 px-4 py-16 gap-4 flex flex-col items-center border-t border-b border-slate-200">
				<p className="text-base text-gray-500">Recent Activity</p>
				<motion.div 
					className="w-full flex flex-col gap-4 min-h-[394px]"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
				>
					{activityCards}
				</motion.div>
				<span className="flex gap-1">
					{pageButtons}
				</span>
			</section>
	)
}
export default ActivityList
