const http = axios.create({
    baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });