"use client";

import { insertTask } from "@/lib/data"
import { Input } from "./ui/input";
import { toast } from "sonner"
import { SubmitButton } from "@/app/login/submit-button";
import { useRef } from "react";

export default function AddTaskForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (formData: FormData) => {
    const error = await insertTask(formData);
    if (formRef.current) {
      formRef.current.reset();
    }
    if (error) {
      toast.error(`タスクの追加に失敗しました。 <br> エラーコード: ${error}`);
      return console.error("ErrorCode:", error);
    }
    toast.success("タスクを追加しました");
  }

  return (
    <form className="mt-4" ref={formRef}>
      <Input type="text" name="task" placeholder="新しいタスクを入力してください" required />
      <SubmitButton
        formAction={onSubmit}
        className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4 py-2"
        pendingText="作成中..."
      >
        追加
      </SubmitButton>
    </form>
  )
}
