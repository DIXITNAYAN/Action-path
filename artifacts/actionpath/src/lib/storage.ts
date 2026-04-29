import { useState, useEffect } from "react";
import { UserProfile } from "@workspace/api-client-react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

export function useSavedActions() {
  const [saved, setSaved] = useLocalStorage<number[]>("actionpath.saved", []);
  
  const toggleSaved = (id: number) => {
    setSaved((prev) => 
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  
  return { saved, toggleSaved, isSaved: (id: number) => saved.includes(id) };
}

export function useCompletedActions() {
  const [completed, setCompleted] = useLocalStorage<number[]>("actionpath.completed", []);
  
  const toggleCompleted = (id: number) => {
    setCompleted((prev) => 
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  
  return { completed, toggleCompleted, isCompleted: (id: number) => completed.includes(id) };
}

export function useProfileStore() {
  return useLocalStorage<UserProfile | null>("actionpath.profile.v2", null);
}
