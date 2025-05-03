<template>
  <main class="p-4">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Crypto Wallets</h1>
    <p class="leading-7 [&:not(:first-child)]:mt-6">Feel free to use these as ways to help donate and contribute to my work!</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      <div v-for="crypto in cryptos" :key="crypto.name" class="bg-transparent border border-zinc-800 p-2 rounded-lg shadow-lg flex items-center">
        <!-- eslint-disable-next-line vue/html-self-closing -->
        <img :src="crypto.image" :alt="crypto.name" class="h-10 w-10 mr-4" />
        <div class="flex flex-col flex-grow">
          <h2 class="text-md font-bold">{{ crypto.name }}</h2>
          <p class="text-xs text-zinc-500">
            {{ short(crypto.address) }}
          </p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger as-child>
            <Button variant="secondary" class="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24">
                <path fill="#000" d="M10.46 18a2.2 2.2 0 0 1-.91-.2a1.76 1.76 0 0 1-1.05-1.59V7.79A1.76 1.76 0 0 1 9.55 6.2a2.1 2.1 0 0 1 2.21.26l5.1 4.21a1.7 1.7 0 0 1 0 2.66l-5.1 4.21a2.06 2.06 0 0 1-1.3.46" />
              </svg>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{{ crypto.name }} Wallet</AlertDialogTitle>
              <AlertDialogDescription class="break-words">
                Address: <span class="break-all">{{ crypto.address }}</span>
                <!--add more content depending on the wallet-->
                <div v-if="crypto.networks" class="flex space-x-2 mt-2">
                  <span class="mr-1">Supported Networks:</span>
                  <TooltipProvider>
                    <Tooltip v-for="network in crypto.networks" :key="network">
                      <TooltipTrigger as-child>
                        <NuxtLink :href="lookup(network, crypto.address)" target="_blank">
                          <!-- eslint-disable-next-line vue/html-self-closing -->
                          <img :src="`/svg/${network}.svg`" :alt="network" class="h-5 w-5" />
                        </NuxtLink>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Network: {{ network }}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div v-if="crypto.name === 'Ethereum'" class="mt-2">
                  <p>All assets are accepted provided that they are swappable. If possible, only send popular assets like ETH, USDT, and USDC.</p>
                </div>
                <div v-if="crypto.name === 'Bitcoin'" class="mt-2">
                  <p>Need to use the Lightning Network? Please contact me for deposit request.</p>
                </div>
                <div v-if="crypto.name === 'Tron'" class="mt-2">
                  <p>This address only accepts TRX, USDT, BTT. Any other assets sent will be lost.</p>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter class="flex justify-between"
              ><!--why you not go left rahh-->
              <AlertDialogCancel class="align-left">Close</AlertDialogCancel>
              <div class="flex space-x-2">
                <Button variant="default" class="mt-0 h-9 py-2 px-4" @click="copy(crypto.address)">Copy Address</Button>
                <NuxtLink :href="lookup(crypto.name, crypto.address)" target="_blank">
                  <Button variant="default" class="mt-0 h-9 py-2 px-4">Open in Explorer</Button>
                </NuxtLink>
              </div>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  </main>
</template>

<script setup>
import { toast } from "vue-sonner";

import {
  AlertDialog,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  AlertDialogAction, // might be useful in the future
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const cryptos = [
  { name: "Monero", address: "43LSJpZ6Le84eMiLTmMwZgTDMxtPthDh8Cdk1HWuLAx9itTgj8YqLbGE7hFYXSR6p6YVP8g4TMWxDiQTDnHW1VHMAb6YDrH", image: "/svg/xmr.svg" },
  { name: "Ethereum", address: "0x4a31EBD5A93334ba99CAE15dd1411c7a3E0214B6", image: "/svg/eth.svg", networks: ["eth", "base", "polygon", "op", "avax"] },
  { name: "Litecoin", address: "ltc1qthzg52yvpeznqaudu62stml2w85pfrvrfklm4f", image: "/svg/ltc.svg" },
  { name: "Bitcoin", address: "3CsXfnKicmrkDyoFKLm9KfVUjqXJxXN77N", image: "/svg/btc.svg" },
  { name: "Dogecoin", address: "DBhD3inJwU17gZo4FTaH7HsCBwe3iW3Fa4", image: "/svg/doge.svg" },
  { name: "Bitcoin Cash", address: "qp2l3dp5adgy375t9pgeptw0cul2nw65pys295gzun", image: "/svg/bch.svg" },
  { name: "Tron", address: "TSnh7sZQKUttsWupa7vhpp3ow1t16Z2p88", image: "/svg/trx.svg" },
  { name: "Solana", address: "7JnnjZfcNEoc6h3dRPw8zWFQQGoiMPtpMFNyDq9usPye", image: "/img/sol.png" },
  { name: "Zcash", address: "t1Z5ZeB5YKxUcd7xY5rhUMMqmWsZhURWCK9", image: "/svg/zec.svg" },
  { name: "Ton", address: "UQDGhAIJhSzvRsS2p4J_4FzpEgBqUMiWGFUH7Dc--mNrtZ8W", image: "/svg/ton.svg" },
];

const copy = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    //getting fancy with the toast
    toast("Copied!", { description: "Address copied to clipboard." });
  });
};

const lookup = (name, address) => {
  switch (name) {
    case "Monero":
      return `https://xmrchain.net/search?value=${address}`;
    case "Ethereum":
      return `https://app.zerion.io/${address}`;
    case "Litecoin":
      return `https://litecoinspace.org/address/${address}`;
    case "Bitcoin":
      return `https://mempool.space/address/${address}`;
    case "Dogecoin":
      return `https://dogechain.info/address/${address}`;
    case "Bitcoin Cash":
      return `https://blockchair.com/bitcoin-cash/address/${address}`;
    case "Tron":
      return `https://tronscan.org/#/address/${address}`;
    case "Solana":
      return `https://solscan.io/account/${address}`;
    case "Zcash":
      return `https://mainnet.zcashexplorer.app/address/${address}`;
    case "Ton":
      return `https://tonscan.org/address/${address}`;
    // eth networks
    case "eth":
      return `https://etherscan.io/address/${address}`;
    case "base":
      return `https://basescan.org/address/${address}`;
    case "polygon":
      return `https://polygonscan.com/address/${address}`;
    case "op":
      return `https://optimistic.etherscan.io/address/${address}`;
    case "avax":
      return `https://snowscan.xyz/address/${address}`;
    default:
      console.error("dumbass idiot forgot the link haha ", name);
      // fuck logic
      return "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  }
};

const short = (address) => {
  // short people
  return address.slice(0, 6) + "..." + address.slice(-6);
};
</script>
