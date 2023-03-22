type searchParams = {
  search: string,
  vegetarian: boolean,
  gluten: boolean,
  dairy: boolean
}

export function urlParams (obj: searchParams): string {
  const paramsList = Object.entries(obj);
  if (paramsList.length === 0) return "";
  
  const result = paramsList.map(param => param.join('=')).join('&')
  return `?${result}`
}