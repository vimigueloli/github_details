import React, { useState, useEffect } from "react";
import { XIcon } from "@heroicons/react/outline";
// import Image from "next/image";
import ReactLoading from "react-loading";
import { AiOutlineBranches } from "react-icons/ai";
import api from "../../../services/api";
import Box from "../../../components/Box";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

interface RepoProps {
    repo: string;
}

export default function User({ repo }: RepoProps) {
    const router = useRouter();
    const [repoData, setRepoData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [commits, setCommits] = useState<any[]>([]);
    const [branch, setBranch] = useState<any[]>([]);
    const [selected, setSelected] = useState(null);
    const [user, setUser] = useState<string>("");

    // ? get user's data and repositories
    useEffect(() => {
        //@ts-ignore
        const cookie = parseCookies("USER");
        setUser(cookie.USER);
    }, []);

    // ? get user's data and repositories
    useEffect(() => {
        async function getUser() {
            if (user === "" || user === null) {
                router.push("/");
            } else if (user !== undefined) {
                setLoading(true);
                try {
                    const response = await api.get(
                        `/repos/${user}/${repo}/branches`
                    );
                    const userResponse = await api.get(
                        `/repos/${user}/${repo}`
                    );
                    setBranch(response.data);
                    setRepoData(userResponse.data);
                    setLoading(false);
                } catch (e) {
                    toast.error(
                        "Houve algum erro ao tentar visualizar os repositórios de " +
                            user
                    );
                    router.back();
                }
            }
        }
        getUser();
    }, [repo, user]);

    // ? show details of selected branch
    useEffect(() => {
        async function getCommits() {
            if (repoData !== null) {
                try {
                    const response = await api.get(
                        `/repos/${user}/${repo}/commits`
                    );
                    console.log("response->", response.data);
                    setCommits(response.data);
                } catch (e) {
                    toast.error("Falha ao carregar os commits");
                }
            }
        }
        getCommits();
    }, [selected]);

    return (
        <div className="line-center pt-24 pb-16 h-screen">
            <Box title={`${user}`}>
                {
                    // * loading repo's data
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
                    // * repo's data
                    !loading && (
                        <>
                            <div className="w-full h-16 line-center">
                                <div className="text-2xl font-bold text-zinc-800">
                                    {repo}
                                </div>
                            </div>
                            <div className="line-center">
                                <div className="w-80 text-lg text-center">
                                    {repoData ? repoData.description : ""}
                                </div>
                            </div>
                            <div className="line-center">
                                <div className="text-xl font-semibold text-zinc">
                                    Branches
                                </div>
                            </div>
                            {
                                // * branches
                                !selected && (
                                    <div className="mt-8 w-full line-center mb-32">
                                        <div className="w-full st:w-80 ">
                                            {!selected &&
                                                branch.map((branch, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="line-center w-full h-12 rounded-lg my-2 shadow-md border cursor-pointer hover:text-white hover:bg-zinc-300 with-transition"
                                                            onClick={() =>
                                                                setSelected(
                                                                    branch.name
                                                                )
                                                            }
                                                        >
                                                            <div className="w-80 text-lg text-center">
                                                                {branch.name}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                )
                            }
                            {
                                // * commits
                                selected && (
                                    <>
                                        <div className="line-center mt-8 mb-4">
                                            <div
                                                className="text-lg py-2 font-light w-96 rounded-lg text-zinc-800 hover:text-white hover:bg-zinc-300 with-transition cursor-pointer border shadow line-center relative"
                                                onClick={() =>
                                                    setSelected(null)
                                                }
                                            >
                                                <div className="z-50 text-xs st:text-base absolute">
                                                    {selected} - commits
                                                </div>
                                                <XIcon
                                                    width={25}
                                                    height={25}
                                                    className="ml-auto mr-2"
                                                />
                                            </div>
                                        </div>
                                        {commits.length > 0 ? (
                                            commits.map((commit) => (
                                                <div
                                                    className="line-center items-start"
                                                    key={commit.id}
                                                >
                                                    <div className="line-between w-96">
                                                        <div className=" line-left">
                                                            <div className="w-4">
                                                                <AiOutlineBranches
                                                                    width={25}
                                                                    height={25}
                                                                    color="#1E282C"
                                                                />
                                                            </div>
                                                            <div className="text-zinc-800 text-xs font-semibold">
                                                                {
                                                                    commit
                                                                        .commit
                                                                        .message
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="text-zinc-800/50 ml-3">
                                                            {new Date(
                                                                commit.commit.committer.date
                                                            ).getDate()}
                                                            /
                                                            {new Date(
                                                                commit.commit.committer.date
                                                            ).getMonth() + 1}
                                                            /
                                                            {new Date(
                                                                commit.commit.committer.date
                                                            ).getFullYear()}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="line-center ">
                                                <ReactLoading
                                                    type="spinningBubbles"
                                                    color="#000"
                                                    height={25}
                                                    width={25}
                                                />
                                            </div>
                                        )}
                                        <div className="h-8 mb-32 bg-white" />
                                    </>
                                )
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
        props: { repo: output.id },
    };
};
