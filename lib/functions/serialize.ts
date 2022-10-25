export default (queries: { [key: string]: string | number }) => {
  const serialized = []
  for (var query in queries)
    if (queries.hasOwnProperty(query)) {
      serialized.push(
        encodeURIComponent(query) + '=' + encodeURIComponent(queries[query]),
      )
    }
  return '?' + serialized.join('&')
}
