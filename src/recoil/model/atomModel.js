import { atom } from "recoil";

const atomModel = atom({
  key: "atomModel",
  default: "https://raw.githubusercontent.com/Shadows-hunters/samples-storage/main/Logo1.gltf",
});

export default atomModel;
