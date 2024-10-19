# Suri App

![Linter](https://img.shields.io/github/actions/workflow/status/ragnarok22/suriApp/pr.yml)

Mobile app to manage Telesur mobile data in Suriname

## Getting Started

## Build

### Android

```bash
eas build --platform android
```

### iOS

[Expo docs](https://docs.expo.dev/tutorial/eas/ios-production-build/)

Update the build number in `app.json` and run the following command:

```bash
npx expo prebuild
```

then run the following command:

```bash
eas build --platform ios
```

After that, you can submit the build to the App Store with the following command:

```bash
eas submit --platform ios
```
