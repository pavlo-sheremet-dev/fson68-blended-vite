import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { Section } from "../components/Section";
import { Loader } from "../components/Loader";
import { GoBackBtn } from "../components/GoBackBtn";
import { CocktailInfo } from "../components/CocktailInfo";
import { routes } from "../routes";
import { getCocktailDetail } from "../api/cocktail-service";

export const CocktailDetail = () => {
  const { cocktailId } = useParams();
  const [cocktailDetail, setCocktailDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();

  useEffect(() => {
    if (!cocktailId) return;
    const controller = new AbortController();
    const asyncWrapper = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCocktailDetail({
          id: cocktailId,
          signal: controller.signal,
        });
        setCocktailDetail(data);
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
  }, [cocktailId]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <>
      <Section>
        <h1 className="uppercase text-4xl text-gray-600 text-center">
          CocktailDetail
        </h1>
        <GoBackBtn
          path={location.state?.from ?? { pathname: "/" + routes.COCKTAILS }}
        />
        {cocktailDetail && <CocktailInfo {...cocktailDetail} />}
      </Section>
      {isLoading && <Loader />}
      <Toaster />
    </>
  );
};
