'use client';

import FormSelectField, { SelectOptions } from "./FormSelectField";
import { useAcademicSemestersQuery } from "@/redux/api/academic/semesterApi";

type ACSemesterFieldProps = {
  name: string;
  label: string;
};

const ACSemesterField = ({ name, label }: ACSemesterFieldProps) => {
  const { data } = useAcademicSemestersQuery({
    limit: 100,
    page: 1,
  });
  const academicSemesters: any[] = data?.academicSemesters;
  const academicSemester = academicSemesters?.map((item) => {
    return {
      label: item?.title + '-' + item.year,
      value: item?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={academicSemester as SelectOptions[]}
    />
  )
};

export default ACSemesterField;