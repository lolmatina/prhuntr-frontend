import { useLocation } from "react-router";
import { LoginForm, RoleSelectForm } from "./forms";
import { Roles } from "@/shared/enums/role";
import { AnimatePresence, motion } from "framer-motion";

export const Login = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role");

  const currentStep = role && role in Roles ? "login" : "initial";
  const forms = {
    initial: <RoleSelectForm />,
    login: (
      <LoginForm
        role={
          role && role in Roles ? (role as keyof typeof Roles) : "applicant"
        }
      />
    ),
  };
  return (
    <main className="flex justify-center items-center relative w-full h-full">
      <AnimatePresence>
        <motion.div
          key={currentStep}
          className="absolute"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}>
          {forms[currentStep]}
        </motion.div>
      </AnimatePresence>
    </main>
  );
};
