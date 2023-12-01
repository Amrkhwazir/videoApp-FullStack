import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebaseConfig"
import axios from 'axios';
import { Navigate } from 'react-router-dom';


const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000aa;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 400px;
  height: 450px;
  background-color: ${({theme}) => theme.bgLighter};
  color: ${({theme}) => theme.theme};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  z-index: 999;
`;
const Text = styled.h3`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  margin-top: 0px;
`;
const Title = styled.h2`
text-align: center;
  margin-bottom: 0px;
  margin-top: 0px;
`;

const Input = styled.input`
   border: 1px solid ${({theme}) => theme.soft};
   color: ${({theme}) => theme.text};
   height: 40px;
   border-radius: 3px;
   padding: 5px;
   background-color: transparent;
`;

const Button = styled.button`
  background-color: transparent;
    border: 1px solid #3ea6ff;
    background-color: #3ea6ff;
    color: #ffff;
    padding: 4px 0px;
    border-radius: 3px;
    font-weight: 600;   
    cursor: pointer
`;

const Desc = styled.textarea`
   border: 1px solid ${({theme}) => theme.soft};
   color: ${({theme}) => theme.text};
   border-radius: 3px;
   padding: 10px;
   background-color: transparent;
`;

const Label = styled.label`
font-size: 14px;
`;

const Upload = ({setOpen}) => {

  const [img, setImg] = useState(undefined);
  const [video, setvideo] = useState(undefined);
  const [imgPer, setImgPer] = useState(0);
  const [videoPer, setvideoPer] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  
   const tagsHandler = (e) => {
    setTags(e.target.value.split(","));
   }

   const handleChange = (e) => {
      setInputs((prev)=>{
        return {...prev, [e.target.name]: e.target.value};
      })
   }
   const uploadFile = (file, urlType) => {

    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file,);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    urlType === "imgUrl" ? setImgPer(Math.round(progress)) : setvideoPer(Math.round(progress));
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        
    }
  },(err)=>{

  }, () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setInputs((prev)=>{
        return {...prev, [urlType]: downloadURL};
      });
    });
  } )
   }

   useEffect(()=>{
   video && uploadFile(video, "videoUrl")
  }, [video]);

   useEffect(()=>{
  img && uploadFile(img, "imgUrl")
  }, [img]);

  const uploadHandler = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://127.0.0.1:8000/api/videos/`, {...inputs, tags});
    setOpen(false);
    res.status===200 && <Navigate to={`/video/${res.data._id}`} />
  }


  return (
    <Container>
      <Wrapper>
    <Text onClick={()=> setOpen(false)}>x</Text>
      <Title>Upload a New videos</Title>
      <Label>Video:</Label>
    {videoPer> 0 ? ("uploading:" + videoPer + "%") : <Input type="file" accept="video/*" onChange={e => setvideo(e.target.files[0])}/>}
      <Input type="text" placeholder='Title' name='Title' onChange={handleChange}/>
      <Desc placeholder='Description' rows={8} name='Desc' onChange={handleChange}/>
      <Input type="text" placeholder='Seprate the tags with commas.' onChange={tagsHandler}/>
      <Label>Image:</Label>
      {imgPer> 0 ? ("uploading:" + imgPer + "%") : <Input type="file" accept="image/*"  onChange={e => setImg(e.target.files[0])}/>}
     <Button onClick={uploadHandler}>Upload</Button>
      </Wrapper>
    </Container>
  )
};

export default Upload