/// <reference types="react-scripts" />
interface Window {
    ethereum: any
}

declare module "*.png" {
    const value: any;
    export = value;
  }