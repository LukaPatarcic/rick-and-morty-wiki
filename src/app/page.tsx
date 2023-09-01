import Link from "next/link";

const data = [
    {title: "Characters", href: "/characters"},
    {title: "Locations", href: "/locations"},
    {title: "Episodes", href: "/characters"}
]

export default async function Home() {
    return <div>{data.map(({ title, href}) => (
        <div>
            <Link href={href}>{title}</Link>
        </div>))}
    </div>
}
