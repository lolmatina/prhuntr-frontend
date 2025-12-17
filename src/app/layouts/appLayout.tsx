import { Outlet } from "react-router-dom";
import { EmployerMenu } from "@/widgets/menu/employer";
import { useState } from "react";
import { IconChevronLeft, IconUser } from "@tabler/icons-react";

type NavBarState = {
  title?: string;
};

export default function AppLayout() {
  const [nav, setNav] = useState<NavBarState>();

  return (
    <div className="h-dvh flex flex-col font-display bg-[#F9FAFB]">
      <div className="flex-0 bg-white">
        <div className="h-10 text-main">
          <div className="flex w-full h-full justify-between items-center px-4 py-1">
            <div className="flex gap-1 items-center">
              <IconChevronLeft size={24} />
              <span className="leading-[30px] text-[20px]">
                {(nav && nav.title) || "Мое резюме"}
              </span>
            </div>

            <IconUser width={30} height={24} />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Outlet context={{ setNav }} />
      </div>
      <div className="flex-0">
        <EmployerMenu />
      </div>
    </div>
  );
}
