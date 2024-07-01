import axios from "axios";
import { BigNumberish, ethers } from "ethers";

export const nftAbi = [
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "contractURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "uri",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

export const getZoraSrc = (src) => {
    if (src.startsWith("/")) {
        return 'https://zora.co' + src
    } else {
        return src
    }
}

const ipfsHead = "https://metopia.quicknode-ipfs.com/ipfs"
export const fetchAPiOrIpfsData = (uri) => {
    if (uri.startsWith("ipfs://")) {
        return axios.get(`${ipfsHead}/${uri.replace("ipfs://", "")}`).then(res => res.data)
    } else {
        return axios.get(uri).then(res => res.data)
    }
}

export const getAPiOrIpfsImgSrc = (uri) => {
    if (uri.startsWith("ipfs://")) {
        return `${ipfsHead}/${uri.replace("ipfs://", "")}`
    } else {
        return uri
    }
}

export const getNftMetadatas = async (contract, tokenIds: BigNumberish[], provider) => {
    return Promise.all(tokenIds.map(tokenId => getNftMetadata(contract, tokenId, provider)))
}

export const getNftMetadata = async (contract, tokenId: BigNumberish, provider) => {
    const contractObj = new ethers.Contract(contract, nftAbi, provider)
    try {
        const uri = await contractObj.uri(tokenId)
        if (uri) {
            const result = await fetchAPiOrIpfsData(uri)
            return result;
        }
    } catch (e) {
        try {
            const uri = await contractObj.tokenURI(tokenId)
            if (uri) {
                const result = await fetchAPiOrIpfsData(uri)
                return result;
            }
        } catch (e2) {
            try {
                const altContractObj = new ethers.Contract(contract, [{
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "tokenId",
                            "type": "uint256"
                        }, {
                            "internalType": "uint256",
                            "name": "Block",
                            "type": "uint256"
                        }
                    ],
                    "name": "uri",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }], provider)

                const uri = await altContractObj.uri(tokenId, await provider.getBlockNumber())
                if (uri) {
                    const result = await fetchAPiOrIpfsData(uri)
                    return result;
                }
            } catch (e) {
                return null
            }
        }
    }
}

export const getContractMetadata = async (contract, provider) => {
    const contractObj = new ethers.Contract(contract, nftAbi, provider)
    try {
        const contractURI = await contractObj.contractURI()
        if (contractURI) {
            const metadataRaw = await fetchAPiOrIpfsData(contractURI)
            return metadataRaw
        }
    }
    catch (e) {
        console.log(`error 4 - ${contract}`)
    }
}

