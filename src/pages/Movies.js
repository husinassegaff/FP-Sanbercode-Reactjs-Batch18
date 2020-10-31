import React, {useState, useEffect} from "react"
import axios from "axios"
import "./Movies.css"

const Movies = () => {
  
  const [movies, setMovies] =  useState(null)
  const [input, setInput]  =  useState({
    description: "",
    duration: 120,
    genre: "",
    rating: 0,
    review: "",
    title: "",
    year: 2020
  })
  const [ID_MOVIES, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")
  const [search, setSearch] = useState("")

  useEffect( () => {
    if (movies === null){
      axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
      .then(res => {
          setMovies(res.data.map(el=>{ return {
            id: el.id, 
            description: el.description,
            duration: el.duration,
            genre: el.genre,
            image_url: el.image_url,
            rating: el.rating,
            review: el.review,
            title: el.title,
            year: el.year 
          }
        }))
      })
    }
  }, [movies])
  
  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "description":
      {
        setInput({...input, description: event.target.value});
        break
      }
      case "duration":
        {
          setInput({...input, duration: event.target.value});
            break
        }
      case "genre":
        {
        setInput({...input, genre: event.target.value});
            break
        }
      case "image_url":
        {
          setInput({...input, image_url: event.target.value});
            break
        }
      case "rating":
        {
          setInput({...input, rating: event.target.value});
            break
        }
      case "review":
        {
          setInput({...input, review: event.target.value});
            break
        }
      case "title":
        {
            setInput({...input, title: event.target.value});
            break
        }
      case "year":
        {
            setInput({...input, year: event.target.value});
            break
        }
    default:
      {break;}
    }
  }

  const handleSubmit = (event) =>{
    // menahan submit
    event.preventDefault()

    let title = input.title
    console.log(input)

    if (title.replace(/\s/g,'') !== ""){      
      if (statusForm === "create"){        
        axios.post(`https://backendexample.sanbersy.com/api/data-movie`, {
            description: input.description,
            duration: input.duration,
            genre: input.genre,
            rating: parseInt(input.rating),
            review: input.review,
            title: input.title,
            year: input.year
        })
        .then(res => {
            setMovies([...movies, {id: res.data.id, ...input}])
        })
      }else if(statusForm === "edit"){
        axios.put(`https://backendexample.sanbersy.com/api/data-movie/${ID_MOVIES}`, {
            description: input.description,
            duration: input.duration,
            genre: input.genre,
            rating: parseInt(input.rating),
            review: input.review,
            title: input.title,
            year: input.year
        })
        .then(res => {
            let singleMovie = movies.find(el=> el.id === ID_MOVIES)
            singleMovie.description = input.description
            singleMovie.duration = input.duration
            singleMovie.genre = input.genre
            singleMovie.rating = input.rating
            singleMovie.review = input.review
            singleMovie.title = input.title
            singleMovie.year = input.year
            setMovies([...movies])
        })
      }
      
      setStatusForm("create")
      setSelectedId(0)
      setInput({
          description: "",
          duration: 120,
          genre: "",
          image_url: "",
          rating: 0,
          review: "",
          title: "",
          year: 2020
      })
    }

  }

  const Action = ({ID_MOVIES}) =>{
    const handleDelete = () => {  
      let newMovies = movies.filter(el => el.id !== ID_MOVIES)
  
      axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${ID_MOVIES}`)
      .then(res => {
        console.log(res)
      })
            
      setMovies([...newMovies])
      
    }
    
    const handleEdit = () =>{
      let singleMovie = movies.find(x=> x.id === ID_MOVIES)
      setInput({
          title: singleMovie.title,
          description: singleMovie.description,
          year: singleMovie.year,
          duration: singleMovie.duration,
          genre: singleMovie.genre,
          rating: singleMovie.rating,
          review: singleMovie.review
      })
      setSelectedId(ID_MOVIES)
      setStatusForm("edit")
    }

    return(
      <>
        <button onClick={handleEdit}>Edit</button>
        &nbsp;
        <button onClick={handleDelete}>Delete</button>
      </>
    )
  }

  function truncateString(str, num) {
    if (str === null){
      return ""
    }else{
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    }
  }
  

  const submitSearch = (e) =>{
    e.preventDefault()
    axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
    .then(res => {
      let resMovies = res.data.map(el=>{ return {
          id: el.id, 
          description: el.description,
          duration: el.duration,
          genre: el.genre,
          image_url: el.image_url,
          rating: el.rating,
          review: el.review,
          title: el.title,
          year: el.year 
        }
      })

      let filteredMovies = resMovies.filter(x=> x.title.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      setMovies([...filteredMovies])
    })
 
  }

  const handleChangeSearch = (e)=>{
    setSearch(e.target.value)
  }

  return(
    <>
      <br/>
      <div>
        <form onSubmit={submitSearch}>
          <input type="text" value={search} onChange={handleChangeSearch} />
          <button>search</button>
        </form>
      </div>

      <h1>Daftar Film</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Year</th>
            <th>Duration</th>
            <th>Genre</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

            {
              movies !== null && movies.map((item, index)=>{
                return(                    
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.title}</td>
                    <td title={item.description}>{truncateString(item.description, 20)}</td>
                    <td>{item.year}</td>
                    <td>{item.duration}</td>
                    <td>{item.genre}</td>
                    <td>{item.rating}</td>
                    <td>{item.review}</td>
                    <td>
                      <Action itemId={item.id} />

                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
      {/* Form */}
      <br/>
      <h1>Movies Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{float: "left"}}>
            Title:
          </label>
          <input style={{float: "right"}} type="text" name="title" value={input.title} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div>
          <label style={{float: "left"}}>
            Description:
          </label>
          <textarea style={{float: "right"}} type="text" name="description" value={input.description} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Year:
          </label>
          <input style={{float: "right"}} type="number" max={2020} min={1980}  name="year" value={input.year} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Duration:
          </label>
          <input style={{float: "right"}} type="number" name="duration" value={input.duration} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Genre:
          </label>
          <input style={{float: "right"}} type="text" name="genre" value={input.genre} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Rating:
          </label>
          <input style={{float: "right"}} type="number" max={10} min={0} name="rating" value={input.rating} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div>
          <label style={{float: "left"}}>
            Review:
          </label>
          <textarea style={{float: "right"}} type="text" name="review" value={input.review} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Image Url:
          </label>
          <textarea style={{float: "right"}} cols="50" rows="3" type="text" name="image_url" value={input.image_url} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <br/>
        <br/>
        <button>submit</button>
      </form>
    </>
  )
}

export default Movies
