import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { getUserInfo } from "@/service/auth.service";

const StudentPage = () => {
    const { role } = getUserInfo() as any;

    return (
        <>
            <UMBreadCrumb items={
                [
                    {
                        label: `${role}`,
                        link: `/${role}`
                    },
                    {
                        label: `student`,
                        link: `/${role}/student`
                    }
                ]
            }
            />
            <div>StudentPage</div>
        </>
    )
}

export default StudentPage