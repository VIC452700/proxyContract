import { ethers } from "hardhat";
import { upgrades } from "hardhat"

async function main() {
  const Box = await ethers.getContractFactory("Box")
  console.log("Deploying Box...")
  const box = await upgrades.deployProxy(Box,[42], { initializer: 'store' })

  const boxAddress = await box.getAddress();
  // const boxAddress = "0x35874945d33BF032C0420E11166c4e70BC69459d";
  console.log(boxAddress," box(proxy) address")
  console.log(await upgrades.erc1967.getImplementationAddress(boxAddress)," getImplementationAddress")
  console.log(await upgrades.erc1967.getAdminAddress(boxAddress)," getAdminAddress") 
  
  // 0x35874945d33BF032C0420E11166c4e70BC69459d  box(proxy) address
  // 0x1F45086027c61201b6206bDb92b0293573787174  getImplementationAddress
  // 0x634Dbc16E4ff34Cc45f2f2a625EF986fbeBa452d  getAdminAddress
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Box = https://sepolia.etherscan.io/address/0x1F45086027c61201b6206bDb92b0293573787174#code
// BoxV2 = https://sepolia.etherscan.io/address/0xbd50c6C4530EEfdb87292c23351e073541398C9E#code
// BoxV3 = https://sepolia.etherscan.io/address/0x76f792B5C913657Ac15584A51d921F3D1ECf483c#code
// BoxV4 = https://sepolia.etherscan.io/address/0x47981bAC9953d68C18f64510ce6aC606897082Ff#code