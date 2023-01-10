import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const generateSignature = async (req, res) => {
  // Get the address from the request body
  const { address } = req.body;

  // Initialize the SDK with your private key
  const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "goerli");

  // Address of the NFT collection
  const collectionAddress = "0xc9cD8FB4D61204171af7dE5B7aB7aB7c948597CB";

  try {
    // Get the nft collection using the initialized sdk
    const collection = await sdk.getContract(
      collectionAddress,
      "nft-collection"
    );

    // Generate the signature
    const signature = await collection.erc721.signature.generate({
      to: address,
      metadata: {
        name: "My NFT",
        image:
          "https://gateway.ipfscdn.io/ipfs/QmXXjx3aJCs9W9mN35Aade6etSoceqMk8ykkasbB87MaLt/0.png",
      },
    });

    // Return the signature
    return res.status(200).json({
      message: `Signature generated for ${address}`,
      signature,
    });
  } catch (err) {
    // Return an error if something goes wrong
    return res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
};

export default generateSignature;