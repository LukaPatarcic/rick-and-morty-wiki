import Link from "next/link";
import {IPaginate} from "@app/app/global.interface";
import {ICharacter} from "@app/app/characters/character.interface";
import {BASE_URL} from "@app/const/api";
import { Pagination } from './pagination';

interface ISearchParams {
    page: string;
}

async function getData(searchParams: ISearchParams) {
    const page = searchParams?.page ?? 1
    const res = await fetch(`${BASE_URL}/character?page=${page}`, {
        next: {revalidate: 100}
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    const data = await res.json() as IPaginate<ICharacter>

    return data
}

export default async function Characters({ searchParams }: { searchParams: ISearchParams}) {
    const data = await getData(searchParams);

    return <div className="flex flex-wrap flex-grow-1 flex-row justify-center items-center gap-3">{data.results.map((item) => (
        <Link key={item.id} href={`/characters/${item.id}`}>
            <div className="max-w-sm w-full lg:max-w-full lg:flex cursor-pointer">
                <div
                    className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                    style={{
                        backgroundImage: `url('${item.image}')`}} title="Woman holding a mug">
                </div>
                <div
                    className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                        <div className="text-gray-900 font-bold text-xl mb-2">{item.name}
                        </div>
                        <p className="text-gray-700 text-base">Status: {item.status}</p>
                    </div>
                    <div className="flex items-center">
                        <div className="text-sm">
                            <p className="text-gray-600">Created: {new Date(item.created).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>))}
        <Pagination total={data.info.count} />
    </div>
}
