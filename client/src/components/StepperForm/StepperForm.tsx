'use client'
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import { getFromLocalStorage, setLocalStorage } from '@/utils/local-storage';
import { useRouter } from 'next/navigation';

interface IStep {
    title: string;
    content: ReactElement | ReactNode
}

interface IStepProps {
    steps: IStep[]
    submitHandler: (el: any) => void;
    navigateLink?: string;
}

const StepperForm = ({ steps, submitHandler, navigateLink }: IStepProps) => {
    const [current, setCurrent] = useState<number>(
        !!getFromLocalStorage("step")
            ? Number(JSON.parse(getFromLocalStorage('step') as string).step)
            : 0
    );
    const router = useRouter();
    useEffect(() => {
        setLocalStorage('step', JSON.stringify({ step: current }))
    }, [current])

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    const methods = useForm();
    const { handleSubmit, reset } = methods;
    const handleStudentSubmit = (data: any) => {
        submitHandler(data);
        reset();
        setLocalStorage('step', JSON.stringify({ step: 0 }));
        navigateLink && router.push(navigateLink)
    }
    return (
        <>
            <Steps current={current} items={items} />
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(handleStudentSubmit)}>
                    <div>{steps[current].content}</div>
                    <div style={{ marginTop: 24 }}>
                        {current < steps.length - 1 && (
                            <Button type="primary" onClick={() => next()}>
                                Next
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button htmlType='submit' type="primary" onClick={() => message.success('Processing complete!')}>
                                Done
                            </Button>
                        )}
                        {current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                Previous
                            </Button>
                        )}
                    </div>
                </form>
            </FormProvider>
        </>
    );
};

export default StepperForm;