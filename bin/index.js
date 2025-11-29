#!/usr/bin/env node

import inquirer from "inquirer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { copyTemplate, installDeps } from "../src/utils.js";
import kleur from "kleur";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  console.log(kleur.green("⚡ create-x402-api"));

  const { projectName } = await inquirer.prompt([
    {
      name: "projectName",
      message: "Project name:",
      default: "x402-api",
    },
  ]);

  const { template } = await inquirer.prompt([
    {
      name: "template",
      type: "list",
      message: "Select a template:",
      choices: ["cloudflare-hono"],
    },
  ]);

  const templatePath = join(__dirname, "../templates", template);
  await copyTemplate(templatePath, projectName);

  console.log(kleur.yellow("📦 Installing dependencies..."));
  await installDeps(projectName);

  console.log(kleur.green(`\n✨ Project created at ./${projectName}`));
  console.log("Next steps:");
  console.log(kleur.cyan(`  cd ${projectName}`));
  console.log(kleur.cyan("  npm run dev"));
}

main();
