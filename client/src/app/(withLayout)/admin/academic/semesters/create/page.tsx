'use client';

import Form from "@/components/Forms/Form";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormYearField from "@/components/Forms/FormYearField";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb"
import { monthOptions } from "@/constants/global";
import { useAddAcademicSemesterMutation } from "@/redux/api/academic/semesterApi";
import { Button, Col, Row, message } from "antd";

const CreateAcadmicDepartment = () => {
    const base = 'admin';
    const [addAcademicSemester] = useAddAcademicSemesterMutation();

    const semesterOptions = [
        {
            label: "Autum",
            value: "Autum",
        },
        {
            label: "Summer",
            value: "Summer",
        },
        {
            label: "Fall",
            value: "Fall",
        },
    ];

    const onSubmit = async (data: any) => {
        if (data?.title == "Autum") data["code"] = "01";
        else if (data?.title == "Summer") data["code"] = "02";
        else data["code"] = "03";

        data.year = parseInt(data.year)
        message.loading("Adding ...");
        try {
            console.log(data)
            const res = await addAcademicSemester(data)
            if (res) {
                message.success("Successfully Added!!")
            }
        } catch (error: any) {
            message.error(error.message)
            console.log(error)
        }
    }
    return (
        <>
            <UMBreadCrumb
                items={[
                    { label: `${base}`, link: `/${base}` },
                    { label: `semesters`, link: `/${base}/academic/semesters` }
                ]}
            />
            <div>
                <Form submitHandler={onSubmit}>
                    <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
                        <Col
                            className="gutter-row"
                            span={8}
                            style={{ marginBottom: "10px" }}
                        >
                            <FormSelectField
                                size="large"
                                name="title"
                                options={semesterOptions}
                                label="Title"
                                placeholder="Select"
                            />
                        </Col>
                        <Col
                            className="gutter-row"
                            span={8}
                            style={{ marginBottom: "10px" }}
                        >
                            <FormSelectField
                                size="large"
                                name="startMonth"
                                options={monthOptions}
                                label="startMonth"
                                placeholder="Select"
                            />
                        </Col>
                        <Col
                            className="gutter-row"
                            span={8}
                            style={{ marginBottom: "10px" }}
                        >
                            <FormSelectField
                                size="large"
                                name="endMonth"
                                options={monthOptions}
                                label="endMonth"
                                placeholder="Select"
                            />
                        </Col>

                        <Col
                            className="gutter-row"
                            span={8}
                            style={{ marginBottom: "10px" }}
                        >
                            <FormYearField name="year" label="Year" picker="year" />
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