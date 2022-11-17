// import { create } from 'ipfs-http-client'
// import  'ipfs-http-client';
import {create} from "./node_modules/ipfs-http-client/dist/index.min.js"
// import fs from 'fs'
import {fs} from "./fs.min.js"


// // import {AbortController} from "node-abort-controller";
// import {AbortController} from "./node_modules/node-abort-controller/index.d.ts";
// global.AbortController = AbortController;

let imageFileNames = [
    'm100831.png',
    'f100832.png',
    'f100833.png',
    'm100834.png',
    'm100835.png',
    'm100836.png',
    'f100837.png',
    'f100838.png',
    'f100839.png'
];

let imageMetaData = [
    'banana,plátano,m',
    'clementine,clementina,f',
    'grape,uva,f',
    'lemon,limón,m',
    'melon,melón,m',
    'peach,melocotón,m',
    'pineapple,piña,f',
    'raisin,uva pasa,f',
    'strawberry,fresa,f'
];

//creates an ipfs client
async function ipfsClientx() {
    const projectId = 'XXXXXXXXXX';   //Infura Project ID
    const projectSecret = 'XXXXXXXXXX';  //your Infura Secret
    const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

    const client = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
        authorization: auth,
        },
    });
    return client;
}

const appendDataToFile = async (path, data) => {
    let filehandle = null
    try {
        // Mode 'a' allows to append new data in file
        filehandle = await fs.promises.open(path, 'a');
        // Append operation
        await filehandle.appendFile(data)
    } catch(err) {
        console.log(err)
    }finally {
        if (filehandle) {
            // Close the file if it is opened.
            await filehandle.close();
        }
    }
}

async function saveFiles() {

    let ipfs = await ipfsClientx();
    //write the file header
    appendDataToFile('./ImageDetails.txt',"v1 CID, English_Word, Spanish_Word, Gender\n")
    .catch(err => {
        console.log(`Error Occurs, Error code -> 
            ${err.code}, Error NO -> ${err.errno}`)
    })

    for (let index = 0; index < imageFileNames.length; ++index) {
        const imageFileName = "./images/" + imageFileNames[index];
        const picFileMetaData = imageMetaData[index];    

        let data = fs.readFileSync(imageFileName)
        let options = {
            warpWithDirectory: false,
            progress: (prog) => console.log(`Saved :${prog}`)
        }
        let result = await ipfs.add(data, options);
        console.log(result);
        let v1CID = result.cid.toV1();
        console.log('v1 id:' + v1CID);
        let saveString = "\"" + v1CID + "," + picFileMetaData+"\""+"\n";
        appendDataToFile('./ImageDetails.txt',saveString)
        .catch(err => {
            console.log(`Error Occurs, Error code -> 
                ${err.code}, Error NO -> ${err.errno}`)
        })
    }
}

saveFiles()

async function getDatax() {
    console.log("getData called");
}
