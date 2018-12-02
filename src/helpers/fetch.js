export function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (data.status !== "ok") {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

export function responseToText(response) {
  return Object.keys(response).reduce((acc, key) => acc + response[key] + "", "");
}

export function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return "%" + c.charCodeAt(0).toString(16);
  });
}
