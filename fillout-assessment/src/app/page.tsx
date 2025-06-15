import PageNavEditor from "@/app/components/PageNavEditor/PageNavEditor";

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-300">
      <div className="w-9/10 flex-none">
        <PageNavEditor />
      </div>
    </div>
  );
}
