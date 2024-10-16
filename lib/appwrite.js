import { Client, Account, ID } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aora_course",
  projectId: "670ece420030f8983ca3",
  databaseId: "670ff2440002cc498f8a",
  userCollectionId: "670ff2be00260bd623d8",
  videoCollectionId: "670ff344002056408dc6",
  storageId: "670ff83e00173f0817e1",
};
// Android SDK (Software Development Kit) представляет собой набор инструментов, которые служат для разработки, отладки, тестирования и написания программного кода с целью создания программного обеспечения для операционной системы Android. Этот пакет предназначен как для профессиональных разработчиков, так и для энтузиастов.

// import { Client, Account, ID } from "react-native-appwrite";

// const client = new Client()
//   .setProject("670ece420030f8983ca3")
//   .setPlatform("com.jsm.aora_course");

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
  
export const createUser = ()=> {
  // Register User
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
}



