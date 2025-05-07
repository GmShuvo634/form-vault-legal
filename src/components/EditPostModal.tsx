/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useUpdatePost } from "@/hooks/use-update-post";

interface EditPostModalProps {
  post: {
    _id: string;
    description: string;
    attachment?: string;
    file_name?: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditPostModal = ({ post, open, onOpenChange }: EditPostModalProps) => {
  const [description, setDescription] = useState(post.description);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { mutate: editPost, isPending } = useUpdatePost();

  useEffect(() => {
    if (open) {
      setDescription(post.description);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [open, post]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    editPost(
      { id: post._id, description, attachment: file },
      {
        onSuccess: () => {
          toast({ title: "Post updated successfully" });
          onOpenChange(false);
        },
        onError: (err: any) => {
          toast({
            title: "Error updating post",
            description: err.message || "Something went wrong",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="min-h-[140px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Update Attachment (Optional)</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            {post.file_name && !file && (
              <p className="text-sm text-muted-foreground">
                Current: {post.file_name}
              </p>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostModal;
