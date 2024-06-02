import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  const { userId } = auth();

  if (!userId) {
    console.error("User ID not found in auth context");
    redirect("/sign-in");
    return;
  }

  const transformation = transformationTypes[type];

  let user;
  try {
    user = await getUserById(userId);
    if (!user) {
      console.error(`User not found for ID: ${userId}`);
      redirect("/sign-in");
      return;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    redirect("/sign-in");
    return;
  }

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;
