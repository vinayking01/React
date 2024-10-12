import { useState } from "react";
import { useEffect } from "react"
import {PokemonCard} from "./PokemonCard"
import  "./index.css";

export function Pokemon(){
    const [Pokemon,setPokemon] = useState([]);
    const [loading, setLoading] = useState(true)
    const [Error, setError] = useState(null)
    const [search, setSearch] = useState("")

    const API =  'https://pokeapi.co/api/v2/pokemon/?limit=34';
    
    const FetchPokemon = async() =>{
        try{
            const res = await fetch(API);
            const data = await res.json();

            const detailedPokemonData  = data.results.map(async (currPokemon)=>{ 
                const res = await fetch(currPokemon.url);
                const data  = await res.json();
               return data;
            });

            const detailedResponse  = await Promise.all(detailedPokemonData);
            setPokemon(detailedResponse)
            setLoading(false)
           
            

        }catch(error)
        {
            setError(error)
            setLoading(false)
        }
    }

    useEffect(()=>{
        FetchPokemon();
    },[])

    // Applying the searching functionality  - giving the data according to search
    const SearchPokemon = Pokemon.filter((curPokemon)=>{
        // console.log("nam",curPokemon)
        return curPokemon.name.toLowerCase().includes(search.toLowerCase())
    });
    // console.log(SearchPokemon)
    
  
    // if loading is going on
    // console.log(loading)
    if(loading)
    {
        return(
            <div>
                <h1>loading ... </h1>
            </div>
        )
    }

    // if error comes in call of API
    if(Error)
        {
            return(
                <div>
                    <h1>{Error.message}</h1>
                </div>
            )
        }
    return (
        <>
        <section className="container">
        <header>
        <h1>Lets Catch Pokemon</h1>
        </header>
        <div className="pokemon-search">
        <input type="text" value={search} onChange={(e)=>{
            setSearch(e.target.value)
        }}/>
        </div>
        <div>
            <ul className="cards">
                    {SearchPokemon.length?SearchPokemon.map((currPokemon) => (
                        <PokemonCard key={currPokemon.id} currPokemon={currPokemon} />
                    )):<h1>Data Not Present.</h1>}
            </ul>
        </div>
        </section>
        </>
    )
}