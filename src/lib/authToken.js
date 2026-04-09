export let getAccessToken = () => null;
export let getTokenType = () => "bearer";

export function registerTokenGetter(fn) {
  getAccessToken = fn;
}

export function registerTokenTypeGetter(fn) {
  getTokenType = fn;
}
