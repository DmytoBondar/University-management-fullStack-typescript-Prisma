"use client";

import Actionbar from "@/components/ui/Actionbar";
import ClassSchedule from "@/components/ui/ClassSchedule";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import { useMyCourseSchedulesQuery } from "@/redux/api/studentApi";

const MyCourseSchedulePage = () => {
  const { data, isLoading } = useMyCourseSchedulesQuery({});
  const myCourseSchedules = data?.myCourseSchedules;

  const columns = [
    {
      title: "Course name",
      dataIndex: "offeredCourse",
      render: function (data: any) {
        return <>{data.course.title}</>;
      },
    },
    {
      title: "Credit",
      dataIndex: "offeredCourse",
      render: function (data: any) {
        return <>{data.course.credits}</>;
      },
    },
    {
      title: "Section",
      dataIndex: "offeredCourseSection",
      render: function (data: any) {
        return <>{data.title}</>;
      },
    },
    {
      title: "Class Schedules",
      dataIndex: "offeredCourseSection",
      render: function (data: any) {
        return (
          <>
            <ClassSchedule
              data={
                data.offeredCourseClassSchedules as any[]
              }
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <UMBreadCrumb
        items={[
          { label: `student`, link: `/student` },
          { label: `courses`, link: `/student/courses` },
        ]}
      />

      <Actionbar title="My course schedules"></Actionbar>

      <UMTable
        loading={isLoading}
        dataSource={myCourseSchedules}
        columns={columns}
        showPagination={false}
      />
    </>
  );
};

export default MyCourseSchedulePage;