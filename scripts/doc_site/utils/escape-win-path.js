function escapeWinPath(path) {
  return path.replace(/\\/g, '\\\\');
}

function toUriPath(path) {
  if(typeof path === "string") {
    return path.replace(/\\/g, '/');
  } else {
    return '';
  }
}

module.exports = {
  escapeWinPath,
  toUriPath,
};
