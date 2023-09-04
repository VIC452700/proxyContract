import { ethers } from "hardhat";
import { upgrades } from "hardhat"

// const proxyAddress = '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0'
const proxyAddress = '0x35874945d33BF032C0420E11166c4e70BC69459d'

async function main() {
  console.log(proxyAddress," original Box(proxy) address")
  const BoxV3 = await ethers.getContractFactory("BoxV3")
  console.log("upgrade to BoxV3...")
  const boxV3 = await upgrades.upgradeProxy(proxyAddress, BoxV3)
  const boxV3Address = await boxV3.getAddress()
  console.log(boxV3Address," BoxV3 address(should be the same)")
  console.log(await upgrades.erc1967.getImplementationAddress(boxV3Address)," getImplementationAddress")
  console.log(await upgrades.erc1967.getAdminAddress(boxV3Address), " getAdminAddress")   
  
  // 0x35874945d33BF032C0420E11166c4e70BC69459d  original Box(proxy) address
  // upgrade to BoxV3...
  // 0x35874945d33BF032C0420E11166c4e70BC69459d  BoxV3 address(should be the same)
  // 0x76f792B5C913657Ac15584A51d921F3D1ECf483c  getImplementationAddress
  // 0x634Dbc16E4ff34Cc45f2f2a625EF986fbeBa452d  getAdminAddress
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})