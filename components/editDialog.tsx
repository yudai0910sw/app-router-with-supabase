"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { updateTask } from "@/lib/data";

export default function EditDialog(props: {
  taskId: number,
  text: string,
}) {
  const { taskId, text: initialText } = props;
  const [text, setText] = useState(initialText);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await updateTask(taskId, text);
      toast.success("更新しました。");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-blue-500 mr-3">編集</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>タスクの編集</DialogTitle>
          <form className="space-y-4" onSubmit={onSubmit}>
            <Input
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <DialogClose asChild>
              <Button type="submit">更新</Button>
            </DialogClose>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
