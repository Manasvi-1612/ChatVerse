import { useEffect, useState } from "react";

const useLocalStorage = () => {
    const [storage, setStorage] = useState(JSON.parse(localStorage.getItem('storage') || 'false'))

    useEffect(() => {
        console.log("before storage", storage)
        localStorage.setItem('storage', JSON.stringify(storage))
        console.log("after storage", storage)
    }, [storage])

    return [storage, setStorage]
}

export default useLocalStorage;