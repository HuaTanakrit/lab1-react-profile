import { useState, useEffect } from 'react'
import ProfileCard from "./components/ProfileCard"
function App(){
  const [githubData, setGithubData] = useState(null)
    const username = "HuaTanakrit"

    useEffect(() => {
        fetch(`https://api.github.com/users/${username}`)
        .then(res => res.json())
        .then(data => {
            setGithubData(data);
        })
        .catch(err => console.error(err));
    }, []);
  return(
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h1>My Team Portfolio</h1>
      {githubData ? (
        <ProfileCard
        name = {githubData.name || githubData.login}
        role = "Guest User"
        bio = {githubData.bio || "No bio available"}
        />
      ) : (
        <p>Loading data from GitHub...</p>
      )}
    </div>
  );
}

export default App