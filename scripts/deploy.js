//npx hardhat run scripts/deploy.js --network localhost

require('dotenv').config();
//const hre = require("hardhat");
const fs = require('fs');


async function main() {

  console.log();
  console.log('Contract deployment in progress...')
  console.log('Deploy on network: ['+ network.config.chainId + '] ' + network.name);
  let defaultSigner = null;
  /*
  if(process.env.GANACHE_PRIVATE_KEY) {
    console.log('GANACHE_PRIVATE_KEY: ',process.env.GANACHE_PRIVATE_KEY);
    defaultSigner = process.env.GANACHE_PRIVATE_KEY;
  } else {
    console.log('no privatekey');
  }
  */
  const [deployer] = await ethers.getSigners(defaultSigner);
  console.log("Deploying contracts with the account:", deployer.address);
  //return;

  const contract = await ethers.getContractFactory("DiskRegistry");
  DiskRegistry = await contract.deploy();
  await DiskRegistry.deployed();
  console.log(`✅ DiskRegistry deployed to: ${DiskRegistry.address}`);
  fs.writeFileSync('src/config/' + network.name + '_RegistryAddress.js', "export const " + network.name + "_REGISTRY_ADDR = '" + DiskRegistry.address + "';");

  const contractDisk = await ethers.getContractFactory("Disk");
  Disk = await contractDisk.deploy();
  await Disk.deployed();
  console.log(`✅ Disk deployed to: ${Disk.address}`);
  fs.writeFileSync('scripts/' + network.name + '_DiskAddress.txt', Disk.address);

  //await DiskRegistry.setDiskContractAddress(Disk.address);
  console.log('Deployment done. ✅');

  // Abis must be copy to src/assets/abi for front
  fs.writeFileSync('src/assets/abi/DiskRegistry.json', JSON.stringify(artifacts.readArtifactSync('DiskRegistry').abi, null, 2));
  fs.writeFileSync('src/assets/abi/Disk.json', JSON.stringify(artifacts.readArtifactSync('Disk').abi, null, 2));
  console.log('✅ Saving Abi files, done');

  // save admin (deployer) address ?

  /*
  if (network.name !== "localhost") {
    console.log('\nEtherscan verification in progress...');
  try {
    console.log('Disk contract verification in progress...');
    await Disk.deployTransaction.wait(6);
    await hre.run('verify:verify', { network: network.name, address: Disk.address, constructorArguments: [] });
    console.log('Disk contract verification done. ✅');
  } catch (error) {
    console.error(error);
    return;
  }
  */
  /*
  try {
    console.log('Disk Registry contract verification in progress...');
    await DiskRegistry.deployTransaction.wait(6);
    await hre.run('verify:verify', { network: network.name, address: DiskRegistry.address, constructorArguments: [] });
    console.log('Disk Registry contract verification done. ✅');
  } catch (error) {
    console.error(error);
    return;
  }
  }
  */
  console.log();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
