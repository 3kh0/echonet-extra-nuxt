<script setup>
const loading = ref(true);
const info = ref(null);

onMounted(async () => {
  try {
    const response = await fetch("https://wtfismyip.com/json");
    const data = await response.json();

    // got ipv6?
    let ipv4 = null;
    if (data.YourFuckingIPAddress.includes(":")) {
      const ipv4Response = await fetch("https://ipv4.myip.wtf/text");
      ipv4 = await ipv4Response.text();
    }

    info.value = {
      ip: data.YourFuckingIPAddress, // FUCKING IP ADDRESS
      ipv4: ipv4,
      location: data.YourFuckingLocation, // FUCKING LOCATION
      hostname: data.YourFuckingHostname, // FUCKING HOSTNAME
      isp: data.YourFuckingISP, // FUCKING ISP
      city: data.YourFuckingCity, // FUCKING CITY
      country: data.YourFuckingCountry, // FUCKING COUNTRY
      countryCode: data.YourFuckingCountryCode, // FUCKING COUNTRY CODE
      userAgent: navigator.userAgent, // user agent :3
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      windowRatio: (window.innerWidth / window.innerHeight).toFixed(2),
      screenWidth: window.screen.availWidth,
      screenHeight: window.screen.availHeight,
      screenRatio: (window.screen.availWidth / window.screen.availHeight).toFixed(2),
      colorDepth: window.screen.colorDepth,
      doNotTrack: navigator.doNotTrack === "1" ? "Enabled" : "Disabled",
      globalPrivacyControl: navigator.globalPrivacyControl,
      cookies: navigator.cookieEnabled,
      webGLEnabled: !!window.WebGLRenderingContext,
      browserLanguage: navigator.language,
      cpuThreads: navigator.hardwareConcurrency,
    };
  } catch (error) {
    console.error("the fucking thing broke ", error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="flex-grow p-2 rounded-lg overflow-auto hide-scrollbar">
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Browser Info</h1>
    <div v-if="loading" class="flex justify-center items-center h-full">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 16 16" class="motion-safe:animate-spin-fast">
        <path fill="#fff" d="M8 0A8 8 0 0 0 .002 7.812C.094 4.033 2.968 1 6.5 1C10.09 1 13 4.134 13 8a1.5 1.5 0 0 0 3 0a8 8 0 0 0-8-8m0 16a8 8 0 0 0 7.998-7.812C15.906 11.967 13.032 15 9.5 15C5.91 15 3 11.866 3 8a1.5 1.5 0 0 0-3 0a8 8 0 0 0 8 8" />
      </svg>
    </div>
    <div v-else>
      <ul class="my-6 ml-6 list-disc [&>li]:mt-2">
        <li v-if="info.ip.includes(':')" class="font-bold">IPv6 Address: {{ info.ip }}</li>
        <li v-if="info.ipv4" class="font-bold">IPv4 Address: {{ info.ipv4 }}</li>
        <li v-else-if="!info.ip.includes(':')" class="font-bold">IPv4 Address: {{ info.ip }}</li>
        <li>Location: {{ info.location }}</li>
        <li>Hostname: {{ info.hostname }}</li>
        <li>ISP: {{ info.isp }}</li>
        <li>City: {{ info.city }}</li>
        <li>Country: {{ info.country }}</li>
        <li>Country Code: {{ info.countryCode }}</li>
        <li>User Agent: {{ info.userAgent }}</li>
        <li>Window Width: {{ info.windowWidth }}px</li>
        <li>Window Height: {{ info.windowHeight }}px</li>
        <li>Window Ratio: {{ info.windowRatio }}</li>
        <li>Screen Width: {{ info.screenWidth }}px</li>
        <li>Screen Height: {{ info.screenHeight }}px</li>
        <li>Screen Ratio: {{ info.screenRatio }}</li>
        <li>Color Depth: {{ info.colorDepth }}</li>
        <li>Do Not Track: {{ info.doNotTrack }}</li>
        <li>Global Privacy Control: {{ info.globalPrivacyControl }}</li>
        <li>Cookies: {{ info.cookies }}</li>
        <li>WebGL Enabled: {{ info.webGLEnabled }}</li>
        <li>Browser Language: {{ info.browserLanguage }}</li>
        <li>CPU Threads: {{ info.cpuThreads }}</li>
      </ul>
      <p class="leading-7 [&:not(:first-child)]:mt-6">
        Data provided by <a href="https://wtfismyip.com/" class="underline text-blue-500" target="_blank">wtfismyip</a>.
        <span
          >Use a VPN to protect your privacy online. I recommend <a href="https://mullvad.net/en/vpn" class="underline text-blue-500" target="_blank">Mullvad VPN</a>, it is secure, private, and you don't even use a email to sign up. Pay a flat rate of 5€ per month.
          <!--#ad--></span
        >
      </p>
    </div>
  </div>
</template>
