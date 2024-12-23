# **Sports Card Investor Mobile Dev Challenge**

The following are bullet points of the process, the roadblocks, and the discoveries made during its development. The instructions to run the app locally are also provided.

---

## ** Instructions for getting started **

Make sure you have yarn and expo configured on your local machine.

[Yarn](https://classic.yarnpkg.com/lang/en/docs/getting-started/)

[Expo](https://docs.expo.dev/get-started/set-up-your-environment/)

- Start by cloning the repo on your local machine with:

  `git clone https://github.com/doctor-ew/SCI-fe-dev-challenge-mobile.git`

- Next enter the root directory, install the dependencies and run the app:

  `cd SCI-fe-dev-challenge-mobile && pnpm install`

- This project is designed only to run on an emulator. It is important to note that the BASE_URL used for Android it is "http://10.0.2.2:8010/proxy" whereas for IOS it is "http://localhost:8010/proxy". You can also add an environment variable named EXPO_PUBLIC_BASE_URL to an .env file for a custom configureation. Based on your operating system open an emulator and confirm it is running. Lastly, run the appropriate command:

  - IOS:

    `yarn android-with-proxy`

  - Android:

    `yarn ios-with-proxy`

This will start the application by first running the linting checks and running the tests.
Then upon success, you will see the development server URL on the terminal. For example:

`Opening exp://10.0.0.194:8081 on <Emulator name>`

---

## **Process Overview**

I was developing on Windows with Android Studio and had a load of crashes by the computer and issues with metrobundling cache and the Android studio. I have to admit, this was very challenging to overcome. I would reach out to other team members but I was working at night and on the weekend with these challenges and didn't want to bother anyone.

The process started in the same manner as the next.js challenge and began with the package.json and adding to the configuration. There was a missing ios-with-proxy script and following a warning during startup, I adjusted a version of react-native-picker/picker to 2.9.0.There was also a package-lock.json that was deleted to avoid any conflicts.After devloping, then had to rewrite some of the tests because the implementation had changed but only used existing ones. There could be more tests addressing error handling and states.

You will notice another branch OriginalGestureNotWorkAndroid; I didn't want to use a package to animate the swiping instead, I wanted to show my ability to learn quickly with Animations and understand not just the how but the why when it comes from devloping. Boy was I humbled, I had the math correct, the setup correct but I think it boiled down to a z-index issue on Android devices (still looking for the link to the article). It was time to change the approach and settled for the react-native-carousel package. When I look for packages, I always look to see what was the date for the last publish and then check the issues. Luckily I found an updated version but is currently having issues with Expo version 52.

There have been a lot of learning moments and despite the difficulties, I persisted and completed the challenge. It wasn't my best, it wasn't my worst but it was an opportunity to learn and solve problems which is what I enjoy doing.
