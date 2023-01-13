import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from'@mui/material/Button'
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import {
    useAccount,
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
  } from 'wagmi';
import { ethers, BigNumber } from 'ethers';
import contractInterface from './contract-abi.json';
import FormHelperText from '@mui/material/FormHelperText';
import { getProvider } from '@wagmi/core'
 


export default function MintComp(){

  
  const [addy, setAddress] = useState();
  const [mintAmount, setAmount] = useState(0);
  const [totalMinted, setTotalMinted] = useState(0);

  const provider = getProvider();


  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected })
    },
  });

  const getS = async () =>{
    const contractAddress = "0x7399206Fd5B8a9418fe2beaE55c4cA34DDDd5442";
    const ct = new ethers.Contract(contractAddress, contractInterface, provider);
    let newValue = await ct.totalSupply();
    if (newValue){
      setTotalMinted(newValue.toString())
    }
    
  }






    const handleChange = (event) => {
      setAmount(event.target.value);
    };


    //---------------provider config-------------------------------------------


    const contractConfig = {
        addressOrName: '0x7399206Fd5B8a9418fe2beaE55c4cA34DDDd5442',
        contractInterface: contractInterface,
      };
    


    //------------------MINT------------------------------------------------
    // const { config: contractWriteConfig } = usePrepareContractWrite({
    //     ...contractConfig,
    //     functionName: 'mint',
    //     args:[mintAmount],
    //     overrides: {
    //       from: addy,
    //       value: ethers.utils.parseEther('0.03').mul(mintAmount).toString()
    //     },
    //   });

    //   const {
    //     data: mintData,
    //     write: mint,
    //     isLoading: isMintLoading,
    //     isSuccess: isMintStarted,
    //     error: mintError,
    //   } = useContractWrite(contractWriteConfig);


      const mintP = () =>{
        if((mintAmount > 0) && addy){
          console.log("trying to mint: ", mintAmount, addy, totalMinted)
          contractWrite();
          console.log("report ",mintData2, isMintLoading2, isMintStarted2, mintError2 );
    
        }
      }
      
      const{data: mintData2, write: contractWrite, isLoading: isMintLoading2, isSuccess: isMintStarted2, error: mintError2}  = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: '0x7399206Fd5B8a9418fe2beaE55c4cA34DDDd5442',
        abi: contractInterface,
        functionName: 'mint',
        chainId:1,
        args:[mintAmount],
        overrides: {
          from: addy,
          value: ethers.utils.parseEther('0.03').mul(mintAmount).toString()
          ,
        },
      })
    //----------TRACK TRANSACTION---------------------------------------

        const {
            data: txData,
            isSuccess: txSuccess,
            error: txError,
          } = useWaitForTransaction({
            hash: mintData2?.hash,
          });

          console.log(txData, txSuccess, txError)
      
          const isMinted = txSuccess;
        

  //-----------SUPPLY MINTED---------------------



    //-------------------------------------------------------------

    useEffect(() => {

        if(account.address){
      
          setAddress((account.address).toString());
          getS();
      
        }
      
      }, [account]);

    

    

    return(
        <div className="mintContainer">
            <h1 className="m1">Mint</h1>
            <Image 
            src="0.svg"
            width={100}
            height={100}
            className="mintPic"
            />
            {totalMinted}/250 minted!
            <div className="mel">
        <FormControl size="small" sx={{m: 1, width: 135}}>
        <Select
          labelId="mint-amount-label"
          id="mint-amount-select"
          value={mintAmount}
    
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}


        >
          <MenuItem value={0}>
            <em>Amount</em>
          </MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>

        </Select>
        <FormHelperText>0.03 eth/nft</FormHelperText>
      </FormControl>
      <Button onClick={() => mintP?.()} sx={{m: 1,  width: 135}} size="large" variant="contained" color="primary" disabled={!addy}>Mint</Button>
      </div>

        </div>
    )
}