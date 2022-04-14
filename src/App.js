import { Grid } from "@mui/material";
import "./App.css";
import SliderTab from "./components/SliderTab";
import Viewer from "./components/Viewer/3dviewer";

function App() {
  return (
    <Grid
      style={{ textAlign: "justify" }}
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      <Grid item xs={0} sm={2} md={3} />
      <Grid item style={{ margin: 15 }} xs={4} sm={4} md={6}>
        <div style={subComponentStyle}>
          <SliderTab title={"8. Our sliders."} />
        </div>
        <div style={subComponentStyle}>
          <Viewer title={"7. Our viewer."} />
        </div>
      </Grid>
      <Grid item xs={0} sm={2} md={3} />
    </Grid>
  );
}

const subComponentStyle = {
  marginTop: 30,
  border: "2px solid gray",
  borderRadius: 15,
  padding: 15,
};

export default App;
