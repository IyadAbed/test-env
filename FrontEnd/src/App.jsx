import { useEffect, useState } from "react"
import axios from 'axios'

function App() {
  const [records, Setrecords] =useState([])

  useEffect(()=>{
    axios.get('http://127.0.0.1:5000/users')
    .then(res =>{Setrecords(res.data)})
    .catch(err => console.log(err))
  }, [])

  return (

    <>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
          {records.map((r, i) =>(
                      <tr key={i}>
                      <td>{r.id}</td>
                      <td>{r.name}</td>
                    </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
