
import { useState } from 'react';
import './App.css';

const MovieProperties = [
  {
    id : 1 ,
    MovieName : 'white-bird' ,
    src : './white-bird.jpg',
    reservedSeats : []

  },
  {
    id : 2 ,
    MovieName : 'The great escape' ,
    src : './great-escape.jpg',
    reservedSeats : []
  },
  {
    id : 3 ,
    MovieName : 'fury' ,
    src : './fury.jpg',
    reservedSeats : []

  },
  {
    id : 4 ,
    MovieName : 'Extraction' ,
    src : './extraction.jpg',
    reservedSeats : []

  }

]

function App() {
  const [SelectedMovie , setSelectedMovie] = useState(null)
  const [currentMovie , setCurrentMovie] = useState(MovieProperties)
  const [reserve , setreserve] = useState([])
  const [allReservedSeat, setAllReservedSeat] = useState([])
  
  function handleSelectMovie(movie){
  setSelectedMovie((select)=> select?.id == movie.id  ? null : movie)
  setreserve([]);
  }
  
  function handleResve(seatNumber){
    if(!SelectedMovie) return ;
    if(allReservedSeat.includes(seatNumber)){
      alert(`the ${seatNumber} is reserved before!`)
      return ;
    }
    setreserve(
      prev=> {
        if(prev.includes(seatNumber)){
          return prev.filter(seat => seat !== seatNumber)
          
        }else{
          return [...prev , seatNumber]
          
        }
      }
    )
    
    console.log(reserve);
    
    
    
  }

  function handleSaveReserve(){
    if(!SelectedMovie || reserve.length === 0) return;
   const updateMovies = currentMovie.map((movie)=> movie.id === SelectedMovie.id ? {...movie , reservedSeats : [...movie.reservedSeats , ...reserve] } : movie)
   setCurrentMovie(updateMovies);
   setAllReservedSeat(prev => [...prev ,...reserve])
 
    setreserve([])
  alert(`chairs of ${reserve.join(', ')} is reserved for ${SelectedMovie.MovieName}`);
  
  }


  return (
    <div className="App">
    <MovieList ShowMovie={handleSelectMovie} currentMovie={currentMovie} SelectedMovie={SelectedMovie}/>
   {SelectedMovie && <MovieDetails SelectedMovie={SelectedMovie}/>} 
   <SeatsOfMovies
    ToggleReserve={handleResve}
     reserve={reserve} 
     allReservedSeat={allReservedSeat} />
     {setSelectedMovie && (
      <button onClick={handleSaveReserve} disabled={reserve.length === 0 }>Saving reserve  {reserve.length} chair</button>
     )}
    </div>
  );
}

function MovieList({ ShowMovie, currentMovie , SelectedMovie}){
  return(
    <div style={{width:'20%'}}>
      <h3>movie list</h3>
    <ul>
      {currentMovie.map((movie)=> 
      <li
      style={{
        cursor: 'pointer' ,
        padding:'10px' ,
        margin:'5px',
        backgroundColor: SelectedMovie?.id === movie.id ? '#e0e0e0' : 'white' ,
        listStyle:'none'
      }}
      onClick={()=> ShowMovie(movie)}
      key={movie.id}>
        {movie.MovieName} 
        {movie.reservedSeats.length > 0 && <span> (All number of reserved for this movie are  : {movie.reservedSeats.length}) </span>}
      </li>
      )}
    </ul>
       
     
    </div>
  )
}

function MovieDetails({ SelectedMovie}){
  return(
    <div>
      <p>movie properties</p>
   <img src={SelectedMovie.src} width='100px' height='100px'/>
  <p>{SelectedMovie.MovieName}</p>
  {SelectedMovie.reservedSeats.length > 0 && (
    <p>reserved chairs : {SelectedMovie.reservedSeats.join(', ')}</p>
  )}
    </div>
  )
}

function SeatsOfMovies({ToggleReserve , reserve , allReservedSeat}){
  return(
    <div>
    <h3>chair selection</h3>

  <div className='seat-container' style={{display:'flex' , flexWrap:'wrap', width:'240px'}}>
    {Array.from({length : 30} , ( _,i)=> i+ 1).map((num)=> {

      const isReserved = allReservedSeat.includes(num);
      const isSelected = reserve.includes(num)
      
      

 return( <span className='seat' onClick={()=> !isReserved && ToggleReserve(num)} 
 style={{ width:'20px' , height:'20px' , border:'1px solid red' ,
   margin:'5px 5px',
   cursor: isReserved ? 'not-allowed':'pointer',
    backgroundColor: isReserved ? 'red' : isSelected?  'green':'white'}} 
 key={num}>
    {isReserved ? '❌' : ''}
    
    </span>)
   })}
  </div>
  </div>
)}

export default App;
