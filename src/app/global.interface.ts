export interface IPaginate<T> {
    info: Info
    results: T[]
}

export interface Info {
    count: number
    pages: number
    next: string
    prev: any
}
