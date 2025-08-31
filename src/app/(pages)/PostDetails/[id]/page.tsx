import SinglePost from "@/app/components/SinglePost/SinglePost";

type PageProps = {
  params: {
    id: string;
  };
};

export default function PostDetailsPage({ params }: PageProps) {
  return <SinglePost id={params.id} />;
}
