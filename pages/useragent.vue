<script setup>
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ua = ref("");
const browser = ref("");
const browserVer = ref("");
const os = ref("");
const osver = ref("");

//get ctrl+ced https://stackoverflow.com/questions/9514179/
const getBrowserInfo = (ua) => {
  // if everything goes to shit
  let browser = "Unknown";
  let ver = "Unknown";

  let nameOff, verOff, ix;

  if ((verOff = ua.indexOf("YaBrowser")) != -1) {
    browser = "Yandex";
    ver = ua.substring(verOff + 10);
  } else if ((verOff = ua.indexOf("SamsungBrowser")) != -1) {
    browser = "Samsung";
    ver = ua.substring(verOff + 15);
  } else if ((verOff = ua.indexOf("UCBrowser")) != -1) {
    browser = "UC Browser";
    ver = ua.substring(verOff + 10);
  } else if ((verOff = ua.indexOf("OPR")) != -1) {
    browser = "Opera";
    ver = ua.substring(verOff + 4);
  } else if ((verOff = ua.indexOf("Opera")) != -1) {
    browser = "Opera";
    ver = ua.substring(verOff + 6);
    if ((verOff = ua.indexOf("ver")) != -1) {
      ver = ua.substring(verOff + 8);
    }
  } else if ((verOff = ua.indexOf("Edge")) != -1) {
    browser = "Microsoft Legacy Edge";
    ver = ua.substring(verOff + 5);
  } else if ((verOff = ua.indexOf("Edg")) != -1) {
    browser = "Microsoft Edge";
    ver = ua.substring(verOff + 4);
  } else if ((verOff = ua.indexOf("MSIE")) != -1) {
    browser = "Microsoft Internet Explorer";
    ver = ua.substring(verOff + 5);
  } else if ((verOff = ua.indexOf("Chrome")) != -1) {
    browser = "Chrome";
    ver = ua.substring(verOff + 7);
  } else if ((verOff = ua.indexOf("Safari")) != -1) {
    browser = "Safari";
    ver = ua.substring(verOff + 7);
    if ((verOff = ua.indexOf("ver")) != -1) {
      ver = ua.substring(verOff + 8);
    }
  } else if ((verOff = ua.indexOf("Firefox")) != -1) {
    browser = "Firefox";
    ver = ua.substring(verOff + 8);
  } else if (ua.indexOf("Trident/") != -1) {
    browser = "Microsoft Internet Explorer";
    ver = ua.substring(ua.indexOf("rv:") + 3);
  } else if ((nameOff = ua.lastIndexOf(" ") + 1) < (verOff = ua.lastIndexOf("/"))) {
    browser = ua.substring(nameOff, verOff);
    ver = ua.substring(verOff + 1);
    if (browser.toLowerCase() == browser.toUpperCase()) {
      browser = navigator.appName; // deprecated, but kept for compatibility
    }
  }

  if ((ix = ver.indexOf(";")) != -1) ver = ver.substring(0, ix);
  if ((ix = ver.indexOf(" ")) != -1) ver = ver.substring(0, ix);
  if ((ix = ver.indexOf(")")) != -1) ver = ver.substring(0, ix);

  return { browser, ver };
};

const getOSDetails = (ua) => {
  let os = "Unknown";
  let osver = "Unknown";
  const clientStrings = [
    { s: "Windows 10", r: /(Windows 10.0|Windows NT 10.0)/ },
    { s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/ },
    { s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/ },
    { s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/ },
    { s: "Windows Vista", r: /Windows NT 6.0/ },
    { s: "Windows Server 2003", r: /Windows NT 5.2/ },
    { s: "Windows XP", r: /(Windows NT 5.1|Windows XP)/ },
    { s: "Windows 2000", r: /(Windows NT 5.0|Windows 2000)/ },
    { s: "Windows ME", r: /(Win 9x 4.90|Windows ME)/ },
    { s: "Windows 98", r: /(Windows 98|Win98)/ },
    { s: "Windows 95", r: /(Windows 95|Win95|Windows_95)/ },
    { s: "Windows NT 4.0", r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
    { s: "Windows CE", r: /Windows CE/ },
    { s: "Windows 3.11", r: /Win16/ },
    { s: "Android", r: /Android/ },
    { s: "Open BSD", r: /OpenBSD/ },
    { s: "Sun OS", r: /SunOS/ },
    { s: "Chrome OS", r: /CrOS/ }, //eww
    { s: "Linux", r: /(Linux|X11(?!.*CrOS))/ },
    { s: "iOS", r: /(iPhone|iPad|iPod)/ },
    { s: "Mac OS X", r: /Mac OS X/ },
    { s: "Mac OS", r: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
    { s: "QNX", r: /QNX/ },
    { s: "UNIX", r: /UNIX/ },
    { s: "BeOS", r: /BeOS/ },
    { s: "OS/2", r: /OS\/2/ },
    { s: "Search Bot", r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ },
    // todo add ai bots, but is it worth it? probs not
  ];

  for (const id in clientStrings) {
    const cs = clientStrings[id];
    if (cs.r.test(ua)) {
      os = cs.s;
      break;
    }
  }

  if (/Windows/.test(os)) {
    osver = /Windows (.*)/.exec(os)[1];
    os = "Windows";
  }

  switch (os) {
    case "Mac OS":
    case "Mac OS X":
    case "Android":
      osver = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([._\d]+)/.exec(ua)[1];
      break;

    case "iOS":
      osver = /OS (\d+)_(\d+)_?(\d+)?/.exec(ua);
      osver = osver[1] + "." + osver[2] + "." + (osver[3] | 0);
      break;
  }

  return { os, osver };
};

onMounted(() => {
  ua.value = navigator.userAgent;
  const browserInfo = getBrowserInfo(ua.value);
  browser.value = browserInfo.browser;
  browserVer.value = browserInfo.ver;

  const osDetails = getOSDetails(ua.value);
  os.value = osDetails.os;
  osver.value = osDetails.osver;
});
</script>

<template>
  <main>
    <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Your User Agent</h1>
    <div class="bg-zinc-800 p-2 my-4 rounded-md shadow-md relative">
      <pre id="result" class="font-mono text-md ml-1 whitespace-pre-wrap break-words">{{ ua }}</pre>
    </div>
    <Alert>
      <AlertTitle>What does this mean?</AlertTitle>
      <AlertDescription>
        Your browser: <span class="font-semibold">{{ browser }} {{ browserVer }}</span>
        <!-- eslint-disable-next-line vue/html-self-closing -->
        <br />
        Your operating system: <span class="font-semibold">{{ os }} {{ osver }}</span>
      </AlertDescription>
    </Alert>
  </main>
</template>
