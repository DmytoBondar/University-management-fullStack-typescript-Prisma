'use client';

import { useDebounced } from "@/redux/hooks";
import { Button, Input, message } from "antd"
import { useState } from "react"
import dayjs from 'dayjs';
import Link from "next/link";
import {
    DeleteOutlined,
    EditOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
import { useAcademicDepartmentQuery, useDeleteAcademicDepartmentMutation } from "@/redux/api/academic/departmentApi";
import UMTable from "@/components/ui/UMTable";
import Actionbar from "@/components/ui/Actionbar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

const AcademicDepartment = () => {
    const query: Record<string, any> = {}

    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(10);
    const [sortBy, setSortBy] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [deleteAcademicDepartment] = useDeleteAcademicDepartmentMutation();
    query['limit'] = size;
    query['sortBy'] = sortBy;
    query['sortOrder'] = sortOrder;
    query['page'] = page;

    const debouncedOptions = useDebounced({
        searchQuery: searchTerm,
        delay: 600
    })

    if (!!debouncedOptions) {
        query['searchTerm'] = debouncedOptions
    }
    const { data, isLoading } = useAcademicDepartmentQuery({ ...query })
    const academicDepartment = data?.academicDepartment;
    const meta = data?.meta;

    const deleteHandler = async (id: string) => {
        message.loading("Deleting ...");
        try {
            const res = await deleteAcademicDepartment(id)
            if (!!res) {
                message.success("Successfully Deleted !")
            }

        } catch (error: any) {
            message.error(error.message);
        }
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
                        <Link href={`/admin/acadmic/department/edit/${data.id}`}>
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
    const resetFilters = () => {
        setSearchTerm("");
        setSortBy("");
        setSortOrder("");
    }
    const onTableChange = (pagination: any, filter: any, sorter: any) => {
        const { order, field } = sorter;
        setSortBy(field as string);
        setSortOrder(order === 'ascend' ? 'asc' : 'desc')
    }
    const onPaginationChange = (page: number, pageSize: number) => {
        setPage(page);
        setSize(pageSize);
    }
    return (
        <>
            <UMBreadCrumb
                items={
                    [
                        { label: `admin`, link: `/admin` },
                    ]
                }
            />
            <Actionbar title="Academic Department">
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
                    <Link href="/admin/academic/department/create">
                        <Button type='primary'>Create</Button>
                    </Link>
                </div>
            </Actionbar>

            <div style={{ marginTop: '10px' }}>
                <UMTable
                    loading={isLoading}
                    columns={columns}
                    dataSource={academicDepartment}
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

export default AcademicDepartment;