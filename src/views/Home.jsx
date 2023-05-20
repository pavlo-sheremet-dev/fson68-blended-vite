import { CocktailsList } from "../components/CocktailsList";
import { Section } from "../components/Section";
import { Loader } from "../components/Loader";
import { useEffect, useState } from "react";
import { getTrendingCocktails } from "../api/cocktail-service";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export const Home = () => {
  const [cocktails, setCocktails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const asyncWrapper = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getTrendingCocktails({ signal: controller.signal });
        setCocktails(data);
      } catch (error) {
        if (axios.isCancel(error)) return;
        setError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrapper();
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <>
      <Section>
        <h1 className="text-center font-black text-gray-700 text-4xl mb-10">
          Trending cocktails
        </h1>

        <CocktailsList cocktails={cocktails} />
      </Section>
      {isLoading && <Loader />}
      <Toaster />
    </>
  );
};
