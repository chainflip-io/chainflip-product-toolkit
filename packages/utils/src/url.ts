export const parseUrlWithBasicAuth = (url: string) => {
  const rpcUrl = new URL(url);

  let headers = {};
  if (rpcUrl.username || rpcUrl.password) {
    headers = { Authorization: `Basic ${btoa(`${rpcUrl.username}:${rpcUrl.password}`)}` };
    rpcUrl.username = '';
    rpcUrl.password = '';
  }

  return { url: rpcUrl.toString(), headers };
};
