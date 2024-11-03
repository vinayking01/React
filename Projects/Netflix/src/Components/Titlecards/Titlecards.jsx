import React, { useEffect, useState } from 'react'
import './Titlecards.css'
import cards from '../../assets/cards/Cards_data'
import { useRef } from 'react';
import { Link } from 'react-router-dom';

// Adjust the component code to add the necessary utility classes
function Titlecards({title,category=null}) {
  const cardRef = useRef();
  const [movie_data, Set_movie_data] = useState(null);

  function MouseScroll(event)
  {
    event.preventDefault();
    cardRef.current.scrollLeft += event.deltaY;

  }

  useEffect(()=>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDVhNTdjZjQwZTI4NTVkNjdjZjJhYjk0OTY4YjVmNSIsIm5iZiI6MTczMDM1NzY2Mi40OTk3ODY5LCJzdWIiOiI2NzIzMjhjYjE2MDE0MTlmNzM2MjAyN2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RUiciLOPnqLVlZ1IEATUnyeUYn0Y3nhYo1cASEaHCLU'
      }
    };
    
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => {
        // console.log(res)
        Set_movie_data(res.results)
      })
      .catch(err => console.error(err));

    cardRef.current.addEventListener('wheel',MouseScroll)
  },[])

  return (
    <>
      <div>
        <div>
          <h2 className='text-2xl'>{(!title)?"Popular On Netflix":title}</h2>
        </div>
        {/* Add padding to the scroll area to better visualize the scrollbar */}
        <div className=' movie-inner-container flex gap-8 mx-w-[600px] overflow-hidden ' ref={cardRef}>
          {
           (movie_data) && movie_data.map((card, index) => {
              return (
                <Link to={`/player/${card.id}`} key={index} className='movie-image w-64 h-72 w-max-84 p-6 rounded-lg flex-shrink-0'>
                  <img src={`https://image.tmdb.org/t/p/w500/`+card.poster_path} alt="" className='w-full h-full bg-cyan-500 shadow-lg shadow-cyan-500/50 ' />
                  <p className='text-white relative bottom-7 pl-3'>{card.original_title}</p>
                </Link>
              )
            })
          }
        </div>
      </div>
    </>
  );
}

export default Titlecards;
