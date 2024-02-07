import { useState } from './useState';
const useSearchParams = () => {
    const urlSearchParams = window.location.search;
    const initialValue = Object.fromEntries(new URLSearchParams(urlSearchParams).entries());
    const [searchParams, updateSearchParams] = useState(initialValue);
    const update = (str) => {
        const newobj = Object.fromEntries(str.entries());
        delete newobj['[object Object]'];
        updateSearchParams(newobj);
        window.history.pushState(null, '', `${location.pathname}?${new URLSearchParams(newobj).toString()}`);
    };
    return [searchParams, update];
};
export { useSearchParams };
