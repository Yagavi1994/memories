import { CurrentUserProvider } from "./contexts/CurrentUserContext";

const Root = () => (
  <CurrentUserProvider>
    <App />
  </CurrentUserProvider>
);

export default Root;
