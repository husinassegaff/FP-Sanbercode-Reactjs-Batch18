import React, {Component} from "react"
import axios from "axios"
import { Space, Card } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;
const { Paragraph } = Typography;

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
      <br />
        <Title>Daftar Film-Film Terbaik</Title>
        <div id="article-list">
          {
            this.state.movies.map((item)=>{
              return(
                <Space direction="vertical" style={{padding:"10px", margin:"auto"}}>
                  <Card style={{ width:450}}>
                    <div>
                      <Title level={3}>{item.title}</Title>
                      <div style={{display: "inline-block"}}>
                        <div style={{width: "40vw", float: "center", display: "inline-block"}}>
                          <img style={{width: "70%", height: "500px", objectFit: "cover"}} src={item.image_url} />
                        </div>
                        <div style={{float: "left", "font-size": "15px", padding: "10px", top: 0, display: "block" }}>
                          <strong>Rating : {item.rating}</strong><br/>
                          <strong>Review : {item.review}</strong><br/>
                          <strong>Durasi : {minuteToHours(item.duration)}</strong><br/>
                          <strong>Genre : {item.genre}</strong>
                        </div>
                      </div>
                      <strong>Deskripsi </strong>: 
                      <Paragraph ellipsis={{ rows: 1, expandable: true, symbol: 'selengkapnya' }}>
                        {item.description}
                      </Paragraph>
                      <hr/>
                    </div>
                  </Card>
                </Space>
              )
            })
          }
        </div>
      </>
    )
  }
}

export default Home
