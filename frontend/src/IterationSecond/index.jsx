import React, { useEffect, useRef, useState } from "react";
import {
  CVUploadContainer,
  DeleteIcon,
  EditIconDiv,
  ExplanationContainer,
  HeaderDiv,
  JDUploadContainer,
  MainContainer,
  ResultContainer,
  SubmitButton,
  UploadsContainer,
} from "./style";
import FileInput from "./FileUploader/upload";
import Ring from "./Ring/ring";
import FilePreviewer from "./FilePreview";
import { DeleteFilled, DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const CompleteEvaluator = () => {
  const [cvFileSelected, setCVFileSelected] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const [jdFile, setJdFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [originalFile, setOriginalFile] = useState(null);
  const [result, setResult] = useState({
    data: null,
    disabled: false,
  });
  const textareaRef = useRef(null);
  const [isPlaceholderActive, setIsPlaceholderActive] = useState(true);
  useEffect(() => {
    const textarea = textareaRef.current;

    const handleFocus = () => {
      setIsPlaceholderActive(false);
    };

    const handleBlur = () => {
      setIsPlaceholderActive(textarea.value === "");
    };

    textarea.addEventListener("focus", handleFocus);
    textarea.addEventListener("blur", handleBlur);

    return () => {
      textarea.removeEventListener("focus", handleFocus);
      textarea.removeEventListener("blur", handleBlur);
    };
  }, []);

  const handleFileChange = (event) => {
    if (event) {
      const file = event.target.files[0];
      setOriginalFile(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        const url = e.target.result;
        setFileUrl(url);
        const extension = file.name.split(".").pop().toLowerCase();
        console.log(extension);
        if (extension === "pdf") {
          setFileType("application/pdf");
        } else if (extension === "txt") {
          setFileType("text/plain");
        } else if (extension === "docx") {
          setFileType("docx");
        } else {
          setFileType("");
        }
      };

      setCVFileSelected(true);
      reader.readAsDataURL(file);
    } else {
      setOriginalFile(null);
      setFileUrl(null);
    }
  };

  const handleSubmitToAnalyse = async () => {
    if (originalFile) {
      let payload = new FormData();
      payload.append("cv", originalFile);
      payload.append("job_description", originalFile);

      const response = await fetch("http://localhost:9000/analyze", {
        method: "POST",
        body: payload,
      });
      let res = await response.json();
      res = JSON.parse(res);
      console.log(res, res.score, res.explanation);
      setResult({
        data: res,
        disabled: true,
      });
    }
  };

  const handleClearCVSelection = () => {
    setCVFileSelected(false);
    setFileType(null);
    setFileUrl(null);
    setOriginalFile(null);
    setResult({
      data: null,
      disabled: false,
    });
    setJdText(null);
  };

  return (
    <MainContainer>
      <HeaderDiv>Resume Evaluator</HeaderDiv>
      <UploadsContainer>
        <CVUploadContainer>
          {cvFileSelected && (
            <DeleteIcon onClick={handleClearCVSelection}>
              <DeleteFilled style={{ fontSize: "30px", color: "#08c" }} />
            </DeleteIcon>
          )}
          {cvFileSelected ? (
            <div>
              {fileUrl && fileType && <FilePreviewer file={originalFile} />}
              {fileUrl && !fileType && <p>Unsupported file format</p>}
            </div>
          ) : (
            <div>
              <FileInput handleFile={handleFileChange} fileType="cv" />
              <p style={{ fontSize: "20px", color: "#08c" }}>Uplaod CV</p>
            </div>
          )}
        </CVUploadContainer>
        <JDUploadContainer>
          <textarea
            spellcheck="true"
            onChange={(e) => {
              setJdText(e.target.value);
            }}
            placeholder="Enter Job Description"
            ref={textareaRef}
            value={jdText}
          ></textarea>
          {isPlaceholderActive && (
            <EditIconDiv onClick={()=>{
                setIsPlaceholderActive(false);
                textareaRef.current.focus();
            }}>
              <EditOutlined style={{ fontSize: "75px", color: "#08c" }} />
            </EditIconDiv>
          )}
        </JDUploadContainer>
      </UploadsContainer>
      <br />
      <SubmitButton onClick={handleSubmitToAnalyse} disabled={result.disabled}>
        Evaluate CV
      </SubmitButton>
      {fileUrl && result.data && (
        <ResultContainer>
          <div>
            <Ring
              className="progressCircle"
              size={220}
              progress={result.data.score}
            />
          </div>
          <ExplanationContainer>{result.data.explanation}</ExplanationContainer>
        </ResultContainer>
      )}
    </MainContainer>
  );
};
