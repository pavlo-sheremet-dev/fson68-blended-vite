import { Comments, Hero, Section } from "../components";
import { useGetCommentsQuery } from "../redux/commentApi";

export const Home = () => {
  const { data } = useGetCommentsQuery();

  return (
    <>
      <Section>
        <Hero
          title="What people are saying."
          subtitle="Feedback from our customers."
        />
        {data && <Comments comments={data} />}
      </Section>
    </>
  );
};
