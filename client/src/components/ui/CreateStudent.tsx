'use client'

import StepperForm from '@/components/StepperForm/StepperForm'
import StudentBasicInfo from '@/components/StepperForms/StudentBasicInfo'
import StudentGuardianInfo from '@/components/StepperForms/StudentGuardianInfo';
import StudentInfo from '@/components/StepperForms/StudentInfo';
import StudentLocalGuardingInfo from '@/components/StepperForms/StudentLocalGuardingInfo';
import { useAddStudentMutation } from '@/redux/api/studentApi';
import { message } from 'antd';
import React from 'react'

const steps = [
    {
        title: 'Student Information',
        content: <StudentInfo />,
    },
    {
        title: 'Basic Information',
        content: <StudentBasicInfo />,
    },
    {
        title: 'Gurdian Information',
        content: <StudentGuardianInfo />,
    },
    {
        title: 'Local Gurdain Information',
        content: <StudentLocalGuardingInfo />,
    },
];

const CreateStudent = () => {
    const [addStudent] = useAddStudentMutation();

    const handleStudentSubmit = async (values: any) => {
        const obj = { ...values };
        // console.log(obj)
        const file = obj["file"];
        delete obj["file"];
        const data = JSON.stringify(obj);
        const formData = new FormData();
        formData.append("file", file as Blob);
        formData.append("data", data);

        message.loading("Creating ...");
        try {
            const res = await addStudent(data);
            if (!!res) {
                message.success("Successfully Created Student Account !!")
            }
        } catch (error: any) {
            message.error(error.message)
        }
    }
    return (
        <div>
            <StepperForm
                submitHandler={(value) => handleStudentSubmit(value)}
                steps={steps}
            />
        </div>
    )
}

export default CreateStudent