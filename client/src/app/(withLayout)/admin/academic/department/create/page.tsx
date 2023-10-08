'use client';

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb"
import { useAddAcademicDepartmentMutation } from "@/redux/api/academic/departmentApi";
import { useAcademicFacultyQuery } from "@/redux/api/academic/facultyApi";
import { Button, Col, Row, message } from "antd";

const CreateAcadmicDepartment = () => {
    const base = 'admin';
    const { data, isLoading } = useAcademicFacultyQuery({ limit: 100, page: 1 });
    const [addAcademicDepartment] = useAddAcademicDepartmentMutation();


    const academicfaculties: any[] = data?.academicfaculty;
    const academicfacultiesOptions = academicfaculties && academicfaculties?.map((item) => {
        return {
            label: item?.title,
            value: item?.id,
        }
    })
    const onSubmit = async (data: any) => {
        message.loading("Adding ...");
        try {
            const res = await addAcademicDepartment(data)
            if (!!res) {
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
                    { label: `department`, link: `/${base}/academic/department` }
                ]}
            />
            <div>
                <Form submitHandler={onSubmit}>
                    <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                        <Col
                            className="gutter-row"
                            span={8}
                            style={{
                                marginBottom: "10px",
                            }}
                        >
                            <FormInput name="title" type="text" size="large" label="Academic Department Title" />
                        </Col>

                        <Col
                            className="gutter-row"
                            span={8}
                            style={{
                                marginBottom: "10px",
                            }}
                        >
                            <FormSelectField
                                size="large"
                                name="academicFacultyId"
                                options={academicfacultiesOptions as any[]}
                                label="Academic Faculty"
                                placeholder="Select"
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

export default CreateAcadmicDepartment