import { atom } from "recoil";

const atomModel = atom({
  key: "atomModel",
  default: "https://raw.githubusercontent.com/LBD-Hackers/lbdserver-client-api/main/tests/artifacts/duplex.gltf",
});

export default atomModel;
