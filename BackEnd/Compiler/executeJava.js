import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to a path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeJava = (filepath, inputPath = null, timeout = 5000) => {
  // Default timeout 5 seconds
  const jobId = path.basename(filepath).split(".")[0];
  const errorPath = path.join(outputPath, `${jobId}.err`);

  return new Promise((resolve, reject) => {
    let command;

    if (inputPath) {
      // Command with input file
      command = `java ${filepath}`;
    } else {
      // Command without input file
      command = `java ${filepath}`;
    }

    // Start the process
    const process = exec(
      command,
      { timeout, input: inputPath ? fs.readFileSync(inputPath) : undefined },
      (error, stdout, stderr) => {
        // Handle process errors
        if (error) {
          reject({
            error: error.message,
            stderr: stderr || error.message,
          });
          return;
        }
        if (stderr) {
          reject(stderr);
          return;
        }
        resolve(stdout);
      }
    );

    // Handle process termination due to timeout
    process.on("error", (err) => {
      reject({ error: err.message });
    });

    // Optionally log the errors to a file
    process.stderr.pipe(fs.createWriteStream(errorPath));
  });
};

export default executeJava;
