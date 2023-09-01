import {ICharacter} from "@app/app/characters/character.interface";
import {BASE_URL} from "@app/const/api";

async function getData(id: string) {
    const res = await fetch(`${BASE_URL}/character/${id}`, {
        next: { revalidate: 100 }
    })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    const data = await res.json() as ICharacter;

    return data
}
export default async function Page({ params }: { params: { id: string }}) {
    const data = await getData(params.id);
    return <pre>{JSON.stringify(data, '', 2)}</pre>
}
