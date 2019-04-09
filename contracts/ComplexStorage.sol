pragma solidity >=0.4.21 <0.6.0;

contract ComplexStorage {
    uint public storeduint1 = 15;
    uint public constant constuint = 16;
    uint128 public investmentsLimit = 17055;
    uint32 public investmentsDeadlineTimeStamp = uint32(now);

    bytes16 public sixteenBytes = "test1";
    bytes32 public thirtyTwoBytes = "test1236";
    string public decodedString = "this is a string";

    mapping (address => uint) uints1;
    mapping (address => DeviceData) structs1;

    uint[] public uintarray;
    DeviceData[] public deviceDataArray;
    DeviceData public singleDD;

    struct DeviceData {
        string deviceBrand;
        string deviceYear;
        string batteryWearLevel;
    }

    constructor() public {
        address address1 = 0xe9b0c35C6e73EEaa2321e1C95adFfD26302692bC;
        address address2 = 0x7f0F8C12851B7F1Cf85b07Eb2F1595EeE8A8C2cc;

        uints1[address1] = 88;
        uints1[address2] = 99;

        structs1[address1] = DeviceData("Apple", "2018", "35%");
        structs1[address2] = DeviceData("Microsoft", "2019", "5%");
        singleDD = DeviceData("Microsoft", "2018", "10%");

        uintarray.push(8000);
        uintarray.push(9000);

        deviceDataArray.push(structs1[address1]);
        deviceDataArray.push(structs1[address2]);
    }
}
