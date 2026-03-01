// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DegreeCredential {
    address public school;

    constructor() {
        school = msg.sender;
    }

    modifier onlySchool() {
        require(msg.sender == school, "Only school");
        _;
    }

    enum DegreeStatus { VALID, REVOKED, EXPIRED }

    struct Degree {
        bool exists;
        string degreeType;
        address owner;
        string ipfsHash;
        uint256 issuedAt;
        DegreeStatus status;
    }

    mapping(string => Degree) public degrees;

    event DegreeMinted(string degreeId, address owner);
    event DegreeRevoked(string degreeId);
    event DegreeExpired(string degreeId);

    function mintDegree(
        string memory _degreeId,
        string memory _degreeType,
        address _owner,
        string memory _ipfsHash
    ) external onlySchool {
        require(!degrees[_degreeId].exists, "Degree exists");

        degrees[_degreeId] = Degree(
            true,
            _degreeType,
            _owner,
            _ipfsHash,
            block.timestamp,
            DegreeStatus.VALID
        );

        emit DegreeMinted(_degreeId, _owner);
    }

    function revokeDegree(string memory _degreeId) external onlySchool {
        require(degrees[_degreeId].exists, "Not found");
        degrees[_degreeId].status = DegreeStatus.REVOKED;
        emit DegreeRevoked(_degreeId);
    }

    function verifyDegree(string memory _degreeId)
        external
        view
        returns (
            bool exists,
            string memory degreeType,
            address owner,
            DegreeStatus status,
            string memory ipfsHash
        )
    {
        Degree memory d = degrees[_degreeId];
        return (d.exists, d.degreeType, d.owner, d.status, d.ipfsHash);
    }
}
