import {  BACKEND } from "../apis";
import FormData from "form-data";
import throwError from "../utils/throwError";


const FileUpload = {
    async uploadImage(url, folder) {
        try {
            if (!url || typeof url !== "string") return throwError("Path not found.");
            const formData = new FormData();

            const lastIdx = url.lastIndexOf("/");
            const fileName = url.substring(lastIdx);
            const ext = url.substring(url.lastIndexOf("."));
            formData.append("folder", folder);
            formData.append("file", {
                uri: url,
                name: fileName,
                type: "image/" + ext,
            });
            const res = await fetch(`${BACKEND}/files`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "multipart/form-data",
                },
                body: formData,
            });

            if (!res.ok) throw new Error("File upload fail");
            return res.json();

        } catch (ex) {
            throw ex;
        }
    },
};

export default FileUpload;
