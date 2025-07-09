import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

// Convert import.meta.url to a path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, content) => {
  const jobID = uuidv4();
  const filename = `${jobID}.${format}`;
  const filePath = path.join(dirCodes, filename);
  fs.writeFileSync(filePath, content);
  return filePath;
};

export default generateFile;
