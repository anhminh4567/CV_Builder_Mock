//import { useAuthContext } from "@/context/useAuthContext";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Routes, Route } from "react-router-dom";
import CustomizeCvPage from "./pages/CustomizeCvPage";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<CustomizeCvPage />} />
        </Route>
        <Route path="*" element={<div>ERROR</div>} />
      </Routes>
    </>
  );
};

export default AllRoutes;
