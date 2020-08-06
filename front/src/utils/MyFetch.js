const defaultOptions = {
  headers: { 'Content-Type': 'application/json' },
};

export default async function (url, options) {
  const newOptions = Object.assign(defaultOptions, options);
  let request;
  if (sessionStorage.token) {
    const {token} = sessionStorage;
    newOptions.headers.authorization = `Bearer ${token}`;
  }
  try {
    request = await fetch(url, newOptions);
  } catch (e) {
    // needed during development
    // eslint-disable-next-line no-console
    console.log('fetch error:', e);
  }
  return request;
}
