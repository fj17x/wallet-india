const IPFS = require("ipfs-http-client")

const projectId = "2FD1hN0v9vQKdfznxrSDU9Iqsn6" //enter your own
const projectSecret = "" //enter your own

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64")

const ipfs = IPFS.create({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
})
export default ipfs
