import React from 'react'
import NftCard from './components/NftCard';

export default function App(){

  const [walletAddrss, setWalletAddress] = React.useState("");
  const [collectionAddress, setCollectionAddress] = React.useState("");
  const [nfts, setNfts] = React.useState([]);
  const [isTrueForFetchforCollection, setIsTrueForFetchforCollection] = React.useState(false);

  console.log(nfts)

  const fetchNFTs = async() => {
    let nfts;
    console.log('getching nfts');
    const apiKey = "BJqpIi_vWHSNIuxs8wypgkLX8frkPIga";
    const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTs/`;
    if(collectionAddress === ""){
      
      //fetch with the wallet addreess
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      // Replace with the wallet address you want to query:
      const ownerAddr = walletAddrss;
      const fetchURL = `${baseURL}?owner=${ownerAddr}`;
      
      fetch(fetchURL, requestOptions)
      .then(response => response.json())
      .then(result => setNfts(result.ownedNfts))
      
    }else{

      const ownerAddr = walletAddrss;
      const fetchURL = `${baseURL}?owner=${ownerAddr}&contractAddresses%5B%5D=${collectionAddress}`;
      
      fetch(fetchURL, requestOptions)
      .then(response => response.json())
      .then(result => setNfts(result.ownedNfts))
      .catch(error => console.log('error', error));      

    }
  }

  const fetchNftsCollection = async() => {
    
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    if(collectionAddress !== ""){
      console.log('getching nfts');
      const apiKey = "BJqpIi_vWHSNIuxs8wypgkLX8frkPIga";
      const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collectionAddress}&withMetadata=${true}`;

      fetch(fetchURL, requestOptions)
      .then(response => response.json())
      .then(result => setNfts(result.nfts))
      .catch(error => console.log('error', error));
    }
  }


  function handelWalletAddress(e){
    console.log(e.target.value)
    setWalletAddress(e.target.value);
  }

  function handelCollectionAddress(e){
    console.log(e.target.value)
    setCollectionAddress(e.target.value);
  }

  return(
    <div className='landing-page'>
        <h1 className='head'>My <span>NFT's</span> Place 💰</h1>
        <div className='input'>
          <input type='text' disabled={isTrueForFetchforCollection} placeholder='add your wallet address' onChange={handelWalletAddress} value={walletAddrss} />
          <input type='text' placeholder='add the collection address' onChange={handelCollectionAddress} value={collectionAddress}/>
          <label><input type='checkbox' onChange={(e)=>{setIsTrueForFetchforCollection(e.target.checked)}}/>Fetch for collections</label>
          <button onClick={()=>{
            if(isTrueForFetchforCollection){
              fetchNftsCollection();
            }else{
              fetchNFTs();
            }  
          }}>get collection 👋</button>
        </div>
        <div className='nfts'>
          {
            nfts ? nfts.map((nft)=>{
              return(nft.media[0].gateway ? (<NftCard nft={nft}/>): null)
            }):null
          }
        </div>
    </div>
  )
}