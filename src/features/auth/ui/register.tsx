import { useLocation } from "react-router";
import { RegisterForm, VerifyEmailForm } from "./forms";
import { Roles } from "@/shared/enums/role";
import { AnimatePresence, motion } from "framer-motion";

export function Registration() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role");
  const registrationFinished = params.get("registrationFinished");

  const currentStep =
    registrationFinished && registrationFinished !== "" ? "finish" : "initial";
  const forms = {
    finish: <VerifyEmailForm email={registrationFinished || ""} />,
    initial: (
      <RegisterForm
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
}
