#!/usr/bin/env node

import { intro, outro, text, select } from "@clack/prompts";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { copyTemplate, installDeps } from "../src/utils.js";
import kleur from "kleur";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  intro(kleur.green("⚡ create-x402-api"));

  const projectName = await text({
    message: "Project name:",
    placeholder: "x402-api",
    initialValue: "x402-api",
    validate(value) {
      if (!value.length) return "Project name is required.";
    },
  });

  const template = await select({
    message: "Select a template:",
    initialValue: "cloudflare-hono",
    options: [
      { value: "cloudflare-hono", label: "cloudflare-hono" },
      { value: "cloudflare-express", label: "cloudflare-express" },
    ],
  });

  const templatePath = join(__dirname, "../templates", template);
  await copyTemplate(templatePath, projectName);

  console.log(kleur.yellow("📦 Installing dependencies..."));
  await installDeps(projectName);

  outro(kleur.green(`✨ Project created at ./${projectName}`));
  console.log(kleur.cyan(`  cd ${projectName}`));
  console.log(kleur.cyan("  npm run dev"));
}

main();
