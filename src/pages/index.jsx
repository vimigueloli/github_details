import React,{useState,useEffect} from 'react';
import ReactLoading from 'react-loading';
import {Search} from '@heroicons/react/outline'
import toast from 'react-hot-toast';
import api from '../services/api';
import Image from 'next/image'
import {useRouter} from 'next/router'

export default function Home() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [searched, setSearched] = useState(false)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setSearched(false)
    setUsers([])
  },[search])

  // ? Search users
  async function sendSearch(e){
    e.preventDefault()
    setLoading(true)
      try{
        const response = await api.get(`/search/users?q=${search}`)
        console.log('users->', response.data.items)
        setUsers(response.data.items)
        setSearched(true)
        setLoading(false)
      }catch (e){
        setUsers([])
        toast.error(e.message)
        console.log('erro->',e)
        setSearched(false)
        setLoading(false)
      }
  }

  // ? redirect to user's details
  async function selectUser(user){
    router.push(`usuario/${user}`)
  }


  return (
    <div className='line-center  h-screen'>
      <div className=' w-96 relative bg-white rounded-3xl shadow-md'>
        <div className='w-full h-16 line-center text-xl text-zinc-800 font-semibold'>
          Pesquise um usuário do github
        </div>
        {
          // * search field
          <form id='searchForm' onSubmit={(e)=> sendSearch(e)}>
            <div className='px-8 mt-4' >
              <input 
                className='shadow-md w-full h-12 font-semibold text-lg placeholder:text-zinc-800/50 rounded-lg input border text-center text-zinc-800' 
                placeholder="Nome de um usuário"
                value={search}
                required
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>  
            <div className='w-full mt-5 line-center'>
              <button className='button font-semibold bg-rose-300 text-zinc-800 rounded-lg px-4 py-2'>
                Pesquisar
              </button>
            </div>
          </form>
        }
        {
          // * loading users
          loading &&
          <div className='line-center mt-12 h-32 absolute w-full'>
           <ReactLoading type='spinningBubbles' height={50} width={50} color='#DAE0E4'/>
          </div>
        }
        {
          // * empty results
          !loading && search.trim() !=='' && searched && users.length === 0 &&
          <div className='text-center w-full text-xl absolute mt-16 font-medium text-zinc-800'>
            Nenhum usuário foi encontrado
          </div>
        }
        {
          // * users list
          <div className='w-full mb-6 h-72 px-8 overflow-y-auto line-center mt-6 items-start flex-wrap gap-2 overflow-x-hidden'>
            {
              users.map(user => (
                <div key={user.id} className='w-11/12 line-left gap-x-4 border shadow-md h-12 hover:bg-zinc-300 cursor-pointer mt-2 text-xs rounded-xl px-8 with-transition'
                  onClick={()=> selectUser(user.login)}
                >
                    <Image src={`https://github.com/${user.login}.png`} className='rounded-full' width={30} height={30}/>
                    <div className='text-zinc-800 font-semibold text-lg'>
                      {user.login}
                    </div>
                </div>
              ))
            }
          </div>
        }
      </div>
    </div>
  )
}
 