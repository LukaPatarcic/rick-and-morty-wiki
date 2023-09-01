'use client'

import {FC, useState} from "react";
import { Pagination as AntdPagination } from 'antd'
import {useRouter, useSearchParams} from "next/navigation";

interface Props {
    total: number;
}

const pageSize = 20;
export const Pagination: FC<Props> = ({ total }) => {
    const router = useRouter();
    const params = useSearchParams();
    const [current, setCurrent] = useState(Number(params.get('page') ?? 1))
    const onChange = (page: number) => {
        router.replace(`/characters?page=${page}`)
        setCurrent(page);
    }

    return <AntdPagination current={current} pageSize={pageSize}showSizeChanger={false} onChange={onChange} defaultCurrent={current} total={total} />
}
