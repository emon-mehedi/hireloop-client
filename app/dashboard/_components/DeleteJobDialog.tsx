'use client'
import { Trash2Icon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { JobRow } from "../recruiter/jobs/page"
import { deleteJob } from "@/lib/actions/jobs"
import { useState } from "react"

export function DeleteJobDialog({job}:{job:JobRow}){

  //close alert dialog after clicking delete
  const [open, setOpen]=useState(false);

  const handleDelete=async()=>{
    const res = await deleteJob(job._id);
    console.log("Deleting id:",job._id, res);
    if(res.deletedCount){
      setOpen(false)
    }
  }
return(
    //open trigger of alertdialog
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={<Button variant="destructive">
          <Trash2Icon/>
        </Button>}
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete job?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this job. View{" "}
            <a href="#">Settings</a> to delete any related data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}