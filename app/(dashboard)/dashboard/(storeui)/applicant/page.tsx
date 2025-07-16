import Breadcrumbs from "@/components/breadcrumb";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { ThemeSwitch } from "@/components/theme-switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserNav } from "@/components/user-nav";
import { Metadata } from "next";
import { NotificationShow } from "@/components/dashboard/notification-show";
import ApplicantList from "./_components/applicant-list";

export const metadata: Metadata = {
  title: "Applicant | Manage applicant",
  description: "Manage applicant Description | applicant",
};

export default function Applicant() {
  return (
    <Layout>
      <ScrollArea className="h-[100vh]">
        {/* ===== Top Heading ===== */}
        <LayoutHeader>
          {/* <Search /> */}
          <Breadcrumbs
            items={[
              {
                label: "Manage Career",
                href: "/career",
              },
              { label: "Career List" },
            ]}
          />
          <div className="ml-auto flex items-center space-x-4">
            <NotificationShow />
   
            <UserNav />
          </div>
        </LayoutHeader>

        <LayoutBody className="flex flex-col" fixedHeight>
          <ApplicantList />
        </LayoutBody>
      </ScrollArea>
    </Layout>
  );
}
