import { useEffect, useRef, useState } from "react";

function useInView({threshold, debouncing}){
    const [isInView, setIsInView] = useState(false)
    const ref = useRef(null)
    const timeRef = useRef(null)

    useEffect(() =>{
       
        const observe = new IntersectionObserver(
            ([entry]) => {
                if(timeRef.current) clearTimeout(timeRef.current)
                timeRef.current = setTimeout(() =>{
                    setIsInView(entry.isIntersecting)
                },debouncing)
            },{threshold}
        )
        observe.observe(ref.current)
        return () =>{
            if(timeRef.current) clearTimeout(timeRef.current)
            observe.disconnect()
        }

    },[threshold, debouncing])

    return [ref, isInView]
}

export default useInView