import './App.css';
import { useAccount, useConnect, useDisconnect, useContractWrite  } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { BrowserProvider, ethers } from "ethers";
import { useMiniForm } from "./useMiniForm";
import {simpleUserOpBuilder} from "./simple-userop-builder"
import {ENTRYPOINT_ABI} from "./entrypoint/abi"
import { useEffect, useState } from 'react'

const App = () =>  {

  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { form, register, updateForm } = useMiniForm();

  const { disconnect } = useDisconnect()


  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
    abi: ENTRYPOINT_ABI,
    functionName: 'handleOps',
  })

  const buildUserOp = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner()
    const target = "0xde152f5fAF03ec67F7e0BC7970A2f6529DB64301" // Metamask address
    const sender = "0x7341059306Cfebb02E51c69168d9F66e377076f3" // account
    const value = "0.05";
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

    const executer = "0xde152f5fAF03ec67F7e0BC7970A2f6529DB64301";
    const userop:any = await buildUserOp();



   await write({
      args:[[userop], "0xde152f5fAF03ec67F7e0BC7970A2f6529DB64301"]
    })
 
    console.log(data)
  }

  return (
    <>
     {!isConnected && <button onClick={() => connect()}>Connect Wallet</button> }
     {isConnected && <button >Connected</button> }
      <button onClick={() => disconnect()}>Disconnect</button>
      <button onClick={() => buildUserOp()}>Build UserOp</button>
      <button onClick={() => ExecuteUserOp()}>ExeCute UserOp</button>
    </>
  );
}

export default App;
