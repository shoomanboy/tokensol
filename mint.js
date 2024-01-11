import { percentAmount, generateSigner, signerIdentity, createSignerFromKeypair } from '@metaplex-foundation/umi'
import { TokenStandard, createAndMint } from '@metaplex-foundation/mpl-token-metadata'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import  "@solana/web3.js";

const secret = [0,236,218,187,198,245,207,197,76,242,191,17,60,47,214,198,0,73,111,251,183,204,111,98,215,118,15,233,153,92,37,245,97,106,117,131,239,238,173,9,12,111,73,38,106,205,227,151,242,37,45,119,153,74,170,103,165,40,75,232,205,9,204,1];

const umi = createUmi('https://alien-old-telescope.solana-devnet.quiknode.pro/10330996da4b0cd6a1e492bc908d333d6fddc12c/'); //Replace with your QuickNode RPC Endpoint

const userWallet = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secret));
const userWalletSigner = createSignerFromKeypair(umi, userWallet);

const metadata = {
    name : "Ghoul token!",
    symbol : "TGREE",
    description: "BUY NOW!!!",
    uri: "https://github.com/shoomanboy/tokensol/blob/main/tEviFw_oNFY.jpg",
};

const mint = generateSigner(umi);
umi.use(signerIdentity(userWalletSigner));
umi.use(mplCandyMachine())

createAndMint(umi, {
    mint,
    authority: umi.identity,
    name: metadata.name,
    symbol: metadata.symbol,
    uri: metadata.uri,
    sellerFeeBasisPoints: percentAmount(0),
    decimals: 8,
    amount: 1000000_00000000,
    tokenOwner: userWallet.publicKey,
    tokenStandard: TokenStandard.Fungible,
    }).sendAndConfirm(umi).then(() => {
    console.log("Successfully minted 1 million tokens (", mint.publicKey, ")");
});
