module.exports = {

    /*
     * scriptHash is your smart contract Script Hash, without the first 2 '0x' characters
     * To retrieve your Script Hash: (in neo-gui: right click smart contract address > View Contract)
     */
     // scriptHash: '0d300bb33b160265908dd64652cdfb8c89aada3a',
     // //name: oneMore

     scriptHash: '4aacd5242613e7e6a9d3db30e12e0dd7b4b928e8',
     //name: g

    /*
     * RESTEndpoint is an endpoint to a neon-wallet-db REST server that's connected to your desired net (MainNet, TestNet, PrivNet)
     * MainNet: http://api.wallet.cityofzion.io
     * TestNet: http://testnet-api.wallet.cityofzion.io
     * PrivNet: HTTP URL to your neon-wallet-db instance IP with port 5000
     */
     //RESTEndpoint: 'http://testnet-api.wallet.cityofzion.io',
     RESTEndpoint: 'http://localhost:4000/api/main_net',

     wif: 'KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr',

};
