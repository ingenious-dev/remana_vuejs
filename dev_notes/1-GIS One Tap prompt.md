# Google Identity Services One Tap prompt/Federated Credentials Management (FedCM)
In the project/workspace for `remana_vuejs` I have resorted to user `Sign in With Google button` instead of `One Tap prompt` for the following reasons:

1. I'm concerned about its browser support as shown in the image. Notice the higlighted area shows a lack of good support for iOS. Check `https://developers.google.com/identity/gsi/web/guides/supported-browsers#one_tap` to see if the support is better in the future

    ![N|Solid](./Screenshot%202024-12-29%20114139.png)

2. I have personally had trouble with websites using `One Tap Prompt` while using Chrome browser in Windows 11.

    For example: When I visit a site like `stackoverflow` and change to a tab with a different website, lets call it `Website XYZ`, then when `stackoverflow` brings up its prompt (even thought it is currently not the active tab) I can it see from `Website XYZ` (much like how a download popup is not tab-specific). However the page of `Website XYZ` becomes non-interactive and the prompt from `stackoverflow` is also non-interactive. So I have to find the tab with `stackoverflow`, respond to the prompt then go back to the tab with `Website XYZ` (like when you are looking for the tab playing a media, only now you don't even have a visual indicator that would help -- like the speaker icon in the case of playing media).

So, while google documentation encourages developers to use `One Tap prompt`/`Federated Credentials Management (FedCM)`, the above reasons have led me to use `Sign in With Google button` at this time and save the recommendation for a time in the near future.

Author: Joseph Suhudu
Date created: 2024.12.29 11:55
Date modified: -