'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { Capitalize } from '../lib/utils'
import { Category } from '../payload-typed'
import { useRouter } from 'next/navigation'

interface CardProps {
    categories?: (number | Category)[],
    title: string,
    type?: string
    cover?: string
    description?: string,
    date: string
    id: number
}

const Card = ({
    cover,
    categories,
    title,
    description,
    date,
    id

}: CardProps) => {
    const router = useRouter()

    const onClick = () => {
        const formattedTitle = title.replace(/\s+/g, '-');
        router.push(`/blog/${formattedTitle}?id=${id}`)
    }

    const validCategories = categories?.filter(
        (cat): cat is Category => typeof cat === 'object' && cat !== null
    );

    return (
        <div
            className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200  transform transition duration-300 hover:scale-105 hover:shadow-lg hover:cursor-pointer'
            onClick={() => onClick()}
        >
            <div className='relative h-48 w-full'>
                {cover && (
                    <Image
                        src={cover!}
                        alt={title}
                        layout='fill'
                        objectFit='cover'
                        className='w-full h-full'
                    />
                )}

            </div>
            <div className='p-4 flex flex-col items-start gap-3'>
                {validCategories?.map((category, index) => (
                    <span key={index} className='bg-yellow-400 text-white text-sm font-semibold px-2 py-1 rounded-md'>
                        {category.name}
                    </span>
                ))}

                <h2 className='mt-4 text-xl font-bold text-left '>{title}</h2>
                <p className='mt-2 text-gray-600 text-left break-words'>{description}</p>
                <p className='mt-4 text-gray-500 text-sm text-left font-bold '>{Capitalize(date)}</p>
            </div>
        </div>
    );
}

export default Card