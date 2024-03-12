import { supabase } from "../backend/supabaseClient";

import { useEffect, useState } from "react";

import type { Tables } from "../backend/types_supabase";

interface GetGroupsResponse {
  result: 1 | 0;
  data?: Groups;
}

export type Group = Tables<"groups">;
export type Groups = Group[];

// Хук useGroups() состоит из:
// 1. Переменные useState(): список загруженных групп, загрузка, ошибка
// 2. Функция getGroupsResponse(): загружает группы с сервера supabase, возвращает объект типа {result: 1 | 0; data?: Groups}
// 3. Хук useEffect(): вызывает функцию fetchData() с задержкой 1000мс, которая вызывает функцию getGroupsResponse(). Функций сделано две, потому что в GetGroupsResponse() сервер supabase возвращает данные не того типа, который указан в задании, и я дополнительно оборачиваю их в объект {result: 1 | 0; data?: Groups}
// Я оставил console.log() с загружаемыми с сервера данными, чтобы можно было проверить их соответствие заявленным в ../groups.json.

const useGroups = () => {
  const [groups, setGroups] = useState<Groups | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getGroupsResponse();
        const { result, data } = response;
        if (result === 1 && data) {
          console.log("fetched data:", response);
          setGroups(data);
          setError(undefined);
        }
      } catch (error) {
        console.error({ error });
      }
      setIsLoading(false);
    };

    if (!ignore) {
      setTimeout(() => fetchData(), 1000);
    }

    return () => {
      ignore = true;
    };
  }, []);

  async function getGroupsResponse(): Promise<GetGroupsResponse> {
    let result: GetGroupsResponse["result"],
      loadedData: GetGroupsResponse["data"];
    const { data, error } = await supabase.from("groups").select();
    if (error) {
      console.error({ error });
      setError(error.message);
      result = 0;
      loadedData = undefined;
    } else {
      result = 1;
      loadedData = data;
    }

    return { result, data: loadedData };
  }

  return [groups, isLoading, error] as const;
};

export default useGroups;
