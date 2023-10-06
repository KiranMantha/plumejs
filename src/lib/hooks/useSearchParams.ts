import { useState } from './useState';

const useSearchParams = () => {
  const urlSearchParams = window.location.search;
  const initialValue: Record<string, string> = Object.fromEntries(new URLSearchParams(urlSearchParams).entries());
  const [searchParams, updateSearchParams] = useState(initialValue);
  const update = (str: URLSearchParams) => {
    const newobj: Record<string, string> = Object.fromEntries(str.entries());
    delete newobj['[object Object]'];
    updateSearchParams(newobj as any);
    window.history.pushState(null, '', `${location.pathname}?${new URLSearchParams(newobj).toString()}`);
  };
  return [searchParams, update];
};

export { useSearchParams };
