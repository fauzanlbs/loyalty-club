
# Persiapan:

* Clone repository `git clone `
* Install depedencies `npm install`
* Jalankan! `react-native run-android` / `react-native run-ios`
* Debug Log `react-native log-android`


# Referensi Pustaka :

* [React Navigation](https://reactnavigation.org)
* [RN Bottom Navigation](https://github.com/timomeh/react-native-material-bottom-navigation)
* [RN Vector Icons](https://github.com/oblador/react-native-vector-icons)
* [RN Nfc](https://github.com/Novadart/react-native-nfc)

# Issue Library:

### React Native Vector Icons

`Error: While resolving module 'react-native-vector-icons/MaterialIcons', the Haste package 'react-native-vector-icons' was found.` 

Solve with: https://github.com/oblador/react-native-vector-icons/issues/626

`rm ./node_modules/react-native/local-cli/core/_fixtures_/files/package.json`

### React Native Nfc

`react-native run-android fails in task ":react-native-nfc:compileReleaseJavaWithJavac"`

Solve with: https://github.com/Novadart/react-native-nfc/issues/19

comment `@Override` di file `ReactNativeNFCPackage.java:21`
