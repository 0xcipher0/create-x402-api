import fs from "fs";
import { join } from "path";
import ora from "ora";
import { execa } from "execa";

export async function copyTemplate(src, dest) {
  const spinner = ora(`Copying template...`).start();

  fs.mkdirSync(dest);
  copyDirectory(src, dest);

  spinner.succeed("Template copied.");
}

function copyDirectory(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const files = fs.readdirSync(src);

  for (const file of files) {
    const srcPath = join(src, file);
    const destPath = join(dest, file);

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

export async function installDeps(directory) {
  try {
    await execa("npm", ["install"], { cwd: directory });
  } catch (err) {
    console.error("Dependency installation failed:", err);
  }
}
