class Reader{
  constructor(){
    this.content = '';
  }
  append(chunk){
    this.content+=chunk;
  }
}
const readContent = (readableStream, callback) => {
  const reader = new Reader();
  readableStream.on('error', (error) => callback({errorMsg: error.code}));
  readableStream.on('data', (chunk) => reader.append(chunk));
  readableStream.on('end', () => callback( {contents: reader.content}));
};
module.exports = { readContent };
