import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [query, setQuery] = useState("");
  const [Allquestions, setAllQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);

  const getAllQues = async()=>{
    try{
      const res = await axios.get("http://localhost:4001/api/v1/question");
      // console.log(res.data);
      setAllQuestions(res.data.allQues);
    }catch(err){
      console.log("Error getting questions: ", err);
    }
  }
  useEffect(()=>{
    getAllQues();
  },[])

  useEffect(()=>{
    setQuestions(
      Allquestions?.filter(ques => ques.title.toLowerCase().includes(query.toLowerCase()))
    )
    if(!query){
      setQuestions([])
    }
    // console.log(questions)
  },[query])
  const handleSearch = () => {
    alert(`Searching for: ${query}`);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Search your <span className="highlight">Question</span></h1>
      </header>
      <div className="search-bar-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Ask a question"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>
            <span role="img" aria-label="search">🔍</span>
          </button>
        </div>
      </div>

        <div className="result-item">
          {questions?.map((ques) => (
            <div key={ques._id} className="box">
              <span className="title">Title: {ques.title}</span>
              <span className="type">Type: {ques.type}</span>
            </div>
          ))}
        </div>

    </div>
  );
};

export default App;
