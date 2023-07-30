const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  // compile them in our code
  // compile seperatly
  //http://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(
    "http://172.18.64.1:7545"
  );
  const wallet = new ethers.Wallet(
    "0x86aad0d43be4197f29c3e072867c2e48169c4f9a404ef7d2184cdc9b7f56a872",
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin");

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("deploying , please wait!");

  const contract = await contractFactory.deploy({ gasLimit: 3000000 });
  // const deploymentRecipt = await contract.deployTransaction.wait(1);
  // console.log(deploymentRecipt);
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
