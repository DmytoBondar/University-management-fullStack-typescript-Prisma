"use client";

import { Input } from "antd";
import { useFormContext, Controller } from "react-hook-form";

interface IInput {
    name: string;
    type?: string;
    size?: "large" | "small";
    value?: string | string[] | undefined;
    id?: string;
    placeholder?: string;
    validation?: object;
    label?: string;
    rows?: number;
}

const FormTextArea = ({
    name,
    type,
    size,
    value,
    id,
    placeholder,
    validation,
    label,
    rows
}: IInput) => {
    const { control } = useFormContext();

    return (
        <div className={`flex flex-col w-full`}>
            {label ? label : null}
            <Controller
                control={control}
                name={name}
                render={({ field }) =>

                    <Input.TextArea
                        rows={rows}
                        placeholder={placeholder}
                        {...field}
                        defaultValue={value}
                    />
                }
            />
        </div>
    );
};

export default FormTextArea;
