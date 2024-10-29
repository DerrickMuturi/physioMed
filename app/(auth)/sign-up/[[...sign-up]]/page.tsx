import { SignUp } from '@clerk/nextjs'

const Page = () => {
    // const {} = trpc.aniAPiRoute
    return (
        <>
            <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
                <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                    <div className='flex flex-col items-center space-y-2 text-center'>
                        <SignUp />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page