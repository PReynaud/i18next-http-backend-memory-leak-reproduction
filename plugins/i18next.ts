import { defineNuxtPlugin } from "#imports";
import type { InitOptions } from "i18next";
import { createInstance } from "i18next";
import Backend from "i18next-http-backend";
import I18NextVue from "i18next-vue";
import type { App } from "vue";

export default defineNuxtPlugin(async (nuxtApp) => {
  try {
    // This is very important to create a new instance of i18next for each Nuxt app
    // (to avoid sharing the same instance for SSR applications)
    const i18next = createInstance();

    const i18nConfiguration: InitOptions = {
      lng: "fr",
      load: "languageOnly",
      debug: true,
      supportedLngs: ["fr", "en"],
      backend: {
        loadPath: "/public/locales/locales.{{lng}}.json",
        request: async (_: any, url: string, __: any, callback: any) => {
          try {
            const response = await useFetch(url);
            if (response) {
              callback(null, { status: 200, data: response });
            } else {
              callback(
                new Error("Error while fetching current translation file")
              );
            }
          } catch (e) {
            callback(e);
          }
        },
      },
      postProcess: [],
    };

    i18next.use(Backend);

    await i18next
      // Init i18next. For all options read: https://www.i18next.com/overview/configuration-options
      .init(i18nConfiguration);

    (nuxtApp.vueApp as App).use(I18NextVue, { i18next });
  } catch (err: unknown) {
    console.error(err);
  }
});
