import Login from "./components/login/Login";
import Loading from "./components/loading/Loading";

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send("ping");

  return (
    <>
      <Loading />
    </>
  );
}

export default App;
