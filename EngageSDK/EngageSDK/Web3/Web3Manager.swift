//
//  Web3Manager.swift
//  EngageSDK
//
//  Created by Alok Sahay on 10.06.2023.
//

import Foundation
import web3swift
import Web3Core

class Web3Manager {
    static let web3Manager = Web3Manager()
    let polygonProvider: Web3Provider = Web3(provider: "https://<ethereum-network-rpc-url>" as! Web3Provider) as! Web3Provider
    
}

