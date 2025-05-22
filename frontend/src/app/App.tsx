import DefaultLayout from "@/layouts/DefaultLayout";
import { Provider } from "@/app/providers/ChakraProvider";
import AllRoutes from "./route";

function App() {
  return (
    <Provider>
      <AllRoutes />
    </Provider>
  );
}

export default App;
