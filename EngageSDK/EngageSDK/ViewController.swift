//
//  ViewController.swift
//  EngageSDK
//
//  Created by Alok Sahay on 10.06.2023.
//

import UIKit
import UnityAds

class ViewController: UIViewController {
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        
        UnityAds.initialize("5309728", testMode: true, initializationDelegate: self)
        
        let button = UIButton(type: .system)
        button.setTitle("Test", for: .normal)
        button.frame = CGRect(x: 0, y: 0, width: 200, height: 50)
        button.center = view.center
        button.addTarget(self, action: #selector(buttonTapped), for: .touchUpInside)
        button.backgroundColor = .green
        view.addSubview(button)
        
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        UnityAds.load("Interstitial_iOS", loadDelegate: self)
    }
    
    @objc func buttonTapped() {
        print("Show ads!")
        UnityAds.show(self, placementId: "Interstitial_iOS", showDelegate: self)
    }
    
    func logUnityAnalyticsEvent(eventName: String, parameters: [String: Any]) {
        print("Unity Analytics Event: \(eventName)")
        print("Parameters: \(parameters)")
    }
}

extension ViewController: UnityAdsInitializationDelegate, UnityAdsLoadDelegate, UnityAdsShowDelegate {
    
    func unityAdsAdLoaded(_ placementId: String) {
        
    }
    
    func unityAdsAdFailed(toLoad placementId: String, withError error: UnityAdsLoadError, withMessage message: String) {
        
    }
    
    func unityAdsShowComplete(_ placementId: String, withFinish state: UnityAdsShowCompletionState) {
        
    }
    
    func unityAdsShowFailed(_ placementId: String, withError error: UnityAdsShowError, withMessage message: String) {
        print("unityAdsShowFailed")
    }
    
    func unityAdsShowStart(_ placementId: String) {
      print("log unity analytics")
        logUnityAnalyticsEvent(eventName: "Ad started", parameters: [
            "address": UnityAnalytics.sharedAnalytics.userWalletAddress,
            "duration": 30,
            "engagementFactor": 2,
            "isNativeAd": true
        ])
    }
    
    func unityAdsShowClick(_ placementId: String) {
        print("unityAdsShowClick")
    }
    
    func initializationComplete() {
        UnityAds.load("Interstitial_iOS", loadDelegate: self)
    }
    
    func initializationFailed(_ error: UnityAdsInitializationError, withMessage message: String) {
        
    }
    
    
}
