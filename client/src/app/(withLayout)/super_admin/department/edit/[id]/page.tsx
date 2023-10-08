'use client'

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import Actionbar from "@/components/ui/Actionbar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useGetSingleDepartmentQuery, useUpdateDepartmentMutation } from "@/redux/api/departmentApi";
import { Button, Col, Row, message } from "antd";

interface IParams {
    params: any;
}

const EditDepartmentPage = ({ params }: IParams) => {
    const { id } = params;
    const { data } = useGetSingleDepartmentQuery(id);
    const [updateDepartment] = useUpdateDepartmentMutation();
    console.log(data)
    const onSubmit = async (values: { title: string }) => {
        message.loading("Updating ...");
        try {
            await updateDepartment({ id, body: values })
        } catch (error: any) {
            message.error(error.message)
        }
    }
    // @ts-ignore
    const defaultValues = {
        title: data?.title || ''
    }
    return (
        <>
            <UMBreadCrumb
                items={[
                    {
                        label: "super_admin",
                        link: "/super_admin",
                    },
                    {
                        label: "department",
                        link: "/super_admin/department",
                    },
                ]}
            />
            <Actionbar title="Update Department"> </Actionbar>

            <Form submitHandler={onSubmit} defaultValues={defaultValues}>
                <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                    <Col span={8} style={{ margin: '10px 0' }}>
                        <FormInput
                            name="title"
                            label="Title"
                        />
                    </Col>
                </Row>
                <Button htmlType="submit" type="primary">Update</Button>
            </Form>
        </>
    )
}

export default EditDepartmentPage