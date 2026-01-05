import { useState, useEffect } from 'react'
import ProfileCard from "./components/ProfileCard"
function App(){
  const [githubData, setGithubData] = useState(null)
    const username = "HuaTanakrit"
    const [skills, setSkills] = useState(['React', 'JavaScript'])
    const [newSkill, setNewSkill] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [theme, setTheme] = useState('light') 
    const [isLoaded, setIsLoaded] = useState(false); 


    useEffect(() => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
      setIsLoaded(true); 
    }, []);

    useEffect(() => {
      if (isLoaded) { 
        localStorage.setItem('theme', theme);
      }
    }, [theme, isLoaded]);

  
    const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh', 
    backgroundColor: theme === 'dark' ? '#333' : '#FFF', 
    color: theme === 'dark' ? '#FFF' : '#000',
    transition: 'all 0.3s ease'
  };
  
    const addSkill = () => {
        if(newSkill.trim() !== "" ){
            setSkills([...skills, newSkill]);
            setNewSkill("");
        }
    };

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch(`https://api.github.com/users/${username}`)
        .then(res => {
        if (!res.ok) {
          if (res.status === 404) {
             throw new Error("❌ User not found");
          }
          throw new Error("Could not fetch data");
        }
        return res.json();
      })
        .then(data => {
            setGithubData(data);
            setLoading(false)
        })
        .catch(err => {
          console.error(err)
          setError(err.message);
          setLoading(false)
        });
    }, []);
  return(
    <div style={appStyle}>
      <button 
        onClick={toggleTheme} 
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
      >
        Mode: {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
      </button>
      <h1>My Team Portfolio</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div style={{ color: 'red', border: '1px solid red', padding: '10px', marginTop: '20px' }}>
            <h2>{error}</h2>
        </div>
      ) : (
        <>
          {githubData && (
             <ProfileCard
                name={githubData.name || githubData.login}
                role="Guest User"
                bio={githubData.bio || "No bio available"}
             />
          )}
          <div>
            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill"
            />
            <button onClick={addSkill}>Add</button>

            <ul>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App