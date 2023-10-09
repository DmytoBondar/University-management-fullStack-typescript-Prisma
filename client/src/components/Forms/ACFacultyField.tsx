import { useAcademicFacultyQuery } from "@/redux/api/academic/facultyApi";
import FormSelectField, { SelectOption } from "./FormSelectField";

type ACFacultyFieldProps = {
  name: string;
  label: string;
};

const ACFacultyField = ({ name, label }: ACFacultyFieldProps) => {
  const { data, isLoading } = useAcademicFacultyQuery({
    limit: 100,
    page: 1,
  });
  const academicFaculties: any[] = data?.academicfaculty;
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
      options={acFacultyOptions as SelectOption[]}
    />
  )
};

export default ACFacultyField;