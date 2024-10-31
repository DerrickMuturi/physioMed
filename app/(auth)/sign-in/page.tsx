'use client'
import { Button } from "../../../components/ui/button"
import { supabase } from "../../../supabaseClient"

const Page = () => {
    const signIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "/admin"
            }
        })
    }

    return (
        <>
            <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
                <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                    <div className='flex flex-col items-center space-y-2 text-center'>
                        <Button onClick={signIn}>
                            Sign In
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page