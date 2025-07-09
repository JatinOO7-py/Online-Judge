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

const executeCpp = (filepath, inputPath, timeout = 5000) => {
  // 5000 ms = 5 seconds
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, jobId);

  return new Promise((resolve, reject) => {
    let command = `g++ ${filepath} -o ${outPath} && ${outPath}`;
    if (inputPath) {
      command += ` < ${inputPath}`;
    }

    // Execute the command with a timeout
    const child = exec(command, { timeout }, (error, stdout, stderr) => {
      if (error) {
        if (error.code === 1) {
          // Compilation error
          reject({ error, stderr });
        } else if (error.killed) {
          // Timeout error
          reject({
            error: new Error("Process killed due to timeout"),
            stderr: "Time Limit Exceeded",
          });
        } else {
          reject({ error, stderr });
        }
      } else if (stderr) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });

    // Handle the case where the process was killed due to timeout
    child.on("error", (err) => {
      reject({ error: err, stderr: "Process error" });
    });
  });
};

export default executeCpp;
