import React, { useState, useEffect } from "react";
import { DotsHorizontalIcon, PlusCircleIcon } from "@heroicons/react/solid";
import ReactLoading from "react-loading";
import Image from "next/image";
import api from "../../services/api";
import Box from "../../components/Box";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

interface UserProps {
    user: string;
}

export default function User({ user }: UserProps) {
    const router = useRouter();
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [repos, setRepos] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);

    // ? get user's data and repositories
    useEffect(() => {
        async function getUser() {
            try {
                const response = await api.get(
                    `/users/${user}/repos?per_page=100`
                );
                const userResponse = await api.get(`/users/${user}`);
                console.log("response->", response.data);
                setRepos(response.data);
                console.log("user ->", userResponse.data);
                setUserData(userResponse.data);
                setLoading(false);
            } catch (e) {
                toast.error(
                    `Houve algum erro ao tentar visualizar os repositórios de ${user}`
                );
                router.back();
            }
        }
        getUser();
    }, [user]);

    // ? redirect to user's details
    async function selectRepo(repo: string) {
        router.push(`repositorio/${repo}`);
    }

    // ? add more commits
    async function addContent(page: number) {
        setLoadingMore(true);
        try {
            const response = await api.get(
                `/users/${user}/repos?per_page=100&page=${page + 1}`
            );
            console.log("response->", response.data);
            console.log("page->", page + 1);
            setPage(page + 1);
            setRepos([...repos, ...response.data]);
            setLoadingMore(false);
        } catch (e) {
            toast.error("Falha ao carregar mais repositórios");
            setLoadingMore(false);
        }
    }

    return (
        <div className="line-center pt-24 pb-8 h-screen">
            <Box title={`${user} - Repositórios`}>
                {
                    // * loading user's data
                    loading && (
                        <div className="line-center w-full h-full">
                            <ReactLoading
                                type="spinningBubbles"
                                color="#000"
                                height={100}
                                width={100}
                            />
                        </div>
                    )
                }
                {
                    // * user's data
                    !loading && (
                        <>
                            <div className="w-full line-center">
                                <div className="mt-8">
                                    <Image
                                        src={`https://github.com/${user}.png`}
                                        className="rounded-full"
                                        alt={user}
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            </div>
                            <div className="w-full my-6 font-semibold text-zinc-800 text-center line-center">
                                {userData && userData.bio
                                    ? userData.bio
                                    : "Sem biografia"}
                            </div>
                            <div className="w-full border-b-0 text-xs st:text-base cursor-pointer border-2 px-2 st:px-8 py-4 text-zinc-800 border-zinc-300 line-between  with-transition">
                                <div className="w-32">Nome</div>
                                <div className=" st:w-32 st:-translate-x-5">
                                    Data de criação{" "}
                                </div>
                                <DotsHorizontalIcon
                                    width={25}
                                    height={25}
                                    className="hidden st:block st:opacity-0"
                                />
                            </div>
                            {
                                // * list of repositories
                                repos.map((repo) => (
                                    <div
                                        key={repo.id}
                                        className="w-full border-b-0 text-xs st:text-base cursor-pointer border-2 px-2 st:px-8 py-4 text-zinc-800 border-zinc-300 hover:bg-zinc-300 hover:text-white line-between  with-transition"
                                        onClick={() => selectRepo(repo.name)}
                                    >
                                        <div className="w-32">{repo.name}</div>
                                        <div className=" st:w-32 st:-translate-x-5">
                                            {new Date(
                                                repo.created_at
                                            ).getDate()}
                                            /
                                            {new Date(
                                                repo.created_at
                                            ).getMonth()}
                                            /
                                            {new Date(
                                                repo.created_at
                                            ).getFullYear()}{" "}
                                        </div>
                                        <DotsHorizontalIcon
                                            width={25}
                                            height={25}
                                            className="hidden st:block"
                                        />
                                    </div>
                                ))
                            }
                            {
                                // * add more commits
                                !loadingMore && repos.length > 99 && (
                                    <div
                                        onClick={() => addContent(page)}
                                        className="w-full  cursor-pointer border-2 px-8 py-4 text-zinc-800 border-zinc-300 hover:bg-zinc-300 hover:text-white line-center  with-transition"
                                    >
                                        <PlusCircleIcon
                                            width={25}
                                            height={25}
                                        />
                                    </div>
                                )
                            }
                            {
                                // * loading
                                loadingMore && (
                                    <div className="w-full  cursor-pointer border-2 px-8 py-4 text-zinc-800 border-zinc-300 hover:bg-zinc-300 hover:text-white line-center  with-transition">
                                        <ReactLoading
                                            type="spinningBubbles"
                                            height={50}
                                            width={50}
                                            color="#1E282C"
                                        />
                                    </div>
                                )
                            }
                            {
                                // * close line
                                <div className="w-full mb-32 border-zinc-300 border-t-2" />
                            }
                        </>
                    )
                }
            </Box>
        </div>
    );
}

// ? server render side requisition
export const getServerSideProps = async (ctx: any) => {
    const output = ctx.query;
    console.log("passoou aqui -> ", output.id);

    return {
        props: { user: output.id },
    };
};
