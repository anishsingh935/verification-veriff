import './App.css';
import CameraCapture from './CameraCapture.jsx';
import { createUser, uploadImages, submitSession, getSessionResult } from './api';
import { useEffect, useState } from 'react';

function App() {
  const [state, setState] = useState(false);
  const [userSession, setUserSession] = useState("");
  const [frontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");
  const [selfiImage, setSelfiImage] = useState("");
  const [loading, setLoading] = useState(false);

  const getUserSeessingFunc = async () => {
    setState(true);
    const getuserSession = await createUser();
    setUserSession(getuserSession)
    setState(false)
  }

  useEffect(() => {
    if (frontImage) {
      const result = uploadImages(frontImage, userSession?.id, 'front');
      console.log("Printing FrontImage Res", result);
    }
  }, [frontImage, userSession?.id]);

  useEffect(() => {
    if (backImage) {
      const result = uploadImages(backImage, userSession?.id, 'back');
      console.log("Printing backImage Res", result);
    }
  }, [backImage, userSession?.id]);

  useEffect(() => {
    if (selfiImage) {
      const result = uploadImages(selfiImage, userSession?.id, 'face');
      console.log("Printing selfi Res", result);
    }
  }, [selfiImage, userSession?.id])

  const submitting = async () => {
    setLoading(true)
    const result = await submitSession(userSession?.id);
    console.log(result);
    setLoading(false)
  }

  return (
    <div className="App">
      <h1>Passport Verification Portal</h1>
      {!state ? <button onClick={() => getUserSeessingFunc()}>Click to Create Your Data</button> : <div>Loading ...</div>}
      <div style={{ marginTop: "10px" }}>
        <div>
          Your vendorCode Is: <span style={{ color: "red" }}> {userSession?.vendorData} </span>
        </div>
        {userSession?.url && <a href={userSession?.url} target='blank'>Click here To procced with verrif portal</a>}
      </div>
      {userSession && <CameraCapture setFrontImage={setFrontImage} setBackImage={setBackImage} setSelfiImage={setSelfiImage} />}
      {frontImage && backImage && selfiImage && (!loading ? <button onClick={() => submitting()}>Click to submit the images for verification</button> : <div>Loading ...</div>)}
      {userSession?.id && <button onClick={() => getSessionResult(userSession?.id)}>Click to fetch the result</button>}
    </div>
  );
}

export default App;