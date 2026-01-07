const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const killPort = require('kill-port');

require('dotenv').config();

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3001;

(async () => {
    const getPort = (await import('get-port')).default; // dynamic import
    const final_port = await getPort({ port: PORT });

    console.log(`Port ${final_port} is free. Ready to start server.`);

    // Middleware
    app.use(cors({ origin: `http://localhost:${final_port}` }));
    app.use(express.json());
    app.use(morgan('dev'));

    // Routes
    app.use('/api/items', require('./routes/items'));
    app.use('/api/stats', require('./routes/stats'));

    // New API endpoint for smart contract interaction
    app.get('/api/MohammadApiTest', async (req, res) => {
        try {
            const { ethers } = require('ethers');

            // Connect to Polygon mainnet using a public RPC
            const provider = new ethers.JsonRpcProvider('https://polygon-rpc.com');

            // Example: Get the latest block number
            const blockNumber = await provider.getBlockNumber();
            console.log('Latest block number:', blockNumber);

            //  fetching ETH balance of a random address
            const address = '0x79D4a5CF743f4e5032503BD21facf8D50F076Ef1'; 
            const balance = await provider.getBalance(address);
            const ethBalance = ethers.formatEther(balance);
            console.log('ETH balance:', ethBalance);

            res.json({
                message: 'Smart contract data fetched successfully',
                data: {
                    latestBlockNumber: blockNumber,
                    balance: ethBalance
                }
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Failed to fetch smart contract data' });
        }
    });

    require('./config/dbHandler.js').connect();

    /**
     * @route    [HTTP_METHOD] /api/endpoint
     * @desc     [Short summary of what this endpoint does, e.g., Reads or sets value in smart contract]
     * @author   [Your Name]
     * @access   [public/private/auth-required]
     * @param    {Request}  req  - Express request object. [Describe relevant body/query/params fields]
     * @param    {Response} res  - Express response object.
     * @returns  {JSON}          [Describe the JSON structure returned]
     * @throws   [Error conditions, e.g., 400 on invalid input, 500 on contract failure]
     *
     * @example
     * // Example request
     * curl -X POST http://localhost:3001/contract/value -H "Content-Type: application/json" -d '{"value": 42}'
     *
     * // Example response
     * {
     *   "message": "Value updated",
     *   "txHash": "0x..."
     * }
     */

    // Serve static files in production
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static('client/build'));
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
    }

    // Start server
    app.listen(final_port, () => {
        console.log(`Backend running on http://localhost:${final_port}`);
    });
})();
