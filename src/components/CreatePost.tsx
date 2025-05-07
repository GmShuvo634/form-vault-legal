/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useCreatePost } from "@/hooks/use-create-post";
const CreatePost = () => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { user } = useAuth();
  const { mutate: createPost, isPending } = useCreatePost();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createPost(
      { description: description, attachment: file },
      {
        onSuccess: () => {
          setDescription("");
          setFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          toast({ title: "Post created successfully" });
        },
        onError: (err: any) => {
          toast({
            title: "Error submitting post",
            description: err.message || "Something went wrong",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter post description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Attachment (Optional)</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit Post"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
