import { useEffect,useState } from "react"

function useMobile() {
    const [isMobile,setIsMobile] = useState(null)
    useEffect(()=>{
        const maches = window.matchMedia("(max-width: 768px)").matches         
        setIsMobile(maches)
        window.addEventListener("resize",function(){
            const isMobile = window.matchMedia("(max-width: 768px)").matches         
            setIsMobile(isMobile)
            
            
        })
    
    },[])
  return isMobile
}

export default useMobile
