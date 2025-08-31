import SinglePost from "@/app/components/SinglePost/SinglePost";

type PageProps = {
  params : {
    id: string ;
  };
};

export default  async function Page({ params }:any) {
  const  { id } = params;
  return <SinglePost id={id} />;
}
