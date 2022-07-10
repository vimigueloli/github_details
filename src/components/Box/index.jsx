import React from 'react'
import {ArrowSmLeftIcon} from '@heroicons/react/solid'
import {useRouter} from 'next/router'

export default function Box({title, children}){
    const router = useRouter()


    return(
            <div className='w-11/12 h-full relative bg-white rounded-3xl shadow-md overflow-hidden'>
                <div className='w-full line-left border-b-2'>
                    <div 
                        onClick={()=> router.back()}
                        className='w-12 h-12 border-r-2 border-zinc-300 line-center text-zinc-300 hover:bg-zinc-300 cursor-pointer hover:text-white with-transition'
                    >
                        <ArrowSmLeftIcon width={25} height={25} className='translate-x-[2px]'/>
                    </div>
                    <div className='w-full -translate-x-6 line-center'>
                        <div>
                           {title}
                        </div>
                    </div>
                </div>
                <div className='w-full h-full overflow-y-auto px-4'>
                    {children}
                </div>
            </div>
    )
}