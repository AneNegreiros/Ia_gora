import { createBrowserRouter } from "react-router";
import Home from "./components/Home";
import AISupport from "./components/AISupport";
import PanicPhrase from "./components/PanicPhrase";
import Community from "./components/Community";
import ChameleonSettings from "./components/ChameleonSettings";
import EmergencyContacts from "./components/EmergencyContacts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/ai-support",
    Component: AISupport,
  },
  {
    path: "/panic-phrase",
    Component: PanicPhrase,
  },
  {
    path: "/community",
    Component: Community,
  },
  {
    path: "/chameleon-settings",
    Component: ChameleonSettings,
  },
  {
    path: "/emergency-contacts",
    Component: EmergencyContacts,
  },
]);
