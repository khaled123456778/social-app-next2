import SinglePost from "@/app/components/SinglePost/SinglePost";

type PageProps = {
  params : {
    id: string ;
  };
};

export default  async function Page({ params }: PageProps) {
  const  { id } = params;
  return <SinglePost id={id} />;
}
