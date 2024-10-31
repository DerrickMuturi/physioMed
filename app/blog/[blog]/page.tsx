'use client'
import localFont from 'next/font/local';
import { useParams } from 'next/navigation';
import Serialize from '../../../lib/Editor';
import { Capitalize, cn, convertToOriginalTitle, formatDate, strip } from '../../../lib/utils';
import { trpc } from "../../../trpc/client";
import Card from '../../../components/Card';
import { Button } from '../../../components/ui/button';
import { ChevronsRight } from 'lucide-react';
import { Skeleton } from '../../../components/ui/skeleton';

const AerialFont = localFont({
    src: "../../fonts/AeonikProTRIAL-Bold.woff",
    weight: "400",
    style: "normal"
})

const Page = () => {
    const { blog } = useParams()
    const originalTitle = convertToOriginalTitle(blog as string)

    const { data, isLoading: loading } = trpc.getPostOnTitle.useQuery({
        title: originalTitle
    })

    const post = data?.post
    const { data: posts, isLoading } = trpc.getTopPosts.useQuery()


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
        <>
            <div className={cn('flex mx-44 space-x-5 lg:space-x-60 my-20', AerialFont.className)}>
                <div className='sm:hidden lg:flex'>
                    <Button variant={"outline"} className="p-5" asChild size={"lg"}>
                        <div className=''>
                            {posts && post?.map((part, index) => (
                                <div className='flex space-x-2 text-gray-600 text-lg breadcrumbs' key={index}>
                                    <h2>{part.type}</h2>
                                    <ChevronsRight className='mt-1.5' />
                                    {part.categories?.map((category, index) => (
                                        <p key={index}>{typeof category === "object" && category.name}</p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </Button>
                </div>
                <div className='flex flex-col gap-5'>
                    {post?.map((part, index) => (
                        <div className='flex flex-col space-y-5' key={index}>
                            <h2 className="font-bold text-7xl mb-16">{part.title}</h2>
                            <div className='text-lg text-gray-600'>{part?.content ? Serialize(part?.content) : "loading content..."}</div>
                        </div>
                    ))}
                </div>
            </div>
            <h2 className='ml-32 font-bold text-7xl'> Recent Posts</h2>
            <div className='my-20 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:mx-14 lg:mx-36'>
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
        </>
    )
}

export default Page