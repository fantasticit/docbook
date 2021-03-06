export function resolveUrl(...parts) {
  const separator = '/';
  const replace = new RegExp(separator+'{1,}', 'g');
  return parts.join(separator).replace(replace, separator);
}
