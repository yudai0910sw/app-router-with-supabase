import AddTaskForm from "@/components/AddTaskForm";
import TaskTableSkeleton from "@/components/skeletons";
import TaskTable from "@/components/taskTable";
import { Suspense } from 'react';
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button"

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const metadata = user?.user_metadata

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  }

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center mb-2">
          <h1 className="text-xl font-bold text-gray-800 mx-3">Todoリスト</h1>
          <form action={signOut} className="mx-3">
            <Button>Logout</Button>
          </form>
        </div>
        <div className="flex items-center">
          <p>{metadata?.firstName} {metadata?.lastName}</p>
          <p className="ml-3 mr-3">{user.email}</p>
        </div>
        <AddTaskForm />
        <Suspense fallback={<TaskTableSkeleton />}>
          <TaskTable />
        </Suspense>
      </div>
    </div>
  );
}
