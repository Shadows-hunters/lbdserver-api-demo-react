import "./App.css";
import Layout from "./components/layout/Layout";
import Viewer from "./components/Viewer/3dviewer";

function App() {
  return (
    <Layout>
      <Viewer title={"7. Our viewer."} />
    </Layout>
  );
}

export default App;
