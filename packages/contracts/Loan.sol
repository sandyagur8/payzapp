// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

// loan.sol

/*

Core functionalities

1) checks wether the user has kinto id kyc

2) if kycd then the user will be initialized and registered in the smart contract

3) all the registered users will get 100$ free credit

4) Users can avail these credit make payments and repay these loans in small tenures

5) Users can take multiple loan but not exceeding the available limit

6) only individuals can get loan

7) We charge 8.5% interest for the users


 */
import {IKintoID} from "./interfaces/IKintoID.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IKYC {
    function isKYC(address _account) external view returns (bool);

    function isIndividual(address _account) external view returns (bool);
}

contract Loan {
    address public immutable USDC_ADDRESS;
    IKYC public immutable KYC_VIEWER_ADDRESS;
    struct loanDetails {
        uint256 amount;
        uint8 remaining_tenures;
        uint8 total_tenures;
        uint256 tenure_size;
        uint256 loan_taken_time;
        uint256 next_tenure_due;
        uint256 last_day_of_repayment;
    }

    struct userDetails {
        uint256 credit_worthiness;
        uint256 credit_available;
    }
/* 
forge verify-contract 0x8208DFaEef51B4a8EaAe4d6Dbaa310F59F4881B2 src/SampleToken.sol:USDC --verifier-url 'https://api.routescan.io/v2/network/mainnet/evm/7887/etherscan' --etherscan-api-key "verifyContract" --num-of-optimizations 200 --compiler-version 0.8.24 --constructor-args $(cast abi-encode "constructor(address _USDC_ADDRESS, address _KYC_VIEWER_ADDRESS)" 0x8208DFaEef51B4a8EaAe4d6Dbaa310F59F4881B2 0x33F28C3a636B38683a38987100723f2e2d3d038e)

*/
    constructor(address _USDC_ADDRESS, address _KYC_VIEWER_ADDRESS) {
        USDC_ADDRESS = _USDC_ADDRESS;
        KYC_VIEWER_ADDRESS = IKYC(_KYC_VIEWER_ADDRESS);
        IERC20(USDC_ADDRESS).approve(address(this), 10000000 * 10 ** 18);
    }

    mapping(address => loanDetails[]) public user_to_loan_mapping; // each loan will be having an id which can be used to track the specifc loan that is going to be repayed
    mapping(address => userDetails) public address_to_user;

    ///////////////////////////// Modifiers //////////////////////////////////
    modifier userDoesNotExist() {
        bool isKYC = KYC_VIEWER_ADDRESS.isKYC(msg.sender);
        bool isIndividual = KYC_VIEWER_ADDRESS.isIndividual(msg.sender);

        require(
            address_to_user[msg.sender].credit_worthiness == 0 &&
                address_to_user[msg.sender].credit_available == 0,
            "User already exists"
        );
        require(isKYC && isIndividual, "Only KYCed Individuals can take loan");
        _;
    }
    modifier validateLoan(uint256 loanAmount) {
        userDetails memory user = address_to_user[msg.sender];
        require(user.credit_worthiness > 0, "You are not eligible");
        require(
            user.credit_available >= loanAmount,
            "Clear debts before taking new loan"
        );
        _;
    }

    modifier validRepay(uint8 id) {
        loanDetails memory loan_being_repayed = user_to_loan_mapping[
            msg.sender
        ][id];
        // require loan to exist for the msg.sender
        require(
            loan_being_repayed.amount != 0 &&
                loan_being_repayed.last_day_of_repayment != 0 &&
                loan_being_repayed.loan_taken_time != 0 &&
                loan_being_repayed.next_tenure_due != 0 &&
                loan_being_repayed.remaining_tenures != 0 &&
                loan_being_repayed.tenure_size != 0 &&
                loan_being_repayed.total_tenures != 0,
            "This is not a valid loan"
        );
        // require the msg.sender to have proper allowance to loan contract
        require(
            loan_being_repayed.tenure_size <=
                IERC20(USDC_ADDRESS).allowance(msg.sender, address(this)),
            "You have no proper allowance"
        );
        // require the msg.sender balance of to be greatre than the tenure size
        require(
            IERC20(USDC_ADDRESS).balanceOf(msg.sender) >=
                loan_being_repayed.tenure_size,
            "You dont have enough balance"
        );

        _;
    }

    ////////////////////////////////////////////////////////////////

    function create_user() public userDoesNotExist {
        address_to_user[msg.sender] = userDetails({
            credit_worthiness: 200,
            credit_available: 200
        });
    }

    function calculate_and_populate_loan(
        address userAddress,
        uint256 loanAmount,
        uint8 splits
    ) private {
        userDetails memory user = address_to_user[userAddress];
        uint256 loan_amount_added_with_interest = loanAmount + (loanAmount / 5);
        user.credit_available =
            user.credit_available -
            loan_amount_added_with_interest;
        uint256 tenure_size = (loan_amount_added_with_interest / splits);
        uint256 loan_taken_time = block.timestamp;
        uint256 next_tenure_due = loan_taken_time + (30 days);
        uint256 last_day_of_repayment = loan_taken_time +
            (30 days * tenure_size);
        user_to_loan_mapping[userAddress].push(
            loanDetails({
                amount: loan_amount_added_with_interest,
                remaining_tenures: splits,
                total_tenures: splits,
                tenure_size: tenure_size,
                loan_taken_time: loan_taken_time,
                next_tenure_due: next_tenure_due,
                last_day_of_repayment: last_day_of_repayment
            })
        );
    }

    function removeLoan(address repayer, uint8 loanID) private {
        loanDetails[] storage availableLoans = user_to_loan_mapping[repayer];
        availableLoans[loanID] = availableLoans[availableLoans.length - 1];
        availableLoans.pop();
    }

    function calculate_and_populate_repay(
        address repayer,
        uint8 loanID
    ) private {
        loanDetails memory currentLoan = user_to_loan_mapping[repayer][loanID];
        if (currentLoan.remaining_tenures == 1) {
            removeLoan(repayer, loanID);
        } else {
            address_to_user[repayer].credit_available =
                address_to_user[repayer].credit_available +
                currentLoan.tenure_size;
            uint256 next_tenure_due = block.timestamp + 30 days;
            uint8 remaining_tenures = currentLoan.remaining_tenures - 1;
            user_to_loan_mapping[repayer][loanID] = loanDetails({
                amount: currentLoan.amount,
                remaining_tenures: remaining_tenures,
                total_tenures: currentLoan.total_tenures,
                tenure_size: currentLoan.tenure_size,
                loan_taken_time: currentLoan.loan_taken_time,
                next_tenure_due: next_tenure_due,
                last_day_of_repayment: currentLoan.last_day_of_repayment
            });
        }
    }

    function get_repayment_amount(
        address repayer,
        uint8 loanId
    ) public view returns (uint256) {
        return user_to_loan_mapping[repayer][loanId].tenure_size;
    }

    function dispatchLoan(
        uint256 loanAmount,
        uint8 number_of_splits
    ) public validateLoan(loanAmount) {
        require(
            IERC20(USDC_ADDRESS).balanceOf(address(this)) >= loanAmount,
            "Your loan cant be served now try again later"
        );
        calculate_and_populate_loan(msg.sender, loanAmount, number_of_splits);
        IERC20(USDC_ADDRESS).transferFrom(
            address(this),
            msg.sender,
            loanAmount
        );
    }

    function repay_tenure(uint8 id) public validRepay(id) {
        calculate_and_populate_repay(msg.sender, id);
        uint256 repayment_amount = get_repayment_amount(msg.sender, id);
        IERC20(USDC_ADDRESS).transferFrom(msg.sender, address(this), repayment_amount);
    }

    function get_credit_limit(address user) public view returns (uint256) {
        return address_to_user[user].credit_available;
    }

    function get_loan_by_id(
        address user,
        uint8 id
    ) public view returns (loanDetails memory) {
        return user_to_loan_mapping[user][id];
    }
}
