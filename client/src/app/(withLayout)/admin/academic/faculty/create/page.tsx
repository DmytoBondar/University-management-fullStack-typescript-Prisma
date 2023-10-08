'use client';

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb"
import { useAddAcademicFacultyMutation } from "@/redux/api/academic/facultyApi";
import { Button, Col, Row, message } from "antd";

const CreateAcademicFaculty = () => {
    const base = 'admin';
    const [addAcademicFaculty] = useAddAcademicFacultyMutation();

    const onSubmit = async (data: any) => {
        message.loading("Adding ...");
        try {
            const res = await addAcademicFaculty(data)
            if (res) {
                message.success("Successfully Added!!")
            }
        } catch (error: any) {
            message.error(error.message)
        }
    }
    return (
        <>
            <UMBreadCrumb
                items={[
                    { label: `${base}`, link: `/${base}` },
                    { label: `faculty`, link: `/${base}/academic/faculty` }
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
                                label="Academic Faculty"
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

export default CreateAcademicFaculty