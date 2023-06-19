import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, fetchUser } from '../../store/session';

const EditUserForm = (props) => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const [username, setUsername] = useState(user.username);
  const [aboutMe, setAboutMe] = useState(user.aboutMe);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [photoFile, setPhotoFile] = useState(null);

  const {userId} = useParams();  

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch])

  const handleFile = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setPhotoFile(file);
        setPhotoUrl(fileReader.result);
      };
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('user[username]', username);
    formData.append('user[about_me]', aboutMe);
    formData.append('user[id]', userId);
    if (photoFile) {
      formData.append('user[photo]', photoFile);
    }

    dispatch(updateUser(userId, formData));
  }

  const preview = photoUrl ? <img src={photoUrl}/> : null

  return (
    <div className="user-form">
      <form onSubmit={handleSubmit}>
        <label>Username:
          <input type="text"
           onChange={(e) => setUsername(e.target.value)} 
           value={username}
           placeholder="username" />
        </label>
        <label>About Me:
          <input type="text" 
          onChange={(e) => setAboutMe(e.target.value)} 
          value={aboutMe} 
          placeholder="about me" />
        </label>
        <input type="file" onChange={handleFile}/>
        {preview}
        <input type="submit" value="Update User" />
      </form>
    </div>
  )
}

export default EditUserForm