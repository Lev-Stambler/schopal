export function onSearch(query: string, history: any) {
  history.push(`/results?query=${encodeURIComponent(query)}`);
}
