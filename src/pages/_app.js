import "@/styles/globals.css";
import "@/styles/global-loading.css";
import "@/styles/not-found.css";
import { Provider } from "react-redux";
import store from "@/redux/store";
import MainLayout from "@/components/MainLayout";
import "leaflet/dist/leaflet.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
}
