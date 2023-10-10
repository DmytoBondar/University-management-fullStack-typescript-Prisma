"use client";

import { DatePicker } from "antd";
import { useFormContext, Controller } from "react-hook-form";
import dayjs from 'dayjs';

export type SelectOptions = {
    label: string;
    value: string;
};

type SelectFieldProps = {
    name: string;
    label?: string;
    picker: 'year' | 'time'
};

const FormYearField = ({
    name,
    label,
    picker
}: SelectFieldProps) => {
    const { control } = useFormContext();

    return (
        <>
            {label ? label : null}
            <br />
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <DatePicker
                        style={{ width: "100%" }}
                        defaultValue={field.value}
                        size="large"
                        picker={picker}
                        value={field.value ? dayjs().year(field.value) : null}
                        onChange={(_, dateString) => {
                            field.onChange(dateString)
                        }}
                    />
                )}
            />
        </>
    );
};

export default FormYearField;