// CameraCapture.js
import React, { useRef, useState } from "react";

const CameraCapture = ({ setFrontImage, setBackImage, setSelfiImage }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile1, setSelectedFile2] = useState(null);
  const [captured, setCaptured] = useState(false);

  const handleFronteFileChange = (event) => {
    const file = event.target.files[0];
    // Update the selectedFile state when a file is chosen
    setSelectedFile(event.target.files[0]);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFrontImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFrontImageFunc = () => {
    document.getElementById("frontFileInput").click();
  };

  const handleBackFileChange = (event) => {
    const file = event.target.files[0];
    // Update the selectedFile state when a file is chosen
    setSelectedFile2(event.target.files[0]);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackImageFunc = () => {
    document.getElementById("fileInput").click();
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set the canvas dimensions to match the video stream
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current frame from the video onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas content to base64
    const base64Image = canvas.toDataURL("image/jpeg");
    console.log("Base64 Image:", base64Image);
    setSelfiImage(base64Image);
    setCaptured(true);
    setTimeout(() => {
      // Stop the camera stream
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      video.srcObject = null;
    }, 500);
  };

  return (
    <div
      style={{
        marginTop: "10px",
        height: "40vh",
        margin: "5% 20%",
        display: "flex",
        flexDirection: "row",
        gap: "10px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "33%" }}>
        {!captured ? (
          <video
            style={{ height: "400px" }}
            ref={videoRef}
            autoPlay
            playsInline
          />
        ) : (
          <div style={{ height: "450px" }}>Image Captured</div>
        )}
        <button onClick={startCamera} style={{ margin: "10px 0" }}>
          Start Camera
        </button>
        <button onClick={capturePhoto}>Capture Photo</button>
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
      <div style={{ width: "33%" }}>
        <button
          style={{
            width: "100%",
            top: "95%",
            position: "relative",
            height: "20px",
          }}
          onClick={handleFrontImageFunc}
        >
          Upload Front Image
        </button>
        {/* Hidden file input */}
        <input
          type="file"
          id="frontFileInput"
          style={{ display: "none" }}
          onChange={handleFronteFileChange}
        />
        {/* Display selected file name (optional) */}
        {selectedFile && <p>Selected File: {selectedFile.name}</p>}
      </div>

      <div style={{ width: "33%" }}>
        <button
          style={{
            width: "100%",
            top: "95%",
            position: "relative",
            height: "20px",
          }}
          onClick={handleBackImageFunc}
        >
          Upload Back Image
        </button>
        {/* Hidden file input */}
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleBackFileChange}
        />
        {/* Display selected file name (optional) */}
        {selectedFile1 && <p>Selected File: {selectedFile1.name}</p>}
      </div>
    </div>
  );
};

export default CameraCapture;
