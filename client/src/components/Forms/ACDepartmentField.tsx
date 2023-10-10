
import { useAcademicDepartmentQuery } from "@/redux/api/academic/departmentApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";

type ACFacultyFieldProps = {
  name: string;
  label: string;
};

const ACDepartmentField = ({ name, label }: ACFacultyFieldProps) => {
  const { data, isLoading } = useAcademicDepartmentQuery({
    limit: 100,
    page: 1,
  });
  const academicDepartment: any[] = data?.academicDepartment;
  const acDepartmentOptions = academicDepartment?.map((acFaculty) => {
    return {
      label: acFaculty?.title,
      value: acFaculty?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={acDepartmentOptions as SelectOptions[]}
    />
  )
};

export default ACDepartmentField;