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


// curl -X POST http://neo-privatenet:30333/ -H 'Content-Type: application/json' -d '{ "jsonrpc": "2.0", "id": 1234, "method": "getcontractstate", "params": ["688841e275b9a16d07cdcf66cf102cbbe264d4b8",[]]}'
// curl -X POST http://neo-privatenet:30333/ -H 'Content-Type: application/json' -d '{ "jsonrpc": "2.0", "id": 1234, "method": "invokescript", "params": ["688841e275b9a16d07cdcf66cf102cbbe264d4b8",["013503746f6d52c108726567697374657267b8d464e2bb2c10cf66cfcd076da1b975e2418868"]]}'
// curl -X POST http://neo-privatenet:30333/ -H 'Content-Type: application/json' -d '{ "jsonrpc": "2.0", "id": 1234, "method": "invokefunction", "params": ["688841e275b9a16d07cdcf66cf102cbbe264d4b8","register",["746f6d","35"]]}'
