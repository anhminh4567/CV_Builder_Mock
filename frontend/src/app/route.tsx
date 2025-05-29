//import { useAuthContext } from "@/context/useAuthContext";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Routes, Route } from "react-router-dom";
import CustomizeCvPage from "./pages/CustomizeCvPage";
import AiCvParsePage from "./pages/AiCvParsePage";
import SecurityPage from "./pages/SecurityPage";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<CustomizeCvPage />} />
          <Route path="ai-cv-parse" element={<AiCvParsePage />} />
        </Route>
        <Route path="/security">
          <Route index element={<SecurityPage />} />
        </Route>
        <Route path="*" element={<div>ERROR</div>} />
      </Routes>
    </>
  );
};

export default AllRoutes;
