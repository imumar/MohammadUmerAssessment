# Assessment

## 📝 Objective

The goal of this assessment is to evaluate your ability to:

- Work with Node.js backend code.
- Interact with blockchain smart contracts.

---

## 📌 Task Instructions

1. **Create a New API Endpoint**

   - Add a new API endpoint in `index.js` named:

     ```
     [Name]ApiTest
     ```

2. **Smart Contract Interaction**

   - Select any **pre-deployed** or **public smart contract** (mainnet or testnet).
   
   - Fetch some data (any useful information such as balance, contract state, or public variables).
   
   - The logic should fetch data through your new API endpoint.


3. **Output**

   - The result should be printed to the console.
   - No need for complex UI or data persistence 
   - just demonstrate that the data was fetched successfully.

---

## 📤 Submission

Once completed, submit one of the following:

- **short video** recording your work.
- **screenshots** showing the API call and console result.
- **Github Link** where your assessment result were pushed.

---

## ⏰ Time Expectation

- Estimated time to complete: **30–60 minutes**.

---

## ⚙️ Notes

You may use any blockchain provider such as:

  - **ethers.js**
  - **web3.js**
  - Any public RPC provider (Infura, Alchemy, QuickNode, etc.)
  
Keep your code **clean, simple, and easy to review**.

Handle errors gracefully where possible.

---
## 🚀 Quick Start Guide

To run the project locally:

```bash
# Clone the repository (if provided)
git clone [repo-url]

# Move into the project directory
cd [project-folder]

# Install dependencies
npm install

# Start the server
npm start
```

## 📡 Assessment Explanation

### GET /api/MohammadApiTest

A demonstration API endpoint for blockchain interaction that fetches data from the Polygon network.

**Functionality:**
- Connects to Polygon mainnet using ethers.js and a public RPC endpoint (`https://polygon-rpc.com`)
- Retrieves the latest block number from the blockchain
- Queries the ETH balance of a specific wallet address (`0x79D4a5CF743f4e5032503BD21facf8D50F076Ef1`)
- Returns the fetched data in JSON format

**Response Example:**
```json
{"message":"Smart contract data fetched successfully","data":{"latestBlockNumber":81342319,"balance":"0.069827646005471764"}}%    
```

**Usage:**
do npm start and then
```bash
curl http://localhost:3001/api/MohammadApiTest
```
