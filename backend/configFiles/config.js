module.exports = {

    /*
     * scriptHash is your smart contract Script Hash, without the first 2 '0x' characters
     * To retrieve your Script Hash: (in neo-gui: right click smart contract address > View Contract)
     */
     scriptHash: '26e4c66123dbd36df7d33bc4a49c02d56ac0cdc2',
     //name: dudebro3

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
