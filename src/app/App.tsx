import { createTheme, MantineProvider } from "@mantine/core";
import "../index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { BrowserRouter, useLocation } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { PageRoutes, PopupRoutes } from "./routes";

const theme = createTheme({});

export function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MantineProvider theme={theme}>
            <BrowserRouter>
              <RoutesLayout />
            </BrowserRouter>
          </MantineProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

function RoutesLayout() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <>
      <PageRoutes location={location} backgroundLocation={backgroundLocation} />
      <PopupRoutes backgroundLocation={backgroundLocation} />
    </>
  );
}

export default App;
