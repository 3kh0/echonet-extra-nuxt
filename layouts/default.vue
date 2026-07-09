<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

const searchInput = ref<{ focus: () => void } | null>(null);
const isInputFocused = ref(false);
const isSidebarCollapsed = ref(false);
const isMobileMenuOpen = ref(false);

const searchQuery = ref("");
const focusSearch = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === "k") {
    event.preventDefault();
    searchInput.value?.focus();
  }
};

const handleFocus = () => {
  isInputFocused.value = true;
};

const handleBlur = () => {
  isInputFocused.value = false;
};

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

onMounted(() => {
  window.addEventListener("keydown", focusSearch);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", focusSearch);
});

/**
 * @constant {Ref<Array<Object>>} links
 * - `to` {string}: path
 * - `text` {string}: title
 */
const links = ref([
  { to: "/", text: "About" },
  { to: "/aboutblank", text: "About:blank embed" },
  { to: "/base64", text: "Base64 converter" },
  { to: "/browserinfo", text: "Browser Info" },
  { to: "/coinflip", text: "Coinflip" },
  { to: "/time", text: "Current Time" },
  { to: "/pomodoro", text: "Pomodoro Timer" },
  { to: "/randomnumber", text: "Number Generator" },
  { to: "/reactiontime", text: "Reaction Time" },
  { to: "/useragent", text: "User Agent" },
  { to: "/crypto", text: "Crypto Wallets" },
  { to: "/fursona", text: "Fursona Reference" },
  { to: "/urlopen", text: "URL Opener" },
  { to: "/qrcode", text: "QR Code Maker" },
]);
// why keep this all in a list when you could populate it automatically?
// because some are not ready to be on the list

const filteredLinks = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return links.value
    .slice()
    .sort((a, b) => a.text.localeCompare(b.text))
    .filter((link) => link.text.toLowerCase().includes(query));
});

// push new tools, e.g. _addLink('/e621', 'e621'); :trol:
const _addLink = (to: string, text: string) => {
  links.value.push({ to, text });
};

//seo
useHead({
  title: "Echo Net Extras",
  meta: [
    { name: "description", content: "Welcome to my extras website! This is a collection of random tools that I have created and use somewhat regularly." },
    { property: "og:description", content: "Welcome to my extras website! This is a collection of random tools that I have created and use somewhat regularly." },
    { property: "og:title", content: "Echo Net Extras" },
  ],
});
</script>

<template>
  <div class="app-layout flex h-screen w-screen flex-col lg:flex-row">
    <!-- smol screen -->
    <header class="navbar flex items-center justify-between m-4 mb-0 rounded-lg p-2 bg-[#09090b] border border-zinc-800 lg:hidden relative z-40">
      <h1 class="text-2xl font-semibold tracking-tight">Echo Net Extras</h1>
      <button class="hamburger-menu" @click="toggleMobileMenu">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
          <path fill="#fff" d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z" />
        </svg>
      </button>
    </header>

    <div :class="['fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out h-screen overflow-y-auto', isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full']">
      <div class="bg-zinc-950 border border-zinc-800 m-4 p-4 rounded-lg overflow-y-auto">
        <div class="flex items-center justify-between mb-2">
          <h1 class="text-2xl font-semibold tracking-tight">Echo Net Extras</h1>
          <button class="hamburger-menu" @click="toggleMobileMenu">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
              <path fill="#fff" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z" />
            </svg>
          </button>
        </div>
        <Input ref="searchInput" v-model="query" class="mb-2" placeholder="Search tools..." @focus="handleFocus" @blur="handleBlur" />
        <nav class="flex flex-col space-y-2">
          <NuxtLink v-for="link in filteredLinks" :key="link.to" :to="link.to" class="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700" exact-active-class="active-link" @click="toggleMobileMenu">
            {{ link.text }}
          </NuxtLink>
        </nav>
        <!-- eslint-disable-next-line vue/html-self-closing -->
        <div class="text-lg font-semibold mt-2">Made with <img class="h-5 w-5 inline" alt="green heart" src="~/assets/svg/greenheart.svg" /> by Echo</div>
        <p class="text-sm text-muted-foreground my-2">Version prod+{{ runtimeConfig.public.sha }}</p>
        <a href="https://echonet.fillout.com/feedback" target="_blank">
          <Button class="mt-auto w-full">Submit Feedback</Button>
        </a>
      </div>
    </div>

    <!-- BIGGGGGGGGGGGG SCREEEEEEEEEN -->
    <header :class="['sidebar flex flex-col items-center p-2 bg-[#09090b] overflow-y-auto hide-scrollbar border-r border-zinc-800 transition-all duration-500 z-10', isSidebarCollapsed ? 'collapsed' : 'expanded', 'hidden lg:flex']">
      <h1 class="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0 text-center">Echo Net Extras</h1>

      <div class="relative w-full max-w-sm items-center">
        <Input ref="searchInput" v-model="searchQuery" class="my-2" placeholder="Search tools..." @focus="handleFocus" @blur="handleBlur" />
        <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
          <span class="text-xs text-muted text-zinc-400 bg-zinc-800 py-1 px-2 rounded-sm">CTRL + K</span>
        </span>
      </div>

      <nav class="flex flex-col space-y-2 w-full">
        <NuxtLink v-for="link in filteredLinks" :key="link.to" :to="link.to" :class="['nav-link', searchQuery && !link.text.toLowerCase().includes(searchQuery.toLowerCase()) ? 'text-muted' : '']" exact-active-class="active-link">
          {{ link.text }}
        </NuxtLink>
      </nav>

      <!-- eslint-disable-next-line vue/html-self-closing -->
      <div class="text-lg font-semibold mt-2">Made with <img class="h-5 w-5 inline" alt="green heart" src="~/assets/svg/greenheart.svg" /> by Echo</div>
      <p class="text-sm text-muted-foreground my-2">Version prod+{{ runtimeConfig.public.sha }}</p>

      <div class="flex flex-col w-full mt-auto">
        <!--todo lets replace text with icons, could be cool-->
        <a href="https://echonet.fillout.com/feedback" target="_blank">
          <Button class="mt-auto w-full">Submit Feedback</Button>
        </a>
        <Button variant="secondary" class="mt-2 w-full" @click="toggleSidebar">Collapse Sidebar</Button>
      </div>
    </header>

    <!--content-->
    <main id="defmain" :class="['flex-grow flex flex-col m-2 bg-[#09090b] h-full transition-all duration-500', isSidebarCollapsed ? 'collapsed' : '']">
      <NuxtPage class="p-4" />
    </main>
    <Button v-if="isSidebarCollapsed" style="border-radius: 0 0.7rem 0.7rem 0" class="fixed left-0 bottom-1/4 transition-all bg-zinc-800 p-2 m-0 hover:bg-zinc-900" @click="toggleSidebar">
      <!-- so clean i like this icon-->
      <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24"><path fill="#fff" d="M10.46 18a2.2 2.2 0 0 1-.91-.2a1.76 1.76 0 0 1-1.05-1.59V7.79A1.76 1.76 0 0 1 9.55 6.2a2.1 2.1 0 0 1 2.21.26l5.1 4.21a1.7 1.7 0 0 1 0 2.66l-5.1 4.21a2.06 2.06 0 0 1-1.3.46" /></svg>
    </Button>
  </div>
</template>

<style scoped>
/* sidebar anim
so many things can be done better but this works tailwindcss kinda broke and i am not sure why
my guess is that since these css rules are placed over tailwind it works. idk im dum */
.sidebar {
  transition: left 0.5s ease-in-out;
  width: 230px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
}
.sidebar.expanded {
  left: 0;
}
.sidebar.collapsed {
  left: -230px; /* shimmy it */
}
@media (min-width: 1024px) {
  #defmain {
    margin-left: 230px;
  }
}
#defmain {
  transition: margin-left 0.5s ease-in-out;
}
#defmain.collapsed {
  margin-left: 0;
}

.nav-link {
  @apply px-2 py-1 text-center rounded-lg transition-colors duration-300 hover:bg-zinc-800;
  /* WHY IS THIS YELLOW UNDERLINE I HATE YELLOWS */
}
.nav-link:hover,
.active-link {
  @apply bg-zinc-800 text-white;
  /* Unknown at rule @applycss(unknownAtRules) how fix */
  /* nvm you can just add "css.lint.unknownAtRules": "ignore" 
  and it goes away, awesome */
}
.text-muted {
  color: #6b7280; /* gray-500 */
}
</style>
