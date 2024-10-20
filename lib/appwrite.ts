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
    // console.log("создан акаунт");

    await singIn(email, password);
    // как только войдем в систему можем создать этого пользователя
    // создаем экземпляр учетной записи newUser
    console.log(await singIn(email, password));

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      // т.к. его еще нет
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
    console.log(newUser);

    return newUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const singIn = async (email: string, password: string) => {
  try {
    const currenSession = await account.getSession("current");
    console.log(currenSession);
    if (currenSession.current) {
      return currenSession;
    }
  } catch (error: any) {
    throw new Error(error);
  }

  try {
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

export const getCurrentUser = async () => {
  try {
    const currentAccaunt = await account.get();

    if (!currentAccaunt) throw Error;
    // если текущая уч запись есть, то удаляем из баз данных
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
