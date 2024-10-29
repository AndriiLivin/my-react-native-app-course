import { useGlobalContext } from "@/context/GlobalProvider";
import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aora_course",
  projectId: "670ece420030f8983ca3",
  databaseId: "670ff2440002cc498f8a",
  userCollectionId: "670ff2be00260bd623d8",
  videoCollectionId: "670ff344002056408dc6",
  storageId: "670ff83e00173f0817e1",
};

// извлечем  данные из config
const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = appwriteConfig;

// Android SDK (Software Development Kit) представляет собой набор инструментов, которые служат для разработки, отладки, тестирования и написания программного кода с целью создания программного обеспечения для операционной системы Android. Этот пакет предназначен как для профессиональных разработчиков, так и для энтузиастов.

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error();

    // создаем фотографию профиля ?????
    // getInitials получает инициалы имени пользователя
    const avatarUrl = avatars.getInitials(username);

    await singIn(email, password);
    // как только войдем в систему можем создать этого пользователя
    // создаем экземпляр учетной записи newUser

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      // т.к. идентификатора документа еще нет
      ID.unique(),
      // создаем новый экземпляр пользователя
      {
        accountId: newAccount.$id,
        email,
        username,
        avatars: avatarUrl,
      }
    );
    // возвращаем нового пользователя

    return newUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

const deleteSession = async () => {
  try {
    const activeSessions = await account.listSessions();
    if (activeSessions.total > 0) {
      await account.deleteSession("current");
    }
    return account;
  } catch (error) {
    console.log("Нет доступных сеансов.");
  }
};

export const singIn = async (email: string, password: string) => {
  try {
    //   const currentSession = await account.getSession("current");

    // предварительно удаляем текущую
    // await account.deleteSession("current");
    await deleteSession();
    // создаем сеанс электронной почты
    // метод createEmailPasswordSession позволяет пользователю войти в свою учетную запись по email и password
    // предоставляется appwrite
    const session = await account.createEmailPasswordSession(email, password);

    // возвращаем сеанс
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const singOut = async () => {
  try {
    return deleteSession();
    // const session = await account.deleteSession("current");
    // // возвращаем завершенный сеанс
    // return session;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccaunt = await account.get();

    if (!currentAccaunt) throw Error;
    // если текущая уч запись есть, то получаем из баз данных

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      // проверяем что запрос соответствует действительности
      // точно определяем пользователя кот в данный момент вошел в систему
      [Query.equal("accountId", currentAccaunt.$id)]
    );

    if (!currentUser) throw Error;
    // т.к. нужен только один пользователь
    return currentUser.documents[0];
  } catch (error) {
    // записываем ошибку в журнал
    console.log(error);
  }
};

// Извлекаем все записи
export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      // теперь можно опустить appwriteConfig
      databaseId,
      videoCollectionId
    );
    return posts.documents;
  } catch (error) {
    throw new Error("AllPosts");
  }
};

// Извлекаем популярные
export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      // теперь можно опустить appwriteConfig
      databaseId,
      videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error("AllPosts");
  }
};

// поиск по сообщениям
export const searchPosts = async (query: any) => {
  try {
    // составьте список из базы данных,
    // укажите идентификатор базы и идентификатор коллекции данных,
    //  что мы собираемся получить
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      // выполнить поиск по названию и запрос в качестве фактического поискового запроса
      [Query.search("title", query)]
    );

    // это даст все сообщения, что соответствуют нашему запросу
    return posts.documents;
  } catch (error) {
    console.log("No No Videos Found");

    return [];
    // throw new Error("No No Videos Found");
  }
};

// поиск по сообщениям
export const getUserPosts = async (userId: any) => {
  // console.log(userId);

  try {
    // составьте список из базы данных,
    // укажите идентификатор базы и идентификатор коллекции данных,
    //  что мы собираемся получить
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      // выполнить поиск по названию и запрос в качестве фактического поискового запроса
      [Query.equal("creator", userId)]
    );

    // это даст все сообщения, что соответствуют нашему запросу
    return posts.documents;
  } catch (error) {
    console.log("No No Videos Found");

    return [];
    // throw new Error("No No Videos Found");
  }
};
