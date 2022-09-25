import goro from "./goro1.jpg";
import gasha from "./gasha1.jpg";
import gole from "./gole2.jpg";
import { ISliderImage } from "../../src/Interfaces/ISliderModel";

const images: ISliderImage[] = [
  {
    index: 1,
    url: gasha.src,
    sex: "male",
  },
  {
    index: 2,
    url: gole.src,
    sex: "male",
  },
  {
    index: 3,
    url: goro.src,
    sex: "male",
  },
];

export default images;
