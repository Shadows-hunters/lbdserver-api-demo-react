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

const subComponentStyle = {
  marginTop: 30,
  border: "2px solid gray",
  borderRadius: 15,
  padding: 15,
};

export default App;
