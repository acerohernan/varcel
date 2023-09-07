import { ImportRepositoryCardSkeleton } from "../components/import-repository/skeleton";

export const NewProjectPage = () => {
  return (
    <div className="relative">
      <div className="bg-white dark:bg-black absolute w-full top-0 h-[280px] z-0 border-b" />
      <div className="p-8 max-w-[1200px] mx-auto relative z-10">
        <h1 className="text-[2.5rem] leading-[2.8rem]">Let's build something new.</h1>
        <p className="text-muted-foreground mt-2 mb-12">
          To deploy a new Project, import an existing Git Repository or get started with one of our Templates.
        </p>
        {/* <ImportRepositoryCard /> */}
        <ImportRepositoryCardSkeleton />
      </div>
    </div>
  );
};
