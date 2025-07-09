import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

// Convert import.meta.url to a path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirInputs = path.join(__dirname, "inputs");

if (!fs.existsSync(dirInputs)) {
  fs.mkdirSync(dirInputs, { recursive: true });
}

const generateInputFile = async (input) => {
  const jobID = uuidv4();
  const input_filename = `${jobID}.txt`;
  const input_filePath = path.join(dirInputs, input_filename);
  fs.writeFileSync(input_filePath, input);
  return input_filePath;
};

export default generateInputFile;
