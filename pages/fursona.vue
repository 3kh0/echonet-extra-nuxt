<script setup>
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { marked } from "marked";

const artworks = [
  {
    file: "xmr_hoodie",
    credits: "Commission from [crisspiess](https://xcancel.com/crispies_art)",
    blurb: "Taxes on crypto? Never head of it!",
  },
  {
    file: "olives_laptop",
    credits: "Commission from [olives_garden13](https://www.instagram.com/olives_garden13)",
    blurb: "I swear I am working, nothing to see here",
  },
  {
    file: "Echosketch",
    credits: "Commission from [Sachiyako](https://www.furaffinity.net/user/sachiyako/)",
    blurb: "I love it so much, the details are amazing, and the colors are perfect!",
  },
  {
    file: "ella_blahaj",
    credits: "Request from [Ella](https://sleepy.engineer/)",
    blurb: "IKEA SHARK MENTIONED!!! I love this piece so much it's so cute!",
  },
  {
    file: "chipflake-doodle",
    credits: "Sketch from [Chipflake](https://chipflake.com/)",
    blurb: "It was pretty cool getting this drawn by Aaron on his stream! :D",
  },
  {
    file: "echo_autism",
    credits: "Art from [Belonmelon](https://toyhou.se/Belonmelon)",
    blurb: "Wie cool ist das bitte? Jetzt zocke ich Fortnite und trinke Cola! YIPPEE!",
  },
  {
    file: "echo_simple",
    credits: "Commission from [Nigata Natsumoto](https://nigatanatsumoto.carrd.co/)",
    blurb: "Little do you know he is wanted from over 150 countries for war crimes.",
  },
  {
    file: "rainbow_art",
    credits: "Request from [Thedoubletailedrainbow](https://toyhou.se/TheDoubleTailedrainB)",
    blurb: "That's one silly fox boy. Thank you for this quick sketch!",
  },
  {
    file: "Palestine_support",
    credits: "Request from [@pup.dagger](https://linktr.ee/pup.dagger)",
    blurb: "I support human rights for Palestine, donate to Palestinian Rights at uscpr.org",
  },
  {
    file: "borbdraws",
    credits: "Request from [bogusborb](https://www.instagram.com/bogusborb)",
    blurb: "I love this because it's a nice simple drawing, but still has the cool foxxo :D",
  },
  {
    file: "echotor",
    credits: "Commission from [Axel](https://toyhou.se/pup_bites)",
    blurb: "Cool little drawing commissioned for my blog post about Tor!",
  },
  {
    file: "echo_cryptocurrency",
    credits: "Commission from [Raxun](https://www.instagram.com/trashpandaraku/profilecard/)",
    blurb: "Commissioned for a upcoming blog post that has yet to be released!",
  },
];

const parse = (credits) => {
  return credits ? marked.parseInline(credits) : "";
};
</script>
<template>
  <main class="p-4 overflow-y-auto h-full">
    <div class="max-w-6xl mx-auto">
      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Fursona Reference</h1>
      <p class="leading-7 [&:not(:first-child)]:mt-6">Here is some art and general information for my fursona, Echo the silly foxxo.</p>
      <div class="my-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="md:col-span-1 rounded-lg shadow-md overflow-hidden border border-zinc-800">
            <div class="p-0 m-0">
              <!-- eslint-disable-next-line vue/html-self-closing -->
              <img src="/img/art/xmr_hoodie_small.png" alt="Echo the Fox" class="w-full h-auto rounded-lg" />
            </div>
            <div class="m-4">
              <ul>
                <li><strong>Name:</strong> Echo</li>
                <li><strong>Age:</strong> 16</li>
                <li><strong>Body Type:</strong> Anthro</li>
                <li><strong>Pronouns:</strong> he/they</li>
                <li><strong>Species:</strong> Fox</li>
                <li><strong>Gender:</strong> Male</li>
                <li><strong>Tails:</strong> 3-5</li>
              </ul>
            </div>
          </div>
          <div class="md:col-span-2 space-y-6">
            <Alert class="h-full">
              <AlertTitle>About</AlertTitle>
              <AlertDescription>
                <div>Echo is an orange fox who usually wears a sweatshirt with the occasional T-shirt. Common designs include the <a class="font-semibold text-blue-500" target="_blank" href="https://web.getmonero.org/press-kit/">Monero logo</a> and the <a class="font-semibold text-blue-500" target="_blank" href="https://efimero.github.io/xenia-images/cathodegaytube1.jpg">Xenia Linux T-shirt</a>. His design is quite basic but leaves room for artists to make their own interpretation of how he should look.</div>
              </AlertDescription>
              <AlertTitle class="my-2">A few notes</AlertTitle>
              <AlertDescription
                ><ul class="list-disc pl-5 space-y-1">
                  <li>3 to 5 fluffy tails</li>
                  <li>Orange eyes</li>
                  <li>The tip of the ears are a bit darker</li>
                </ul></AlertDescription
              >
              <AlertTitle class="my-2">Do's and Don'ts</AlertTitle>
              <AlertDescription>
                <h3 class="text-xl font-semibold text-green-500">Yes!</h3>
                <ul class="list-disc pl-5 space-y-1">
                  <li>Draw without asking first</li>
                  <li>Pride art</li>
                  <li>Design changes</li>
                  <li>Body swap (humans/humanoid)</li>
                </ul>
                <h3 class="text-xl font-semibold text-red-500">No...</h3>
                <ul class="list-disc pl-5 space-y-1">
                  <li>NSFW, any and all kinds</li>
                  <li>Fetish/kink art</li>
                  <li>Gore of any kind</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
      <div class="my-8 pb-8">
        <h2 class="text-2xl font-bold mb-4">Artwork Gallery</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="artwork in artworks" :key="artwork.file" class="group rounded-lg shadow-md border border-zinc-800 overflow-hidden">
            <a :href="`/img/art/${artwork.file}.png`" target="_blank" class="block relative">
              <div class="aspect-square w-full flex items-center justify-center bg-zinc-900 overflow-hidden relative">
                <!-- eslint-disable-next-line vue/html-self-closing -->
                <img
                  :src="`/img/art/${artwork.file}.png`"
                  :alt="artwork.title"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-95"
                />
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <span class="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">View full image</span>
                </div>
              </div>
            </a>
            <div class="p-3">
              <!-- eslint-disable-next-line vue/html-self-closing -->
              <h3 class="font-bold" v-html="parse(artwork.credits)"></h3>
              <p class="text-sm text-muted-foreground mt-1">{{ artwork.blurb }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* fx scroll */
main {
  min-height: 100%;
}

/* marked links */
:deep(a) {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

:deep(a:hover) {
  text-decoration: underline;
}
</style>
