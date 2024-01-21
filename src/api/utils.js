import Cookies from "js-cookie";

/**
 * Get the appropriate host
 */
export const apiHost =
  process.env.NODE_ENV === "development2" ? "http://127.0.0.1:8000" : "https://unseen-servant.tridengames.com";

/**
 * Apply the csrf headers
 * @param {*} headers an object containing existing headers
 * @returns an object hash with django csrftoken applied
 */
export const applyCsrf = (headers) => {
  const csrf = Cookies.get("csrftoken");
  return headers ? { ...headers, "X-CSRFToken": csrf } : { "X-CSRFToken": csrf };
};
