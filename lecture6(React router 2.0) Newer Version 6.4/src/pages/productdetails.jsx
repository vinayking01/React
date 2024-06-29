
import { useParams } from 'react-router-dom'  // this is for the handling the dynamic routing because it only came here when the previous req made was dynamic 


export function ProductDetails()
{
    const params = useParams();
    console.log(params.id)
    return (
        <>
            <h3 style={{marginBottom: '20px'}}>Product Details</h3>
            <div style={{border : '3px solid red'}}>
             - Product id Details of - {params.id} 
            </div>

        </>
    )
}