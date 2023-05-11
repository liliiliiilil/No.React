import { defineConfig, loadEnv } from "vite";
import dev from "./build/dev";
import prod from "./build/prod";

export default defineConfig(({ command, mode }) => {
  if (command === "serve") {
    return dev({
      env: loadEnv(mode, process.cwd()),
    });
  } else {
    return prod({
      env: loadEnv(mode, process.cwd()),
    });
  }
});
