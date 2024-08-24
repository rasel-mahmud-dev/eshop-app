
function subStr(text, max) {
  if (!text) return "";
  let len = text.length;
  if (len <= max) {
    return text;
  } else {
    return text.substr(0, max) + "...";
  }
}

export default subStr
