//import { pinFileToIPFSurl } from '../config/constants';
//import { pinataAPIkey, pinataAPIsecret } from '../config/pinata.config';

const axios = require('axios');
const FormData = require('form-data');

export const pinFileToIPFSurl = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
//export const pinataAPIkey = process.env.REACT_APP_PINATA_API_KEY;
//export const pinataAPIsecret = process.env.REACT_APP_PINATA_API_SECRET;


export const PinataUploadToIPFS = async (fileUpload, ownerAddress, fileName, pinataAPIkey, pinataAPIsecret) => {
  //Create formData and add file
  let data = new FormData();
  data.append('file', fileUpload);

  //Metadata is in the form of a JSON object that's been converted to a string
  const metadata = JSON.stringify({
    name: fileName,
    keyvalues: {
      owner: ownerAddress,
    },
  });
  data.append('pinataMetadata', metadata);

  //pinataOptions
  const pinataOptions = JSON.stringify({
    cidVersion: 1,
  });
  data.append('pinataOptions', pinataOptions);

  try {
    const resFile = await axios.post(pinFileToIPFSurl, data, {
      maxBodyLength: 'Infinity', // needed to prevent axios from erroring out with large files
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataAPIkey,
        pinata_secret_api_key: pinataAPIsecret,
      },
    });
    console.log('CID: ',resFile.data.IpfsHash);
    return resFile.data.IpfsHash;
  } catch (error) {
    console.error("Error sending File to IPFS: ", error)
    return null;
  }
};
