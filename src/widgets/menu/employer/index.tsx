import { Popup } from "@/shared/ui/popup";
import {
  IconAtom,
  IconBriefcase2,
  IconFile,
  IconHeart,
  IconHome,
  IconLayoutGrid,
  IconUsers,
} from "@tabler/icons-react";

import { useState, type ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const list = [
  {
    link: "/home",
    icon: <IconHome size={20} />,
    title: "Главная",
    main: false,
  },
  {
    link: "/menu",
    title: "Меню",
    icon: <IconLayoutGrid size={28} />,
    main: true,
  },
  {
    link: "/ai-hr",
    title: "AI HR",
    icon: <IconAtom size={20} />,
    main: false,
  },
];

const menuList = [
  {
    link: "/vacancies",
    icon: <IconBriefcase2 size={20} />,
    title: "Вакансии",
    main: false,
  },
  {
    link: "/candidates",
    icon: <IconUsers size={20} />,
    title: "Кандидаты",
    main: false,
  },
  {
    link: "/price",
    icon: <IconFile size={20} />,
    title: "Прайс",
    main: false,
  },
  {
    link: "/favorites",
    icon: <IconHeart size={20} />,
    title: "Избранные",
    main: false,
  },
];

export function EmployerMenu() {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const activeTab = list.find((item) => pathname.endsWith(item.link));
  const [active, setActive] = useState(activeTab);
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    navigate(value);
  };

  return (
    <>
      <nav className="flex justify-center items-end gap-8 h-[93px] pb-[21px] bg-transparent relative z-1001">
        <div className="w-full absolute left-0 bottom-0 h-[79px] bg-white z-0" />
        {list.map((item) => (
          <MenuItem
            active={!!active && active.link == item.link}
            icon={item.icon}
            link={item.link}
            title={item.title}
            main={item.main}
            onClick={(value) => {
              if (item.main) {
                setOpen(true);
                return;
              }
              handleSelect(value);
              setActive(item);
            }}
            key={item.link}
          />
        ))}
      </nav>
      <Popup
        height={130}
        visible={open}
        onMaskClick={() => setOpen(false)}
        onClose={() => setOpen(false)}>
        <div className="w-full h-full flex justify-evenly items-center">
          {menuList.map((item) => (
            <MenuItem
              active={!!active && active.link == item.link}
              icon={item.icon}
              link={item.link}
              title={item.title}
              main={item.main}
              onClick={(value) => {
                if (item.main) {
                  setOpen(true);
                  return;
                }
                handleSelect(value);
                setActive(item);
                setOpen(false);
              }}
              key={item.link}
            />
          ))}
        </div>
      </Popup>
    </>
  );
}

function MenuItem({
  link,
  title,
  active,
  main,
  icon,
  onClick,
}: {
  link: string;
  title: string;
  active: boolean;
  main?: boolean;
  icon: ReactElement;
  onClick: (value: string) => void;
}) {
  const handleClick = () => {
    onClick(link);
  };

  return (
    <>
      {main ? (
        <div
          onClick={handleClick}
          className="w-[72px] aspect-square bg-primary text-white rounded-full flex flex-col justify-center items-center relative z-1001">
          {icon}
          <span className="font-medium leading-[18px] text-[10px]">
            {title}
          </span>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className={`w-[58px] aspect-square flex flex-col justify-center items-center gap-1 group relative z-0 ${active ? "text-primary" : " text-black"}`}>
          {icon}
          <span className="font-medium leading-[18px] text-[10px]">
            {title}
          </span>
        </div>
      )}
    </>
  );
}
