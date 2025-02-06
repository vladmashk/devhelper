import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig({
    base: "/devhelper/",
    plugins: [
        react(),
        checker({typescript: {tsconfigPath: "tsconfig.app.json"}})
    ],
    server: {
        host: true
    }
});
