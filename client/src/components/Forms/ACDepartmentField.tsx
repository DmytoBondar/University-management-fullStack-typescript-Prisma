
import { useAcademicDepartmentQuery } from "@/redux/api/academic/departmentApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";

type ACFacultyFieldProps = {
  name: string;
  label: string;
};

const ACFacultyField = ({ name, label }: ACFacultyFieldProps) => {
  const { data, isLoading } = useAcademicDepartmentQuery({
    limit: 100,
    page: 1,
  });
  const academicFaculties: any[] = data?.academicDepartment;
  const acFacultyOptions = academicFaculties?.map((acFaculty) => {
    return {
      label: acFaculty?.title,
      value: acFaculty?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={acFacultyOptions as SelectOptions[]}
    />
  )
};

export default ACFacultyField;