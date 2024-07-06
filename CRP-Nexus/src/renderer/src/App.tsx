import Login from "./components/login/Login";

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send("ping");

  return (
    <>
      <Login />
    </>
  );
}

export default App;
