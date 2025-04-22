// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
}

contract MusicStaking {
    IERC20 public token;
    address public owner;

    struct StakeInfo {
        uint256 amount;
        uint256 rewardDebt;
    }

    // contentId => user => stake info
    mapping(uint256 => mapping(address => StakeInfo)) public stakes;

    // contentId => total staked
    mapping(uint256 => uint256) public totalStaked;
    // Track unique stakers per contentId
    mapping(uint256 => address[]) public stakersPerContent;
    mapping(uint256 => mapping(address => bool)) public hasStakedBefore;

    // contentId => performance score (set by admin or oracle)
    mapping(uint256 => uint256) public performanceScore;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address _token) {
        token = IERC20(_token);
        owner = msg.sender;
    }

    // Function to stake tokens on a track
    function stake(address staker, uint256 contentId, uint256 amount) external {
        require(amount > 0, "Nothing to stake");
        token.transferFrom(staker, address(this), amount);
    
        StakeInfo storage stakeInfo = stakes[contentId][staker];
        stakeInfo.amount += amount;
        totalStaked[contentId] += amount;
        // Track unique staker
        if (!hasStakedBefore[contentId][staker]) {
            stakersPerContent[contentId].push(staker);
            hasStakedBefore[contentId][staker] = true;
        }
    }

    // Admin function to update the performance of a music track
    function updatePerformance(uint256 contentId, uint256 newScore) external onlyOwner {
        performanceScore[contentId] = newScore;
    }

    // Function to calculate the reward for a user based on performance score
    function calculateReward(uint256 contentId, address user) public view returns (uint256) {
        StakeInfo memory stakeInfo = stakes[contentId][user];
        uint256 score = performanceScore[contentId];
        return (stakeInfo.amount * score) / 1e18; // Simple reward calculation
    }

    // Function for users to claim their rewards
    function claimRewards(address staker, uint256 contentId) internal  {
        uint256 reward = calculateReward(contentId, staker);
        if (reward > 0) {
            stakes[contentId][staker].rewardDebt += reward;
            token.transferFrom(owner, staker, reward);
        }
    }

    // Function to unstake tokens from a track
    function unstake(address staker, uint256 contentId) external {
        StakeInfo storage stakeInfo = stakes[contentId][staker];
        require(stakeInfo.amount > 0, "Nothing staked");

        uint256 amount = stakeInfo.amount;
        stakeInfo.amount = 0;
        totalStaked[contentId] -= amount;
        token.transfer(staker, amount);
        claimRewards(staker, contentId);
    }

}
