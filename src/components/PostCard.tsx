import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
} from "./ui/alert-dialog";
import { useDeletePost } from "@/hooks/use-delete-post";
import EditPostModal from "./EditPostModal";
import DeleteAlertModal from "./DeleteAlertModal";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const PostCard = ({ post }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const { mutate: deletePost } = useDeletePost();
  const { user } = useAuth();

  const handleDelete = () => {
    deletePost(post._id, {
      onSuccess: () => {
        toast({ title: "Post deleted" });
        setShowDeleteAlert(false);
      },
      onError: (err) => {
        toast({ title: "Error", description: err.message, variant: "destructive" });
      },
    });
  };

  return (
    <Card
      key={post._id}
      className="overflow-hidden border-none shadow-sm relative"
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="text-sm text-muted-foreground mb-2">
            Posted on {formatDate(post.createdAt)}
          </div>

          {/* 3-dot dropdown */}
          {user?.role === 'admin' && <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-28">
              <DropdownMenuItem onClick={() => setShowEditModal(true)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowDeleteAlert(true)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>}
        </div>

        <p className="text-lg mb-3">{post.description}</p>

        {post.attachment && (
          <div className="mt-4 flex justify-end">
            <Button asChild variant="link" size="sm">
              <a
                href={post.attachment}
                target="_blank"
                rel="noopener noreferrer"
                download={post.file_name || true}
                className="text-red-500"
              >
                Download
              </a>
            </Button>
          </div>
        )}
      </CardContent>

      {/* Edit Modal */}
      {showEditModal && (
        <EditPostModal
          post={post}
          open={showEditModal}
          onOpenChange={setShowEditModal}
        />
      )}

      <DeleteAlertModal
        showDeleteAlert={showDeleteAlert}
        setShowDeleteAlert={setShowDeleteAlert}
        handleDelete={handleDelete}
      />
    </Card>
  );
};

export default PostCard;
