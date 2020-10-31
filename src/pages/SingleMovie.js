import React, {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import { Space, Card } from 'antd';


const SingleMovie = () => {
  let { ID_MOVIES } = useParams();
  const [movie, setMovie] = useState(null) 

  useEffect(()=>{
    if (movie === null){
      axios.get(`https://backendexample.sanbersy.com/api/data-movie/${ID_MOVIES}`)
      .then(res => {
          setMovie(res.data)
      })
    }
  })

  return (
    <>
      {movie !== null &&
        <>
          <Space direction="vertical">
            <Card title="Card" stule={{width: 500}}>
              <h1>{movie.title}</h1>
              <p>{movie.description}</p>
              <p><img width="400" src={movie.image_url}/></p>
            </Card>
          </Space>
        </>
      }
    </>
  )

}

export default SingleMovie

