import { useRecoilValue } from "recoil";
import "./App.css";
import Layout from "./components/layout/Layout";
import Viewer from "./components/Viewer/3dviewer";
import withCalculation from "./recoil/parameters";

function App() {
  return (
    <Layout>
      <Viewer result={useRecoilValue(withCalculation)} />
    </Layout>
  );
}

export default App;
