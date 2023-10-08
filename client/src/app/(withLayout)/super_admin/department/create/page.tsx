'use client'
import Form from "@/components/Forms/Form"
import FormInput from "@/components/Forms/FormInput"
import UMBreadCrumb from "@/components/ui/UMBreadCrumb"
import { useAddDepartmentMutation } from "@/redux/api/departmentApi"
import { Button, Col, Row, message } from "antd"

const CreateDepartment = () => {
    const [addDepartment] = useAddDepartmentMutation();
    const onSubmit = async (data: any) => {
        message.loading("Creating ...");
        try {
            await addDepartment(data);
            message.success("Successfully created department !")
        } catch (error: any) {
            message.error(error.message)
        }
    }
    const base = 'super_admin';
    return (
        <>
            <UMBreadCrumb
                items={[
                    { label: `${base}`, link: `/${base}` },
                    { label: `department`, link: `/${base}/department` }
                ]}
            />
            <div>
                <Form submitHandler={onSubmit}>
                    <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                        <Col span={8} style={{ margin: "10px 0" }}>
                            <FormInput
                                name="title"
                                type="text"
                                size="large"
                                label="Department"
                            />
                        </Col>
                    </Row>
                    <Button type="primary" htmlType="submit">
                        Add
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default CreateDepartment