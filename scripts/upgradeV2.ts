import { ethers } from "hardhat";
import { upgrades } from "hardhat"

// const proxyAddress = '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0'
const proxyAddress = '0x35874945d33BF032C0420E11166c4e70BC69459d'

async function main() {
  console.log(proxyAddress," original Box(proxy) address")
  const BoxV2 = await ethers.getContractFactory("BoxV2")
  console.log("upgrade to BoxV2...")
  const boxV2 = await upgrades.upgradeProxy(proxyAddress, BoxV2)
  const boxV2Address = await boxV2.getAddress();
  console.log(boxV2Address," BoxV2 address(should be the same)")

  console.log(await upgrades.erc1967.getImplementationAddress(boxV2Address)," getImplementationAddress")
  console.log(await upgrades.erc1967.getAdminAddress(boxV2Address), " getAdminAddress")   

  // await boxV2.store(50); // update value
  
  // 0x35874945d33BF032C0420E11166c4e70BC69459d  original Box(proxy) address
  // upgrade to BoxV2...
  // 0x35874945d33BF032C0420E11166c4e70BC69459d  BoxV2 address(should be the same)
  // 0xbd50c6C4530EEfdb87292c23351e073541398C9E  getImplementationAddress
  // 0x634Dbc16E4ff34Cc45f2f2a625EF986fbeBa452d  getAdminAddress
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})