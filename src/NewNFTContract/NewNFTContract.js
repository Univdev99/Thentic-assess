import React, {useCallback, useEffect, useState} from "react"
import {Alert, Box, Button, Typography, TextField} from "@mui/material"
import axios from "axios"

const NewNFTContract = () => {
  const [key, setKey] = useState("LdKVpNCilaBDBV0YxHVaYQf9o541pRKV")
  const [chainId, setChainID] = useState(80001);
  const [name, setName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [transactionURL, setTransactioinURL] = useState("")

  const handleNewContract = useCallback(() => {
    setShowForm(!showForm);
  }, [showForm])

  const handleKeyInputChange = useCallback((event) => {
    setKey(event.target.value)
  }, [])
  const handleChainIDInputChange = useCallback((event) => {
    setChainID(event.target.value)
  }, [])
  const handleNameInputChange = useCallback((event) => {
    setName(event.target.value)
  }, [])

  const handleSymbolInputChange = useCallback((event) => {
    setSymbol(event.target.value)
  }, [])

  useEffect(() => {
    if (key && chainId && name && symbol) {
      setShowAlert(false)
    }
  }, [key, chainId, name, symbol])

  const handleCreateContract = useCallback(() => {
    if (!key || !chainId || !name || !symbol) {
      setShowAlert(true)
    } else {
      axios.post("https://thentic.tech/api/nfts/contract", {
        key,
        chain_id: chainId,
        name,
        short_name: symbol
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        // if (res.data.status === "pending") {
        //   setContractStatus(false)
        // }
        setTransactioinURL(res.data.transaction_url)
      })
    }
  }, [key, chainId, name, symbol])
  return (
    <Box>
      <Button onClick={handleNewContract}>New NFT Contract</Button>
        <Box sx={{marginLeft: "50px"}}>
        {showForm && (
          <>
            <Box>
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
              <TextField
                label="Name"
                helperText="Please enter contract name"
                size="small"
                onChange={handleNameInputChange}
              />
              <TextField
                label="Symbol"
                helperText="Please enter short name"
                size="small"
                onChange={handleSymbolInputChange}
              />
              <Button variant="contained" onClick={handleCreateContract}>Create</Button>
              {showAlert && (
                <Alert severity="error">Please type correct chain ID, name and symbol!</Alert>
              )}
            </Box>
            {transactionURL && (
              <Typography>
                Please follow<br /> <a href={transactionURL} target="_blank"> {transactionURL} </a><br /> to create a NFT contract.<br />
                With metamask connection, make it to success transaction.
              </Typography>
            )}
          </>
        )}
      </Box>
    </Box>
  )
}

export default NewNFTContract
