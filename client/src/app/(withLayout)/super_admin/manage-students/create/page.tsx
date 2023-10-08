'use client'

import StepperForm from '@/components/StepperForm/StepperForm'
import StudentBasicInfo from '@/components/StepperForms/StudentBasicInfo'
import StudentGuardianInfo from '@/components/StepperForms/StudentGuardianInfo';
import StudentInfo from '@/components/StepperForms/StudentInfo';
import StudentLocalGuardingInfo from '@/components/StepperForms/StudentLocalGuardingInfo';
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

const page = () => {

    const handleStudentSubmit = async (data: any) => {
        try {
            console.log(data)
        } catch (error: any) {
            console.log(error.message)
        }
    }
    return (
        <div>
            <StepperForm
                submitHandler={(value) => handleStudentSubmit(value)}
                steps={steps}
            />
            <h1>Create Student</h1>
        </div>
    )
}

export default page