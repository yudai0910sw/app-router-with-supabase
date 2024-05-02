"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { deleteTask } from "@/lib/data"
import { toast } from "sonner"

export default function DeleteDialog( props: {taskId: number} ) {
  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await deleteTask(props.taskId);
      toast.success("削除しました。")
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Dialog>
      <DialogTrigger><p className="text-red-500">削除</p></DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="mb-2">タスクを削除します。<br className="sm:hidden"></br>よろしいですか？</DialogTitle>
          <DialogDescription>
            <Button variant="destructive" onClick={onSubmit} type="submit">タスクを削除</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
