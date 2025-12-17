import { IconBriefcase2 } from "@tabler/icons-react";
import { Popup } from "antd-mobile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function EmployerMenuPopup() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      setVisible(true);
    });
  }, []);

  return (
    <Popup
      visible={visible}
      forceRender
      onMaskClick={handleClose}
      onClose={handleClose}
      afterClose={() => navigate(-1)}
      bodyClassName="h-[130px] rounded-t-2xl mb-[79px] py-8 px-4 border-b border-[#E2E8F0]">
      <div className="w-full h-full flex justify-evenly items-center">
        <div className="flex flex-col items-center justify-center gap-1 text-secondary">
          <IconBriefcase2 size={20} />
          <span>Вакансии</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 text-secondary">
          <IconBriefcase2 size={20} />
          <span>Вакансии</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 text-secondary">
          <IconBriefcase2 size={20} />
          <span>Вакансии</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 text-secondary">
          <IconBriefcase2 size={20} />
          <span>Вакансии</span>
        </div>
      </div>
    </Popup>
  );
}
