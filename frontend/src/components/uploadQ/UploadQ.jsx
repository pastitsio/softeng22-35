import React, { useState } from "react";
import './uploadQ.css'

const UploadQ = () => {
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState("");;


  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file)
    // 👇 Uploading the file using the fetch API to the server
    let url = `${process.env.REACT_APP_API_SERVER_URL}/admin/questionnaire_upd`;
    console.log(`POST ${url}`);

    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUploadResult("Success uploading file");
      })
      .catch((err) => {
        console.error(err);
        setUploadResult("Failure uploading file");
      });
  };

  return (
    <div className="UploadQ">
      <label className="form-label">Upload Questionnaire</label>
        <div class="mb-3">
          <input class="form-control" type="file" id="formFile" onChange={handleFileChange}/>
        </div>
        <button className="btn btn-primary" onClick={handleUploadClick}>Upload</button>
      <div className="upload_result">{uploadResult}</div>
    </div>
  );
}

export default UploadQ;