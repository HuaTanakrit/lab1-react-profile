import { useState} from 'react';
function ProfileCard({name, role, bio}){
    const [likes, setLikes] = useState(0);
    return(
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px'}}>
            <h2>{name}</h2>
            <p><storng>Role:</storng> {role}</p>
            <p>{bio}</p>

            <button onClick = {() => setLikes(likes + 1)}>
                ❤️ Like : {likes}
            </button>
            
        </div>
    );
}
export default ProfileCard;