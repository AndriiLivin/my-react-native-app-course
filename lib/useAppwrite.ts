import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppwrite = (getFunc: any) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // т.к. нельзя использовать async внутри useEffect
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // получаем все сообщения в вертикальном положении
      // const response: any = await getAllPosts();
      const response = await getFunc();
      setData(response);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  // вызываем один раз в самом начале
  useEffect(() => {
    fetchData();
  }, []);
  // console.log(data);

  // делаем хук более мощным
  // второй раз вызываем данные
  // и будем вызывать всякий раз когда функция повторной выборки перестанет работать
  // как только подключим наше устройство оно будет обновлено
  const refetch = () => fetchData();
  return { data, isLoading, refetch  };
};
export default useAppwrite;
