import React, { useRef, useState } from "react";
import { Button } from "./style";
import { FileAddOutlined } from "@ant-design/icons";

const FileInput = ({handleFile , handleJDFile , fileType}) => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if(fileType === 'cv'){
      handleFile(event);
    } else if (fileType === 'jd') {
      handleJDFile(event);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleDelete = () => {
    setFile(null);
    if(fileType === 'cv'){
      handleFile(null);
    } else if (fileType === 'jd') {
      handleJDFile(null);
    }
  };

  return (
    <>
      <div>
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.txt"
        />
         <FileAddOutlined style={{ fontSize: '75px', color: '#08c' }} onClick={handleClick}/>
      </div>
      {file ? (
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <p>{file ? file.name : ""}</p>
          <div onClick={() => handleDelete()}>
            <img
              src="/Icons/delete.png"
              alt="delete"
              width="25px"
              height="25px"
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FileInput;
