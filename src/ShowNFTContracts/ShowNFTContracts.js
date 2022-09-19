import React, {useCallback, useEffect, useState} from "react"
import {Alert, Box, Button, TextField, Typography} from "@mui/material"
import axios from "axios"

const ShowNFTContracts = () => {
  const [key, setKey] = useState("LdKVpNCilaBDBV0YxHVaYQf9o541pRKV")
  const [chainId, setChainID] = useState(80001);
  const [showContracts, setShowContracts] = useState(false)  
  const [contracts, setContracts] = useState(null)
  const [showAlert, setShowAlert] = useState(false)

  const handleKeyInputChange = useCallback((event) => {
    setKey(event.target.value)
  }, [])
  const handleChainIDInputChange = useCallback((event) => {
    setChainID(event.target.value)
  }, [])

  const handleShow = useCallback(() => {
    axios.get(`https://thentic.tech/api/contracts?key=${key}&chain_id=${chainId}`, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.status === 200) {
        setContracts(res.data.contracts)
      }
    })
  }, [key, chainId])

  const handleShowContracts = useCallback(() => {
    setShowContracts(!showContracts);
  }, [showContracts])

  useEffect(() => {
    if (key && chainId) {
      setShowAlert(false)
    }
  }, [key, chainId])

  return (
    <Box>
      <Button onClick={handleShowContracts}>Show NFT Contracts</Button>
      {showContracts && (
        <>
          <Box sx={{marginLeft: "50px"}}>
            <TextField
              label="Key"
              helperText="Please enter Thentic KEY"
              size="small"
              defaultValue="LdKVpNCilaBDBV0YxHVaYQf9o541pRKV"
              onChange={handleKeyInputChange}
            />
            <TextField
              label="Chain ID"
              helperText="Please enter chain ID"
              size="small"
              defaultValue={80001}
              type="number"
              onChange={handleChainIDInputChange}
            />
            <Button variant="contained" onClick={handleShow}>Show</Button>
            {showAlert && (
              <Alert severity="error">Please type correct key and chain ID!</Alert>
            )}
            {contracts && contracts.map(contract => (
              <div key={contract.request_id}>
                <Typography sx={{color: "green"}}>{contract.name}({contract.short_name})</Typography>
                <Box sx={{marginLeft: "30px"}}>
                  <div>
                    <Typography sx={{display: "inline", color: "blueviolet", fontWeight: "bold"}}>
                      status: 
                    </Typography>
                    {contract.status}
                  </div>
                  <div>
                    <Typography sx={{display: "inline", color: "blueviolet", fontWeight: "bold"}}>
                      request id:
                    </Typography> 
                    {contract.request_id}
                  </div>
                  <div>
                    <Typography sx={{display: "inline", color: "blueviolet", fontWeight: "bold"}}>
                      transaction url:
                    </Typography>
                    <a href={contract.transaction_url} target="_blank"> {contract.transaction_url} </a>
                  </div>
                  <div>
                    <Typography sx={{display: "inline", color: "blueviolet", fontWeight: "bold"}}>
                      transaction pixel:
                    </Typography>
                    {contract.transaction_pixel}</div>
                </Box>
              </div>
            ))}
          </Box>
        </>
      )}
    </Box>
  )
}

export default ShowNFTContracts
