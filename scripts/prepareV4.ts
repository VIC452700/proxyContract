import { ethers } from "hardhat";
import { upgrades } from "hardhat"

// const proxyAddress = '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0'
const proxyAddress = '0x35874945d33BF032C0420E11166c4e70BC69459d'

async function main() {
  console.log(proxyAddress," original Box(proxy) address")
  const BoxV4 = await ethers.getContractFactory("BoxV4")
  console.log("Preparing upgrade to BoxV4...");

  // await upgrades.forceImport(proxyAddress, BoxV4);
  
  // kind: transparent, uups, beacon
  const boxV4Address = await upgrades.prepareUpgrade(proxyAddress, BoxV4, { kind: 'transparent' });
  console.log(boxV4Address, " BoxV4 implementation contract address")

  // 0x35874945d33BF032C0420E11166c4e70BC69459d  original Box(proxy) address
  // Preparing upgrade to BoxV4...
  // 0x47981bAC9953d68C18f64510ce6aC606897082Ff  BoxV4 implementation contract address
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})