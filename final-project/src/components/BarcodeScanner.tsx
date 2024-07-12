import "./css/BarcodeScanner.css";
import { createWorker } from "tesseract.js";
import nutritionLabel from "../assets/nutritionlabelmainimage-1.jpg";

const BarcodeScanner = () => {
  (async () => {
    const worker = await createWorker("eng");
    const ret = await worker.recognize(nutritionLabel);
    console.log(ret.data.text);
    await worker.terminate();
  })();

  return <div className="BarcodeScanner">BarcodeScanner works</div>;
};

export default BarcodeScanner;
