"use client";
import { insertTask } from "@/lib/data"
import { useState } from "react";
import { Input } from "./ui/input";
import { toast } from "sonner"

export default function AddTaskForm() {
  const [text, setText] = useState("");
  // TODO: Use useFormStatus from react-dom
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      await insertTask(text);
      setText("")
      toast.success("作成しました。")
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)
  }
  
  return (
    <form className="mt-4" onSubmit={onSubmit}>
      <Input type="text" placeholder="新しいタスクを入力してください" required value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit" disabled={isLoading} className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4 py-2">
        {isLoading ? '処理中...' : '追加'}
      </button>
    </form>
  )
}
