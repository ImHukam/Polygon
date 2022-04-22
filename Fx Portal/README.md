project overview: using this scripts or project, we canconvert eth erc20 token into polygon chain using fx portal,, 

what is fx portal?: FxPortal offers an alternative where ERC standardized tokens can be deployed without any mapping involved, simply using the deployed base FxPortal contracts.

steps to convert eth erc20 token into polygon chain:

1.first we need to approve erc20 token for roottunnel base contract. </br>
2.after approve, deposit token into roottunnel contract using deposit() function. after few minutes, polygon chain base token will be receive into receiver address. its all process done by state sync mechanism. </br>
3.to withdraw token into main chian, we have to use withdraw() function of childtunnel contract .. it will burn token of polygon chain, we have to save tx hash to that tx to generate proof. </br>
4. after checkpointed, using buring tx hash, we can generate proof using exitmanager and withdarw manager. </br>
5. in the last step, we have to submt burning proof on roottunnel using receiveMessage() function. in 20 minutes to 3 hour, eth base token will be receive.. </br>


important links(goreli and mumbai testnet):

eth test token: https://goerli.etherscan.io/address/0x0E9d93a7F5f847ED46e533eBB5b7c02aBaDe818B </br>
eth base roottunnel contract: https://goerli.etherscan.io/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961 

polygon fx token: https://mumbai.polygonscan.com/token/0xb097791018ea1484bb92d4518a95ae9fa38b4d61 </br>
polygon base childtunnel contract: https://mumbai.polygonscan.com/address/0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767

process: </br>
deposit transaction: https://goerli.etherscan.io/tx/0x1f0149a88b9e96b2629f969ce46b725b7895aa88d5716ddd99958c8dbc80e21b </br>
withdraw transaction: https://mumbai.polygonscan.com/tx/0x31f0cd46b7923a1d5b13f62881267d3d9dd6162a89e444b35a7cadb7b7fe8e0e </br>
burning tx hash: https://mumbai.polygonscan.com/tx/0x31f0cd46b7923a1d5b13f62881267d3d9dd6162a89e444b35a7cadb7b7fe8e0e </br>
