'use client'

import React from 'react'
import Card from '../../components/Card'
import { Skeleton } from '../../components/ui/skeleton'
import { trpc } from '../../trpc/client'
import { formatDate, strip } from '../../lib/utils'

const All = () => {
    const { data: posts, isLoading } = trpc.getAllPosts.useQuery()

    const PostPlaceHolder = () => {
        return (
            <div className='mt-20 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:mx-14 lg:mx-36'>
                <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
                    <Skeleton className='h-full w-full' />
                </div>
                <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
                    <Skeleton className='h-full w-full' />
                </div>
                <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
                    <Skeleton className='h-full w-full' />
                </div>
            </div>
        )
    }

    if (isLoading) {
        return <PostPlaceHolder />
    }

    return (
        <div className='mt-20 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:mx-14 lg:mx-36'>
            {posts && posts?.map((post) => (
                <Card
                    key={post.id}
                    // @ts-expect-error
                    cover={strip(post.cover.url)}
                    title={post.title}
                    description={post.subtitle}
                    date={formatDate(post.createdAt)}
                    categories={post.categories!}
                    id={post.id}
                />
            ))}

        </div>
    )

}

export default All