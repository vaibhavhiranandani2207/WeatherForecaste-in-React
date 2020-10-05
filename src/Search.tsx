import React,{useState,useEffect} from 'react';

const persons=[
    'Vaibhav',
    'Abhi',
    'Vivek',
    'Raghav',
    'Nikhil',
    'Zunaid'
  ]
  const Search=()=>{
  const[searchResults,setSearchResults]= useState<any[]>([]);
  const[searchTerm,setSearchTerm]=useState("");

 const handleChange=(event:any)=>{
     setSearchTerm(event.target.value);
 };
useEffect(()=>{
    const results=persons.filter((person:any)=>person.toLowerCase().includes((searchTerm).toLowerCase())
    );
    setSearchResults(results);
},[searchTerm]);

return(
    <div>
    <input type="text" value={searchTerm} onChange={handleChange} />
    <ul>
{searchResults.map((item:any)=> <li style={{listStyle:"none"}}>{item}</li>)}
       
    </ul>
    </div>
);
  }

  export default Search;