const { ethers } = require("hardhat");
const { expect } = require("chai");
const { solidity } = require("ethereum-waffle")
const chai = require("chai")
chai.use(solidity)

describe("**** DiskRegistry ****", function () {

  let DiskRegistry;
  let Disk;

  beforeEach(async function () {

    // Create signers
    [owner, olivier] = await ethers.getSigners();

    const contract = await ethers.getContractFactory("DiskRegistry");
    DiskRegistry = await contract.deploy();
    await DiskRegistry.deployed();

    const contractDisk = await ethers.getContractFactory("Disk");
    Disk = await contractDisk.deploy();
    await Disk.deployed();
  });

  describe("Tests unitaires Get", function () {
    it("get version", async function () {
      expect(await DiskRegistry.version()).to.equal("1.0");
    });

    it("get diskExist", async function () {
      expect(await DiskRegistry.diskExist(owner.address)).to.equal(false);
    });

    it("get getDisk", async function () {
      expect(await DiskRegistry.getDisk(owner.address)).to.equal(ethers.constants.AddressZero);
    });

    it("get owner", async function () {
      expect(await DiskRegistry.owner()).to.equal(owner.address);
    });
  });

  describe("Tests unitaires Write", function () {
    it("diskCreate", async function () {
      //await expect(DiskRegistry.diskCreate()).to.be.revertedWith("No Bytecode");

      console.log("Code disk address: ", Disk.address);

      await DiskRegistry.setDiskContractAddress(Disk.address);

      //await DiskRegistry.setDiskBytecodeByAddress(Disk.address);

      /*
      let bytecode = diskJson.bytecode; //.substring(2);
      //let bytes = new Uint8Array(bytecode);
      let bytes = Uint8Array.from(bytecode, c => c.codePointAt(0));
      console.log("len bytecode: ", bytes.length);
      await DiskRegistry.setDiskBytecode(bytes);
      */

      expect(await DiskRegistry.diskExist(owner.address)).to.equal(false);
      await DiskRegistry.diskCreate();
      expect(await DiskRegistry.diskExist(owner.address)).to.equal(true);
      await expect(DiskRegistry.diskCreate()).to.be.revertedWith("You already have a disk");

      let diskAddr = await DiskRegistry.getDisk(owner.address);
      console.log("User disk address: ", diskAddr);
      //const userDisk = ethers.getContractAt("Disk", diskAddr);
      const userDisk = (await ethers.getContractFactory("Disk")).attach(diskAddr);

      //await userDisk.init();
      console.log("owner address: ", owner.address);
      expect(await userDisk.owner()).to.equal(owner.address);
      expect(await userDisk.version()).to.equal("1.0"); //userDisk.version2 is not a function
      expect(await userDisk.existDir("/")).to.equal(true);
    });

  });

});