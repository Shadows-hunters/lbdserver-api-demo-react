import "./App.css";
import Layout from "./components/layout/Layout";
import ModelDownload from "./components/pop-ups/ModelDownload";
import PodUpload from "./components/pop-ups/PodUpload";
import ImageDownload from "./components/pop-ups/ImageDownload";
import Viewer from "./components/Viewer/3dviewer";

function App() {
  return (
    <Layout>
      <Viewer />
      <PodUpload/>
      <ModelDownload/>
      <ImageDownload/>
    </Layout>
  );
}

export default App;
