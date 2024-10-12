import { useEffect,useState } from "react"

// API which giving the value of currency  

export default function UseCurrencyInfo(currency)
{   
    const [data, setData] = useState("")
    useEffect(()=>{
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`).then((res)=> res.json()).then((data)=>{
            setData(data[currency])
            console.log(data)
        })
    },[currency]) 
    
    return data;
}