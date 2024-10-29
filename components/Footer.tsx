import { Stethoscope } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer>
            <div className='flex flex-row justify-evenly p-7'>
                <div className='flex flex-col'>
                    <Link href="/" className='flex space-x-2 text-right justify-center'>
                        <Stethoscope className="mt-1" />
                        <h2 className='text-xl font-bold text-blue-600'>PhysioMed</h2>
                    </Link>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-semibold">MENU</h2>
                    <div className='grid grid-cols-2 gap-3'>
                        <Link href="/blogs" className='hover:text-yellow-400 text-md'>Blogs</Link>
                        <Link href="/articles" className='hover:text-yellow-400 text-md'>Categories</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer