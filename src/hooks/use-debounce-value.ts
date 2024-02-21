import { useEffect, useState } from "react";

export default function useDebounceValue<T = unknown>(value: T, deplay: number) {
    const [debounceValue, setDebounceValue] = useState(value)
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebounceValue(value)
      }, deplay)

      return () => {
        clearTimeout(handler)
      }
    }, [value, deplay])

    return debounceValue
}