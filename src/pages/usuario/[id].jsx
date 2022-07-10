import React,{useState, useEffect} from 'react'
import {DotsHorizontalIcon, PlusCircleIcon} from '@heroicons/react/solid'
import Image from 'next/image'
import api from '../../services/api'
import Box from '../../components/Box'
import toast from 'react-hot-toast'
import {useRouter} from 'next/router'

export default function User({user}){
    const router = useRouter()
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [repos, setRepos] = useState([])

    
    // ? get user's data and repositories
    useEffect(() => {
        async function getUser(){
            try{
                const response = await api.get(`/users/${user}/repos?per_page=100`)
                const userResponse = await api.get(`/users/${user}`)
                console.log('response->', response.data)
                setRepos(response.data)
                console.log('user ->', userResponse.data)
                setUserData(userResponse.data)
            }catch (e){
                toast.error(e.message)
            }
        }
        getUser()
    }, [user])
        
    return(
        <div className='line-center pt-24 pb-16 h-screen'>
            <Box title={`${user} - Repositórios`}>
                <div className='w-full line-center'>
                    <div className='mt-8'>
                        <Image src={`https://github.com/${user}.png`} className='rounded-full' alt={user} width={100} height={100} />
                    </div>
                </div>
                <div className='w-full my-6 font-semibold text-zinc-800 line-center'>
                    { userData && userData.bio? userData.bio : 'Sem biografia'}
                </div>
                <div className='px-0 st:px-2 md:px-16 h-80 overflow-y-auto'>
                    <div    className='w-full border-b-0 text-xs st:text-base cursor-pointer border-2 px-2 st:px-8 py-4 text-zinc-800 border-zinc-300 line-between  with-transition' >
                        <div className='w-32'>Nome</div>
                        <div className=' st:w-32 st:-translate-x-5'>Data de criação </div>
                        <DotsHorizontalIcon width={25} height={25} className='hidden st:block st:opacity-0' />
                    </div>
                    {
                        repos.map(repo =>(
                            <div 
                                key={repo.id} 
                                className='w-full border-b-0 text-xs st:text-base cursor-pointer border-2 px-2 st:px-8 py-4 text-zinc-800 border-zinc-300 hover:bg-zinc-300 hover:text-white line-between  with-transition' 
                                onClick={()=> router.push(`${user}/repositorio/${repo.name}`)}
                            >
                                <div className='w-32'>{repo.name}</div>
                                <div className=' st:w-32 st:-translate-x-5'>{new Date(repo.created_at).getDate()}/{new Date(repo.created_at).getMonth()}/{new Date(repo.created_at).getFullYear()} </div>
                                <DotsHorizontalIcon width={25} height={25} className='hidden st:block' />
                            </div>
                        ))
                    }
                    {
                        repos.length > 99 &&
                        <div className='w-full  cursor-pointer border-2 px-8 py-4 text-zinc-800 border-zinc-300 hover:bg-zinc-300 hover:text-white line-center  with-transition' >
                                    <PlusCircleIcon width={25} height={25} />
                        </div>
                    }
                    {
                        <div className='w-full border-zinc-300 border-t-2' />
                    }
                </div>
                </Box>
                
        </div>
    )
}

// ? server render side requisition

export const getServerSideProps = async (ctx) => {
    const output = ctx.query;
    console.log("passoou aqui -> ", output.id.split('|'));

    return {
        props: { user: output.id.split('|')[0]},
    };
};
