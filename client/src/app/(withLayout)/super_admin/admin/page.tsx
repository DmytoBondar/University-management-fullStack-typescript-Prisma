'use client'

import Actionbar from '@/components/ui/Actionbar'
import UMBreadCrumb from '@/components/ui/UMBreadCrumb'
import UMTable from '@/components/ui/UMTable'
import { Button, Input, message } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'
import dayjs from 'dayjs';
import { useDebounced } from '@/redux/hooks'
import {
    DeleteOutlined,
    EditOutlined,
    ReloadOutlined,
    EyeOutlined
} from "@ant-design/icons";
import { useAdminsQuery } from '@/redux/api/adminApi'

const ManageAdmin = () => {
    const query: Record<string, any> = {};

    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(10);
    const [sortBy, setSortBy] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");

    query['limit'] = size;
    query['page'] = page;
    query['sortBy'] = sortBy;
    query['sortOrder'] = sortOrder;

    const debouncedTerm = useDebounced({
        searchQuery: searchTerm,
        delay: 600
    });

    if (!!debouncedTerm) {
        query['searchTerm'] = debouncedTerm
    };
    const { data, isLoading } = useAdminsQuery({ ...query });
    const admins = data?.admins;
    const meta = data?.meta;

    const deleteHandler = async (id: string) => {
        message.loading("Deleting ...");
        try {
            message.success("Successfully Deleted !!");
        } catch (error: any) {
            message.error(error.message);
        }
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            sorter: true
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: function (data: Record<string, any>) {
                const fullName = `${data?.firstName} ${data?.middleName} ${data?.lastName}`
                return <>{fullName}</>
            }
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Department',
            dataIndex: 'managementDepartment',
            render: function (data: any) {
                return <>{data?.title}</>
            }
        },
        {
            title: 'Designation',
            dataIndex: 'designation'
        },
        {
            title: 'Contact No',
            dataIndex: 'contactNo',
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
                        <Link href={`/super_admin/department`}>
                            <Button type='primary' style={{ margin: "5px 5px" }} onClick={() => console.log(data)}>
                                <EyeOutlined />
                            </Button>
                        </Link>
                        <Link href={`/super_admin/department`}>
                            <Button type='primary' style={{ margin: "5px 5px" }}>
                                <EditOutlined />
                            </Button>
                        </Link>
                        <Button onClick={() => deleteHandler(data.id)} type='primary' style={{ margin: "5px 5px" }} danger>
                            <DeleteOutlined />
                        </Button>
                    </>
                )
            }
        },

    ];

    const onTableChange = (pagination: any, filter: any, sorter: any) => {
        const { order, field } = sorter;
        setSortBy(field as string);
        setSortOrder(order === 'ascend' ? 'asc' : 'desc')
    }

    const onPaginationChange = (page: number, pageSize: number) => {
        setPage(page);
        setSize(pageSize);
    }
    const resetFilters = () => {
        setSortBy("");
        setSearchTerm("");
        setSortOrder("");
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
                    <Link href="/super_admin/admin/create">
                        <Button type='primary'>Create</Button>
                    </Link>
                </div>
            </Actionbar>

            <div style={{ marginTop: '10px' }}>
                <UMTable
                    loading={isLoading}
                    columns={columns}
                    dataSource={admins}
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

export default ManageAdmin