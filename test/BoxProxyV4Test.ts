import { expect } from "chai"
import { ethers, upgrades } from "hardhat"
import { Contract } from "ethers"

describe("Box (proxy) V4 with getName", function () {
  let box:Contract
  let boxV2:Contract
  let boxV3:Contract
  let boxV4:Contract

  beforeEach(async function () {
    const Box = await ethers.getContractFactory("Box")
    const BoxV2 = await ethers.getContractFactory("BoxV2")
    const BoxV3 =  await ethers.getContractFactory("BoxV3")
    const BoxV4 =  await ethers.getContractFactory("BoxV4")

    //initialize with 42
    box = await upgrades.deployProxy(Box, [42], {initializer: 'store'})
    const boxAddress = await box.getAddress();
    boxV2 = await upgrades.upgradeProxy(boxAddress, BoxV2)
    boxV3 = await upgrades.upgradeProxy(boxAddress, BoxV3)
    boxV4 = await upgrades.upgradeProxy(boxAddress, BoxV4)
  })

  it("should retrieve value previously stored and increment correctly", async function () {
    expect((await boxV2.retrieve()).toString()).to.equal('42');
    await boxV4.increment()
    expect((await boxV4.retrieve()).toString()).to.equal('43');

    await boxV2.store(100)
    expect((await boxV2.retrieve()).toString()).to.equal('100');
  })

  it("should setName and getName correctly in V4", async function () {
    //name() removed, getName() now
    // expect(boxV4).to.not.have.own.property("name")
    expect(boxV4.name).to.be.undefined
    expect((await boxV4.getName()).toString()).to.equal('Name: ');
    
    const boxname="my Box V4"
    await boxV4.setName(boxname)
    expect((await boxV4.getName()).toString()).to.equal('Name: '+boxname);
  })

})