import React, {useState, useEffect} from 'react'
import Tours from './Tours';
import Loading from './Loading'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);

  const removeTour = (id) => {
    console.log(id);
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  }
  const fetchTours = async () => {
    try {
      setLoading(true)
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false)
      // console.log(data);
      setTours(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTours();
  }, [])

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn"
            onClick={() => fetchTours()}
          >
            refresh
          </button>
        </div>
      </main>
    )
  } 
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour}/>
    </main>
  )
  
}

export default App
