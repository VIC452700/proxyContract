import { expect } from "chai"
import { ethers, upgrades } from "hardhat"
import { Contract } from "ethers"

describe("Box (proxy) V2", function () {
  let box:Contract
  let boxV2:Contract

  beforeEach(async function () {
    const Box = await ethers.getContractFactory("Box")
    const BoxV2 = await ethers.getContractFactory("BoxV2")

    //initilize with 42
    box = await upgrades.deployProxy(Box, [42], {initializer: 'store'})
    const boxAddress = await box.getAddress();
    console.log(boxAddress," box/proxy")
    console.log(await upgrades.erc1967.getImplementationAddress(boxAddress)," getImplementationAddress")
    console.log(await upgrades.erc1967.getAdminAddress(boxAddress), " getAdminAddress\n\n")   
    
    
    boxV2 = await upgrades.upgradeProxy(boxAddress, BoxV2)
    const boxV2Address = await boxV2.getAddress();
    console.log(boxV2Address," box/proxy after upgrade")
    console.log(await upgrades.erc1967.getImplementationAddress(boxV2Address)," getImplementationAddress after upgrade")
    console.log(await upgrades.erc1967.getAdminAddress(boxV2Address)," getAdminAddress after upgrade")   
  })

  it("should retrieve value previously stored and increment correctly", async function () {
    expect((await boxV2.retrieve()).toString()).to.equal('42');

    await boxV2.increment()
    //result = 42 + 1 = 43
    expect((await boxV2.retrieve()).toString()).to.equal('43');

    await boxV2.store(100)
    expect((await boxV2.retrieve()).toString()).to.equal('100');
  })

})