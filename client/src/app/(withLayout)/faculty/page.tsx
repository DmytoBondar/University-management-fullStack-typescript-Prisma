import UMBreadCrumbs from "@/components/ui/UMBreadCrumbs";
import { getUserInfo } from "@/service/auth.service";

const FacultyPage = () => {
    const { role } = getUserInfo() as any;
    return (
        <>
            <UMBreadCrumbs items={
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
            <div>FacultyPage</div>
        </>
    )
}
export default FacultyPage;