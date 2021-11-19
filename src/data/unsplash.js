import { createApi } from "unsplash-js";

const apiAccess = "";

export const unsplash = createApi({
  accessKey: apiAccess,
});
