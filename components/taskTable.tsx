import { fetchTasks } from "@/lib/data";
import DeleteDialog from "./deleteDialog";
import EditDialog from "./editDialog";

export default async function TaskTable() {
  const tasks = await fetchTasks();
  return (
    <ul className="mt-4 divide-y divide-gray-200">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center justify-between py-2">
          <div>
            <p className="text-gray-600 break-all">
              {task.text}
            </p>
            <p className="text-xs text-gray-400">最終更新日時：{new Date(task.updated_at).toLocaleString("ja-JP")}</p>
          </div>
          <div className="flex items-center">
            <div className="mr-3">
              <DeleteDialog taskId={task.id} />
            </div>
            <EditDialog taskId={task.id} text={task.text} />
          </div>
        </li>
      ))}
    </ul>
  );
}
