export let getAccessToken = () => null;

export function registerTokenGetter(fn: any) {
  getAccessToken = fn;
}
