import React from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { updateActor } from "../store/moviesInfo/action";
import { connect } from "react-redux";

const { Dragger } = Upload;

const DragAndDrop = (props) => {
  const { updateActor } = props;

  const propsDnD = {
    name: "file",
    accept: ".jpg, .png, .JPG, .PNG",
    action: "https://whois.nomada.cloud/upload",
    headers: {
      Nomada: "YWE1YmVlYTYtOGUzMS00MzJkLWFkOWYtNTUxNzRkYzEyMDNl",
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        const {
          file: {
            response: { actorName, error },
          },
        } = info;
        if (!error) {
          message.success(`${info.file.name} file uploaded successfully.`);
          updateActor(actorName);
        } else {
          message.error(error);
        }
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Dragger {...propsDnD}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading
        company data or other band files
      </p>
    </Dragger>
  );
};

export default connect(null, { updateActor })(DragAndDrop);
