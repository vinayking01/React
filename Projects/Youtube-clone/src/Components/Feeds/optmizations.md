Previous code - 

```javascript 
   
   3. Old code
    
    if(search !=null)
        {
            await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&type=video&maxResults=30&q=${search}&key=${import.meta.env.VITE_YOUTUBE_APIKEY}`)
            .then(res => {return res.json()})
            .then(data =>{
                SetFeed(data.items);
                console.log(data.items)
            })
            .catch((err)=>{
                console.log("error in calling the api ", err)
            })

        
        }

    
```