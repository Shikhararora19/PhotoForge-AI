import React, { useId } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'
import { deleteImages } from '@/app/actions/image-actions'
import { cn } from '@/lib/utils'



interface DeleteImageProps {
    imageId: string,
    onDelete?: () => void,
    className?: string,
    imageName: string
}


const DeleteImage = ({imageId, onDelete, className, imageName}: DeleteImageProps) => {

    const toastId = useId()

    const handleDelete = async () => {
        toast.loading('Deleting image...', {id: toastId})
        const {error,success} = await deleteImages(imageId, imageName)
        if (error){
            toast.error(error, {id: toastId})
            return
        }
        else if(success){
            toast.success('Image deleted successfully', {id: toastId})   
            onDelete?.()      
        }
        else{
            toast.dismiss(toastId)
        }


    }

  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
    <Button className={cn('w-fit', className)} variant={"destructive"}><Trash className='w-4 h-4'/>Delete</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This will permanently delete the image. This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction className='bg-destructive hover:bg-destructive/90'onClick={handleDelete}>Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default DeleteImage