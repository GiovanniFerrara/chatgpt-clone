import { lazy } from "react";
import useToaster from "../hooks/use-toaster.ts/use-toaster";
import { useAuth } from "../services/useAuth.service";
import { FullPageLoader } from "../components";

const AuthenticatedApp = lazy(() => import("./authenticated-app"));
const UnauthenticatedApp = lazy(() => import("./public-app"));

function App() {
  const { isLoading, account, error, isSuccess } = useAuth();

  useToaster({
    messages: [
      {
        condition: !!error,
        message: error,
        type: "error",
      },
    ],
  });

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (isSuccess && account?.id) {
    return <AuthenticatedApp />;
  }

  return <UnauthenticatedApp />;
}

export default App;
