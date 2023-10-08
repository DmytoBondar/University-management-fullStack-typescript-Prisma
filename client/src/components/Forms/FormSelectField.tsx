import { Select } from "antd";
import { useFormContext, Controller } from "react-hook-form";
type SelectOption = {
    label: string;
    value: string;
}

interface IInput {
    options: SelectOption[];
    name: string;
    type?: string;
    size?: "large" | "small";
    value?: string | string[] | undefined;
    id?: string;
    placeholder?: string;
    validation?: object;
    label?: string;
}

const FormSelectField = ({
    name,
    size,
    placeholder,
    label,
    options
}: IInput) => {
    const { control } = useFormContext();

    return (
        <>
            {label ? label : null}
            <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange } }) =>
                    <Select
                        onChange={onChange}
                        size={size}
                        options={options}
                        placeholder={placeholder}
                        value={value}
                        style={{ width: "100%" }}
                    />
                }
            />
        </>
    );
};

export default FormSelectField;
