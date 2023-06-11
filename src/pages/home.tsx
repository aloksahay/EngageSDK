import React from 'react'
import { useAccount, useConnect, useDisconnect, useContractWrite  } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { BrowserProvider, ethers, JsonRpcProvider } from "ethers";
import { useMiniForm } from "../useMiniForm";
import {simpleUserOpBuilder} from "../simple-userop-builder"
import diablo from '../pictures/Diablo4.png';
import { useEffect, useState } from 'react';


const Home:any = () => {

  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { form, register, updateForm } = useMiniForm();

  const { disconnect } = useDisconnect()


  // const { data, isLoading, isSuccess, write } = useContractWrite({
  //   address: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789', // entrypoint
  //   abi: ENTRYPOINT_ABI,
  //   functionName: 'handleOps',
  // })

  const [imageState, setImageState] = useState(true);
  const [clickable, setClickable] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setImageState(true);
    }, 8000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleImageClick = () => {
    setImageState(false);
  };

  const buildUserOp = async () => {

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner()
    const target = "0x49cB5Fa951AD2ABbC4d14239BfE215754c7Df030" // Metamask address
    const sender = "0x4954Ed31f9263A8A4f7aE5bC4616DE4A5dD11742" // account
    const value = "0.01";
    const formattedValue = value && ethers.parseEther(value);
    const data="0x";

    // const { sender, target = sender, value, data } = form;

    const useropPromise = await simpleUserOpBuilder(signer, sender, target, formattedValue, data).then(
      (userop) =>
        Object.fromEntries(
          Object.entries(userop).map(([key, value]) => [
            key,
            typeof value === "bigint" ? "0x" + value.toString(16) : value,
          ])
        )
    );
    // await console.log("finished userop is: ", useropPromise)
    return useropPromise

  }

  const ExecuteUserOp = async () => {
    const entrypoint = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
    const userop:any = await buildUserOp();

    let js = new JsonRpcProvider("https://api.stackup.sh/v1/node/c85de44dcc355333c5ed9d6089d15711230baceed3e60d518b8b6c18f539ccb2", undefined,  {batchMaxCount: 1})
    js.send("eth_sendUserOperation", [userop, entrypoint])  

 
  }

  return (
<div className=''>
<nav className='flex justify-end gap-5 mr-5 border-b-4 mt-2 py-2 px-4'>
{!isConnected && <button className='border-2 rounded-xl font-bold py-2 px-4 hover:bg-black hover:text-white transition-all duration-200' onClick={() => connect()}>Connect</button> }
{isConnected && <button className='border-2 rounded-xl font-bold py-2 px-4 hover:bg-black hover:text-white transition-all duration-200'>Connected</button> }
 <button className='border-2 rounded-xl font-bold py-2 px-4 hover:bg-black hover:text-white transition-all duration-200' onClick={() => disconnect()}>Disconnect</button>
</nav>
    <div className='flex flex-col justify-center items-center'> 
     { imageState ?  <img className='w-[500px] h-[500px]' src={diablo} alt="" onClick={() => handleImageClick()}/> 
    : <button className='text-5xl mt-20 mb-20'>Watching ad...</button> 
    }

    <button className='border-2 rounded-xl text-black font-bold py-2 px-4 hover:bg-red-600 hover:text-white transition-all duration-200' onClick={() => ExecuteUserOp()}>Claim</button>
    </div>
 {/* <button onClick={() => buildUserOp()}>Build UserOp</button> */}
 
</div>

  )

}

export default Home