export let getAccessToken = () => null;

export function registerTokenGetter(fn) {
  getAccessToken = fn;
}
