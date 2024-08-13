import { cp, rm } from "fs/promises";

import formidable from "formidable";

export async function rmFile(filePath) {
  try {
    await rm(filePath, { force: true });
    return true;
  } catch {
    return false;
  }
}

function fileUpload(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }

      const body = {};
      for (let fieldKey in fields) {
        const val = fields[fieldKey];
        if (Array.isArray(val)) {
          body[fieldKey] = val?.[0];
        } else {
          body[fieldKey] = val;
        }
      }


      if (!Object.keys(files).length) {
        return resolve({ body, files: null });
      }
      const renamed = {};
      try {
        for (const fieldName in files) {
          const fieldFiles = files[fieldName];
          for (const file of fieldFiles) {
            const newPath = file.filepath.replace(file.newFilename, file.originalFilename);
            await cp(file.filepath, newPath);
            if (!renamed[fieldName]) renamed[fieldName] = [];
            renamed[fieldName].push({
              filePath: newPath,
              size: file.size,
              fileName: file.originalFilename,
            });
          }
        }
        resolve({ body, files: renamed });
      } catch (ex) {
        reject(ex);
      }
    });
  });
}


export default fileUpload;
