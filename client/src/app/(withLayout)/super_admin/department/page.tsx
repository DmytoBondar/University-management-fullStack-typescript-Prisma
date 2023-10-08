'use client'

import Actionbar from '@/components/ui/Actionbar'
import UMBreadCrumb from '@/components/ui/UMBreadCrumb'
import UMTable from '@/components/ui/UMTable'
import { useDeleteDepartmentMutation, useDepartmentsQuery } from '@/redux/api/departmentApi'
import { Button, Input, message } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'
import dayjs from 'dayjs';
import {
    DeleteOutlined,
    EditOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
import { useDebounced } from '@/redux/hooks'

const Department = () => {
    const query: Record<string, any> = {}

    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(5);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<string>('');
    const [deleteDepartment] = useDeleteDepartmentMutation();

    query['limit'] = size;
    query['page'] = page;
    query['sortBy'] = sortBy;
    query['sortOrder'] = sortOrder;

    const debouncedTerm = useDebounced({
        searchQuery: searchTerm,
        delay: 600
    })

    if (!!debouncedTerm) {
        query['searchTerm'] = debouncedTerm;
    }
    const columns = [
        {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'createdAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: true,
            render: function (data: any) {
                return data && dayjs(data).format('MMM D, YYYY hh:mm A');
            }
        },
        {
            title: 'Action',
            render: function (data: any) {
                return (
                    <>
                        <Link href={`/super_admin/department/edit/${data.id}`}>
                            <Button type='primary' style={{ margin: "0px 5px" }}>
                                <EditOutlined />
                            </Button>
                        </Link>
                        <Button onClick={() => deleteHandler(data.id)} type='primary' style={{ margin: "0px 5px" }} danger>
                            <DeleteOutlined />
                        </Button>
                    </>
                )
            }
        },

    ];

    const deleteHandler = async (id: string) => {
        message.loading('Deleteing ...');
        try {
            await deleteDepartment(id);
            message.success("Department Deleted Successfully !!")
        } catch (error: any) {
            message.error(error.message)
        }
    }

    const { isLoading, data } = useDepartmentsQuery({ ...query });
    const departments = data?.departments;
    const meta = data?.meta;

    const onTableChange = (pagination: any, filter: any, sorter: any) => {
        const { order, field } = sorter;
        setSortBy(field as string);
        setSortOrder(order === 'ascend' ? 'asc' : 'desc');

    }
    const onPaginationChange = (page: number, pageSize: number) => {
        setPage(page);
        setSize(pageSize)
    }
    const resetFilters = () => {
        setSortBy("");
        setSortOrder('');
        setSearchTerm('');
    }

    return (
        <>
            <UMBreadCrumb
                items={[
                    {
                        label: `super_admin`,
                        link: `/super_admin`,
                    },
                ]}
            />
            <Actionbar title="Admin List">
                <Input
                    type='text'
                    size='large'
                    placeholder='Search...'
                    style={{ width: "35%" }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div>
                    {(!!sortBy || !!sortOrder || !!searchTerm) && (
                        <Button type="primary" onClick={resetFilters} style={{ margin: '0px 5px' }}>
                            <ReloadOutlined />
                        </Button>
                    )}
                    <Link href="/super_admin/department/create">
                        <Button type='primary'>Create</Button>
                    </Link>
                </div>
            </Actionbar>

            <div style={{ marginTop: '10px' }}>
                <UMTable
                    loading={isLoading}
                    columns={columns}
                    dataSource={departments}
                    onPaginationChange={onPaginationChange}
                    onTableChange={onTableChange}
                    showPagination={true}
                    pageSize={size}
                    showSizeChanger={true}
                    totalPages={meta?.total}
                />
            </div>
        </>
    )
}

export default Department