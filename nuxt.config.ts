// https://nuxt.com/docs/api/configuration/nuxt-config

//versioning
import { execSync } from "child_process";
const cmSha = execSync("git rev-parse --short HEAD").toString();
console.log(`current commit: ${cmSha}`); //debug

export default defineNuxtConfig({
  title: "Echo Net Extras",
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@nuxt/image"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  css: [
    // importing fonts
    "~/assets/fonts/nunito.css",
    "~/assets/fonts/lexend.css",
  ],

  runtimeConfig: {
    public: {
      sha: cmSha, //versioning
    },
  },
  compatibilityDate: "2024-12-19",
  experimental: {
    appManifest: false,
  },
});
