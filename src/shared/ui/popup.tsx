import type { ReactNode } from "react";
import { Popup as AntdPopup } from "antd-mobile";

export function Popup({
  height,
  visible,
  onClose,
  onMaskClick,
  children,
}: {
  height: string | number;
  visible: boolean;
  onClose: () => void;
  onMaskClick: () => void;
  children: ReactNode;
}) {
  return (
    <AntdPopup
      visible={visible}
      onMaskClick={onMaskClick}
      onClose={onClose}
      bodyStyle={{
        height,
      }}
      bodyClassName="rounded-t-2xl mb-[79px] py-8 px-4 border-b border-[#E2E8F0]">
      {children}
    </AntdPopup>
  );
}
