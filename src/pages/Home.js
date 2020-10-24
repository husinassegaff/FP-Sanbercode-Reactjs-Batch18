import React, {Component} from "react"
import axios from "axios"

function minuteToHours(num){
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return ( rhours === 0 ? "" : rhours + " Jam") + (rminutes === 0 ? "" : " " + rminutes + " Menit")
}

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      movies: []
    }
  }

  componentDidMount(){
    axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
    .then(res => {
      let movies = res.data.map(el=>{ return {
          id: el.id, 
          description: el.description,
          duration: el.duration,
          genre: el.genre,
          image_url: el.image_url,
          rating: el.rating,
          review: el.review,
          title: el.title,
          year: el.year, 
      }})
      this.setState({movies})
    })
  }

  render(){
    return (
      <>
        <h1>Daftar Film Film Terbaik</h1>
        <div id="article-list">
          {
            this.state.movies.map((item)=>{
              return(
                <div>
                  <h3>{item.title}</h3>
                  <div style={{display: "inline-block"}}>
                    <div style={{width: "40vw", float: "left", display: "inline-block"}}>
                      <img style={{width: "100%", height: "300px", objectFit: "cover"}} src={item.image_url} />
                    </div>
                    <div style={{float: "left", "font-size": "20px", padding: "10px", top: 0, display: "inline-block" }}>
                      <strong>Rating {item.rating}</strong><br/>
                      <strong>Review {item.review}</strong><br/>
                      <strong>Durasi: {minuteToHours(item.duration)}</strong><br/>
                      <strong>genre: {item.genre}</strong>
                    </div>
                  </div>
                  <p>
                    <strong>deskripsi</strong>: 
                    {item.description}
                  </p>
                  <hr/>
                </div>
              )
            })
          }
        </div>
      </>
    )
  }
}

export default Home
