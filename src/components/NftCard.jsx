import React from  'react'
import { useRef } from 'react' 
import copy from "copy-to-clipboard";

export default function NftCard({nft}){
    
    // const textRef = useRef();

    // function copyToClipboard(){
    //     //text from the html element
    //     let copyText = textRef.current;
    //     //adding text message to the clipboard using copy function
    //     let isCopy = copy(copyText);
    //     console.log(copyText)
    //     // if (isCopy) {
    //     //     toast.success("Copied to Clipboard");
    //     // }
    // }

    return( 
        <div className='card'>
            <div className='img'>
                <img src={nft.media[0].gateway}/>
            </div>
            <div className='info'>
                <h2 style={{textDecoration:'underline'}}>{nft.title}</h2>
                <p> token: {nft.id.tokenId.substr(nft.id.tokenId.length-4)}</p>
                <p value={nft.contract.address} ref={textRef}>address: {`${nft.contract.address.substr(0,4)}...${nft.contract.address.substr(nft.contract.address.length-4)}`}</p>
            </div>
            <div className='main-info'>
                <p>{nft.description.substr(0,100)}</p>
                <a href={`https://etherscan.io/address/${nft.contract.address}`} target='_blank'>view on etherscan</a>
                {/* <button onClick={copyToClipboard}>Copy</button> */}
            </div>
        </div>
    )
}


//we wont able to access the ipfs image 
//so we mainly get the media[0].gateway