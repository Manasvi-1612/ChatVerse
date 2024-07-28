import { useEffect, useState } from "react";

const useLocalStorage = () => {
    const [storage, setStorage] = useState(JSON.parse(localStorage.getItem('storage') || 'false'))

    useEffect(() => {
        localStorage.setItem('storage', JSON.stringify(storage))
    }, [storage])

    return [storage, setStorage]
}

export default useLocalStorage;