// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract StudentCredential {

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only school can do this");
        _;
    }

    /* =======================
        STUDENT PROFILE
    ======================= */

    struct Student {
        string studentId;
        string fullName;
        string dateOfBirth;
        string course;
        address wallet;
        bool exists;
    }

    mapping(address => Student) public students;

    function createStudent(
        address _wallet,
        string memory _studentId,
        string memory _fullName,
        string memory _dob,
        string memory _course
    ) public onlyOwner {
        students[_wallet] = Student(
            _studentId,
            _fullName,
            _dob,
            _course,
            _wallet,
            true
        );
    }

    /* =======================
        DEGREE
    ======================= */

    enum DegreeStatus { VALID, REVOKED }

    struct Degree {
        string degreeId;
        string degreeType;
        string issuedBy;
        uint256 issuedAt;
        DegreeStatus status;
        address owner;
    }

    mapping(string => Degree) public degrees;

    function mintDegree(
        string memory _degreeId,
        string memory _degreeType,
        address _student
    ) public onlyOwner {
        require(students[_student].exists, "Student not found");

        degrees[_degreeId] = Degree(
            _degreeId,
            _degreeType,
            "University",
            block.timestamp,
            DegreeStatus.VALID,
            _student
        );
    }

    function revokeDegree(string memory _degreeId) public onlyOwner {
        require(degrees[_degreeId].issuedAt != 0, "Degree not found");
        degrees[_degreeId].status = DegreeStatus.REVOKED;
    }

    function verifyDegree(string memory _degreeId)
        public
        view
        returns (
            bool exists,
            string memory degreeType,
            address owner,
            DegreeStatus status
        )
    {
        Degree memory d = degrees[_degreeId];
        if (d.issuedAt == 0) {
            return (false, "", address(0), DegreeStatus.REVOKED);
        }
        return (true, d.degreeType, d.owner, d.status);
    }
}
