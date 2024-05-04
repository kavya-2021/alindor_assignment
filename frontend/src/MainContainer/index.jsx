import React, { useState } from 'react';
import { Container, LeftSide, RightSide, SubmitButton } from './style';
import FileInput from './FileUploader/upload';
import Ring from './Ring/ring';

const FilePreview = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [fileType, setFileType] = useState('');
  const [ jdFile, setJdFile ] = useState(null);
  const [ originalFile, setOriginalFile ] = useState(null);
  const [ result , setResult ] = useState({
     data : null,
     disabled : false 
  });

  const handleFileChange = (event) => {
    if(event){
        const file = event.target.files[0];
        setOriginalFile(file);
        const reader = new FileReader();
    
        reader.onload = (e) => {
          const url = e.target.result;
          setFileUrl(url);
          const extension = file.name.split('.').pop().toLowerCase();
          console.log(extension);
          if (extension === 'pdf') {
            setFileType('application/pdf');
          } else if (extension === 'txt') {
            setFileType('text/plain');
          } else if (extension === 'docx') {
            setFileType('docx');
          } else {
            setFileType('');
          }
        };
    
        reader.readAsDataURL(file);
    } else {
        setOriginalFile(null);
        setFileUrl(null);
    }
  };

  const handleSubmitToAnalyse = async()=>{
    console.log("clicked")
    if(originalFile){ 
        let payload = new FormData();
        payload.append('cv', originalFile);
        payload.append('job_description', originalFile);
    
        const response = await fetch("http://localhost:9000/analyze", {
            method: 'POST',
            body: payload
          });
        let res = await response.json();
        res = JSON.parse(res);
        console.log(res , res.score , res.explanation);
        setResult({
            data : res,
            disabled : true
        });
    }
  }

  return (
    <Container>
        <LeftSide >
            <FileInput handleFile={handleFileChange} fileType="cv"/>
            <br/>
            <FileInput handleJDFile={setJdFile} fileType="jd"/>
            <br/>
            <SubmitButton onClick={handleSubmitToAnalyse} disabled={result.disabled}>Evaluate CV</SubmitButton>
            <br/>
            {
                fileUrl && result.data && <Ring className="progressCircle" size={ 220 } progress={result.data.score} />
            }
        </LeftSide>
        {
            fileUrl && (
                <RightSide>
                    {fileUrl && fileType && (
                        <embed src={fileUrl} type={fileType} width="100%" height="100%" />
                    )}
                    {fileUrl && !fileType && <p>Unsupported file format</p>}
                </RightSide>
            )
        }
    </Container>
  );
};

export default FilePreview;