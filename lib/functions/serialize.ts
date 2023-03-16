export default (queries: {
  [key: string]: string | number | string[] | number[]
}) => {
  const serialized = []
  for (const query in queries) {
    if (typeof queries[query] !== 'object') {
      if (queries.hasOwnProperty(query)) {
        serialized.push(
          encodeURIComponent(query) +
            '=' +
            encodeURIComponent(queries[query] as string | number),
        )
      }
    } else {
      for (const value of queries[query as string] as string[] | number[]) {
        serialized.push(
          encodeURIComponent(query) +
            '=' +
            encodeURIComponent(value as string | number),
        )
      }
    }
  }
  return '?' + serialized.join('&')
}
