//
//  Web3Manager.swift
//  EngageSDK
//
//  Created by Alok Sahay on 10.06.2023.
//

import Foundation
import web3swift
import Web3Core

struct ChainSpec {
    let provider: Web3Provider
    let address: EthereumAddress
}

class Web3Manager {
    
    static let sharedManager = Web3Manager()
    
    func postAnalytics(eventName: String, parameters: [String: Any]) async  {
        
        print("Analytics")
        
        let url = "https://polygon-mumbai.g.alchemy.com/v2/tqj5b52g48sb_rEwP6Ogu8U3w6uz4XZa"
        guard let urlConv = URL(string: url) else { return }
        
        
        do {
            let provider = try await Web3HttpProvider(url: urlConv, network: Networks.Custom(networkID: 80001))
        let web3 = Web3(provider: provider)
            await doWeb3things(web3: web3)
        } catch {
            print("Error: \(error)")
        }
        
    }
    
    func doWeb3things(web3: Web3) async {
        
        let contractAddress = EthereumAddress("0x6cf2cd877020aA4c228843Db3dF26E4F3EE510e5")
        let developerAddress = UnityAnalytics.sharedAnalytics.userWalletAddress
        let adId = "415"
        let impressions = 20
        
        guard let contractABI = getContractABI() else {
            return
        }
        
        let contract = web3.contract(contractABI, at: contractAddress, abiVersion: 1)
        
        guard let function = contract?.contract.method("storeEngagementData", parameters: [developerAddress, adId, impressions], extraData: nil) else { return }
        await sendTransaction(web3: web3, rawTransaction: function)
    }
    
    func sendTransaction(web3: Web3, rawTransaction: Data) async {
        do {
            _ = try await web3.eth.send(raw: rawTransaction)
        }
        catch
        {
            print("error")
        }
    }
    
    func getContractABI() -> String? {
        guard let fileURL = Bundle.main.url(forResource: "PolygonContractABI", withExtension: "json") else {
            // File not found
            return nil
        }
        let fileData = FileManager.default.contents(atPath: fileURL.path)
        guard let jsonData = fileData,
              let jsonString = String(data: jsonData, encoding: .utf8) else {
            // Error converting data to string
            return nil
        }
        return removeFormatting(from: jsonString)
    }
    
    func removeFormatting(from jsonString: String) -> String {
        let pattern = #"\s+|\\n|\\"#
        let regex = try! NSRegularExpression(pattern: pattern, options: .caseInsensitive)
        let range = NSRange(location: 0, length: jsonString.count)
        let formattedString = regex.stringByReplacingMatches(in: jsonString, options: [], range: range, withTemplate: "")
        return formattedString
    }
}

