
import Actionbar from '@/components/ui/Actionbar';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import { Button } from 'antd';
import Link from 'next/link';
import React from 'react'

const ManageStudent = () => {
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
            <Actionbar title="Student List">
                <Link href="/super_admin/manage-students/create">
                    <Button type='primary'>Create</Button>
                </Link>
            </Actionbar>
        </>
    )
}
export default ManageStudent