import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/app/store";
import { setEmployerFilters } from "@/entities/filter/api";
import { Button, CheckList, Picker, SearchBar } from "antd-mobile";
import { IconAdjustments } from "@tabler/icons-react";
import { Popup } from "@/shared/ui/popup";
import { label } from "framer-motion/client";

export function EmployerSearchFilter({ className }: { className?: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [visible, setVisible] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);

  const { cities: cityList } = useSelector(
    (state: RootState) => state.employerFilters
  );
  const dispatch = useDispatch<AppDispatch>();

  const cities = Array.from(new Set(params.getAll("cities[]")));
  const genders = Array.from(new Set(params.getAll("genders[]")));
  const ageFrom = params.get("ageFrom");
  const ageTo = params.get("ageTo");

  const updateFilter = useCallback(
    (key: string, value: number | string[]) => {
      const params = new URLSearchParams(location.search);
      params.delete(key);

      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.set(key, value.toString());
      }

      dispatch(setEmployerFilters(params));

      navigate({ pathname: "", search: params.toString() }, { replace: false });
    },
    [navigate, location.search]
  );

  const resetFilters = useCallback(() => {
    navigate({ pathname: "" }, { replace: false });
  }, [navigate]);

  return (
    <div className="bg-white p-4 flex gap-2 justify-between">
      <SearchBar
        placeholder="Имя или должность"
        style={{
          "--background": "#ffffff",
          "--height": "40px",
          "--border-radius": "8px",
          fontSize: "14px",
          lineHeight: "20px",
          borderColor: "#E2E8F0",
          borderWidth: "1px",
          borderRadius: "8px",
          width: "100%",
        }}
      />
      <button
        title="Фильтры"
        onClick={() => setVisible(true)}
        className="w-10 h-10 rounded-lg flex justify-center items-center bg-light">
        <IconAdjustments className="text-primary" size={20} />
      </button>
      <Popup
        height={380}
        visible={visible}
        onClose={() => setVisible(false)}
        onMaskClick={() => setVisible(false)}>
        <h2 className="text-center font-medium text-base leading-6 py-2">
          Фильтр
        </h2>
        <div className="px-2 py-4 text-main">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="city"
              className="block text-[14px] leading-5 font-medium">
              Город
            </label>
            <select
              name="city"
              id="city"
              value={0}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setPickerVisible(true);
              }}
              className="w-full border border-[#E2E8F0] py-2 px-3 rounded-lg">
              <option value="">Выберите город</option>
              {cityList &&
                cityList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </Popup>
      <Popup
        visible={pickerVisible}
        onClose={() => setPickerVisible(false)}
        onMaskClick={() => setPickerVisible(false)}
        height={300}>
        <CheckList>
          {cityList &&
            cityList.map((city) => (
              <CheckList.Item value={city.id} key={city.id}>
                {city.name}
              </CheckList.Item>
            ))}
        </CheckList>
      </Popup>
    </div>
  );
}
