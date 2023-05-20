import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import { SearchForm } from "../components/SearchForm";
import { Section } from "../components/Section";
import { CocktailsList } from "../components/CocktailsList";
import { Loader } from "../components/Loader";

import { searchByName } from "../api/cocktail-service";

export const Cocktails = () => {
  const [cocktails, setCocktails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  useEffect(() => {
    if (!query) return;
    const controller = new AbortController();
    const asyncWrapper = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await searchByName({ query, signal: controller.signal });
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
  }, [query]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <>
      <Section>
        <h1 className="uppercase text-4xl text-gray-600 text-center">
          Search Cocktails
        </h1>

        <SearchForm />
        {!!cocktails.length && <CocktailsList cocktails={cocktails} />}
      </Section>
      {isLoading && <Loader />}
      <Toaster />
    </>
  );
};
