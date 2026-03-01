const contractAddress = "0x8b1ec220cdead329a7b57b48a87fba31a7fc5f93";

const abi = [
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "students",
    outputs: [
      { internalType: "string", name: "studentId", type: "string" },
      { internalType: "string", name: "fullName", type: "string" },
      { internalType: "string", name: "dateOfBirth", type: "string" },
      { internalType: "string", name: "course", type: "string" },
      { internalType: "address", name: "wallet", type: "address" },
      { internalType: "bool", name: "exists", type: "bool" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "string", name: "_degreeId", type: "string" }
    ],
    name: "verifyDegree",
    outputs: [
      { internalType: "bool", name: "exists", type: "bool" },
      { internalType: "string", name: "degreeType", type: "string" },
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint8", name: "status", type: "uint8" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "string", name: "_degreeId", type: "string" },
      { internalType: "string", name: "_degreeType", type: "string" },
      { internalType: "address", name: "_student", type: "address" }
    ],
    name: "mintDegree",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
