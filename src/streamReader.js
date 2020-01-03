class Reader{
  constructor(){
    this.content = '';
  }
  append(chunk){
    this.content += chunk;
  }
}

const fileErrors = {
  ENOENT: 'No such file or directory',
  EISDIR: 'Is a directory',
  EACCES: 'Permission denied'
};

const readStream = (readableStream, callback) => {
  const reader = new Reader();
  readableStream.on('error', (error) => 
    callback({errorMsg: `sort: ${fileErrors[error.code]}`})
  );
  readableStream.on('data', (chunk) => reader.append(chunk));
  readableStream.on('end', () => callback( {contents: reader.content}));
};
module.exports = {readStream};
