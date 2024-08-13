import fs from "fs";
import fileUpload, { rmFile } from "../services/fileUpload";
import { uploadImage } from "src/services/cloudinary";

class AuthController {
  uploadFile = async (req, res) => {
    try {
      const { body, files } = await fileUpload(req);
      const folderName = body?.folder || "untitled";
      const uploaded = [];
      for (let fieldName in files) {
        const fieldFiles = files[fieldName];
        for (let fieldFile of fieldFiles) {
          const file = await uploadImage(fieldFile.filePath, {
            folder: folderName,
            fieldName: fieldName,
          });
          await rmFile(fieldFile.filePath);
          uploaded.push(file.secure_url);
        }
      }

      res.status(200).send({ message: "Upload image upload successfully.", data: uploaded });
    } catch (err) {
      res.status(500).json({ message: "Error uploading image", error: err.message });
    }
  };

  getAllStaticFiles = async (req, res, next) => {
    try {
      let data = fs.readdirSync("");
      res.send(data);
    } catch (ex) {
      res.send([]);
    }
  };
}

const authController = new AuthController();
export default authController;
