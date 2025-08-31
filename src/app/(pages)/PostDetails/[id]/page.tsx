import SinglePost from "@/app/components/SinglePost/SinglePost";

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  const { id } = params;
  return <SinglePost id={id} />;
}
