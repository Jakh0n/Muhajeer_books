'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import Sidebar from './sidebar'

export default function MobileSidebar() {
	const [isOpen, setIsOpen] = useState(false)

	const handleClose = () => {
		setIsOpen(false)
	}

	return (
		<>
			{/* Mobile Menu Button */}
			<button
				className='md:hidden fixed bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg z-50 transition-colors duration-200'
				onClick={() => setIsOpen(!isOpen)}
			>
				{isOpen ? <X size={24} /> : <Menu size={24} />}
			</button>

			{/* Overlay */}
			{isOpen && (
				<div
					className='fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300'
					onClick={handleClose}
				/>
			)}

			{/* Mobile Sidebar */}
			<div
				className={`fixed inset-y-0 left-0 w-72 bg-white dark:bg-gray-800 shadow-xl transform transition-all duration-300 ease-in-out md:hidden z-50 ${
					isOpen ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				<div className='p-6 h-full overflow-y-auto'>
					<Sidebar onClose={handleClose} />
				</div>
			</div>
		</>
	)
}
