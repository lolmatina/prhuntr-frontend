import { createTheme, MantineProvider } from "@mantine/core";
import "../index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { LoginPage, RegistrationPage, SearchPage } from "../pages";
import { PersistGate } from "redux-persist/integration/react";
import { AppLayout, ProtectedLayout } from "./layouts";

const theme = createTheme({});

export function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MantineProvider theme={theme}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to="/search" replace />} />
                <Route path="auth">
                  <Route
                    index
                    element={<Navigate to="/auth/login" replace />}
                  />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegistrationPage />} />
                </Route>
                <Route element={<AppLayout />}>
                  <Route element={<ProtectedLayout />}>
                    <Route path="search" element={<SearchPage />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </MantineProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
