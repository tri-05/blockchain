let web3;
let contract;
let account;

// 🔴 DÁN ABI VÀO ĐÂY
const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "degrees",
      "outputs": [
        {
          "internalType": "string",
          "name": "degreeId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "degreeType",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "issuedBy",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "issuedAt",
          "type": "uint256"
        },
        {
          "internalType": "enum StudentCredential.DegreeStatus",
          "name": "status",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "students",
      "outputs": [
        {
          "internalType": "string",
          "name": "studentId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "fullName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "dateOfBirth",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "course",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "wallet",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "exists",
          "type": "bool"
        }
      ]
      ,
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "transcripts",
      "outputs": [
        {
          "internalType": "string",
          "name": "semester",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "transcriptHash",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_wallet",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_studentId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_fullName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_dob",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_course",
          "type": "string"
        }
      ],
      "name": "createStudent",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_student",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_semester",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_hash",
          "type": "string"
        }
      ],
      "name": "addTranscript",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_degreeId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_degreeType",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_student",
          "type": "address"
        }
      ],
      "name": "mintDegree",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_degreeId",
          "type": "string"
        }
      ],
      "name": "revokeDegree",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_degreeId",
          "type": "string"
        }
      ],
      "name": "verifyDegree",
      "outputs": [
        {
          "internalType": "bool",
          "name": "exists",
          "type": "bool"
        },
        {
          "internalType": "string",
          "name": "degreeType",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "enum StudentCredential.DegreeStatus",
          "name": "status",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]


// 🔴 DÁN ADDRESS CONTRACT
const contractAddress = "0xC47D1663c6EDC0DcF5FB38E0f084068b6BFfA5cb";

async function connect() {
  if (!window.ethereum) {
    alert("Cài MetaMask trước!");
    return;
  }

  web3 = new Web3(window.ethereum);
  await ethereum.request({ method: "eth_requestAccounts" });

  const accounts = await web3.eth.getAccounts();
  account = accounts[0];

  document.getElementById("account").innerText = "Ví đang dùng: " + account;
  contract = new web3.eth.Contract(abi, contractAddress);
}

/* ======================
    CREATE STUDENT
====================== */
async function createStudent() {
  await contract.methods.createStudent(
    document.getElementById("studentWallet").value,
    document.getElementById("studentId").value,
    document.getElementById("studentName").value,
    document.getElementById("studentDob").value,
    document.getElementById("studentCourse").value
  ).send({ from: account });

  alert("✅ Tạo sinh viên thành công");
}

/* ======================
    MINT DEGREE
====================== */
async function mintDegree() {
  await contract.methods.mintDegree(
    document.getElementById("degreeId").value,
    document.getElementById("degreeType").value,
    document.getElementById("degreeOwner").value
  ).send({ from: account });

  alert("🎓 Cấp bằng thành công");
}

/* ======================
    REVOKE DEGREE
====================== */
async function revokeDegree() {
  await contract.methods.revokeDegree(
    document.getElementById("revokeId").value
  ).send({ from: account });

  alert("⚠️ Đã thu hồi bằng");
}

/* ======================
    VERIFY DEGREE
====================== */
async function verifyDegree() {
  const id = document.getElementById("verifyId").value;
  const res = await contract.methods.verifyDegree(id).call();

  if (!res.exists) {
    document.getElementById("result").innerText = "❌ Không tìm thấy bằng";
    return;
  }

  document.getElementById("result").innerText =
    `✅ HỢP LỆ\n` +
    `📘 Loại bằng: ${res.degreeType}\n` +
    `👤 Chủ sở hữu: ${res.owner}\n` +
    `📌 Trạng thái: ${res.status == 0 ? "VALID" : "REVOKED"}`;
}
