import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreVertical, Download } from "lucide-react";
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

const getFileNameFromUrl = (url: string): string => {
  // Extract filename from URL
  const urlParts = url.split("/");
  let fileName = urlParts[urlParts.length - 1];

  // Remove query parameters if present
  if (fileName.includes("?")) {
    fileName = fileName.split("?")[0];
  }

  // If no extension is detected in the URL, try to determine from the content type
  if (!fileName.includes(".")) {
    // For Cloudinary URLs, we can check if it contains format indicators
    if (url.includes("/image/") || url.includes("/format=jpg")) {
      fileName += ".jpg";
    } else if (url.includes("/raw/") && url.includes("xlsx")) {
      fileName += ".xlsx";
    } else if (url.includes("/raw/") && url.includes("xls")) {
      fileName += ".xls";
    } else if (url.includes("/raw/") && url.includes("pdf")) {
      fileName += ".pdf";
    }
  }

  return fileName;
};

// Function to convert URLs in text to clickable links
const linkifyText = (text: string) => {
  // URL regex pattern
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  
  // Find all URLs in the text
  const matches = [...text.matchAll(urlRegex)];
  
  // If no URLs found, return the original text
  if (matches.length === 0) {
    return text;
  }
  
  // Track processed URLs to avoid duplicates
  const processedUrls = new Set();
  
  // Create result array
  const result = [];
  let lastIndex = 0;
  
  // Process each URL match
  matches.forEach((match) => {
    const url = match[0];
    const startIndex = match.index;
    
    // Skip if this exact URL has already been processed
    if (processedUrls.has(url)) {
      return;
    }
    
    // Add text before the URL
    if (startIndex > lastIndex) {
      result.push(text.substring(lastIndex, startIndex));
    }
    
    // Add the URL as a link
    result.push(
      <a 
        key={startIndex} 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline break-words"
      >
        {url}
      </a>
    );
    
    // Update lastIndex and mark URL as processed
    lastIndex = startIndex + url.length;
    processedUrls.add(url);
  });
  
  // Add any remaining text
  if (lastIndex < text.length) {
    result.push(text.substring(lastIndex));
  }
  
  return result;
};

const PostCard = ({ post }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { mutate: deletePost } = useDeletePost();
  const { user } = useAuth();

  const handleDelete = () => {
    deletePost(post._id, {
      onSuccess: () => {
        toast({ title: "Post deleted" });
        setShowDeleteAlert(false);
      },
      onError: (err) => {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      },
    });
  };

  const handleDownloadAndNavigate = async () => {
    try {
      setIsDownloading(true);
      // Fetch the file as a Blob
      const response = await fetch(post.file_url || post.attachment);
      const blob = await response.blob();

      // Create a blob URL and anchor to trigger download
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = post.file_name || getFileNameFromUrl(post.file_url || post.attachment);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      toast({
        title: "Download failed",
        description: "There was an error downloading the file",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
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
          {user?.role === "admin" && (
            <DropdownMenu>
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
            </DropdownMenu>
          )}
        </div>

        <div className="text-lg mb-3 text-left">
          {linkifyText(post.description)}
        </div>

        {(post.file_url || post.attachment) && (
          <div className="mt-4 flex justify-end">
            <Button 
              onClick={handleDownloadAndNavigate} 
              variant="outline" 
              size="sm"
              disabled={isDownloading}
              className="text-red-500 flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              {isDownloading ? "Downloading..." : "Download"}
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
