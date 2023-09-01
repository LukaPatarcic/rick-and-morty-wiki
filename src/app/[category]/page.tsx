async function getData(category: string) {
    const res = await fetch(`https://rickandmortyapi.com/api/${category}`, {
        next: { revalidate: 100 }
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}
export default async function  Category({ params }) {
    const data = await getData(params.category)
    return <div><pre>{JSON.stringify(data)}</pre></div>
}
