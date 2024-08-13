import slu from "slugify";

function slugify(text, opt = {}) {
  if (!text) return "";
  return slu(text, { lower: true, ...opt });
}

export default slugify;
