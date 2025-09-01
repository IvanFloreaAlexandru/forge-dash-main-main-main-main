import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Cloud,
  FileText,
  FileImage,
  File,
  Upload,
  Download,
  Trash2,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface FileItem {
  id: string;
  name: string;
  size: string;
  type: string;
}

const getFileIcon = (type: string) => {
  if (type.includes("image")) return <FileImage className="h-5 w-5 text-blue-500" />;
  if (type.includes("pdf") || type.includes("text")) return <FileText className="h-5 w-5 text-red-500" />;
  return <File className="h-5 w-5 text-gray-500" />;
};

const FileManagement: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      const newFile: FileItem = {
        id: `file-${Date.now()}`,
        name: uploadedFile.name,
        size: `${(uploadedFile.size / 1024).toFixed(2)} KB`,
        type: uploadedFile.type,
      };
      setFiles([...files, newFile]);
      toast({
        title: "File Uploaded! 🚀",
        description: `"${newFile.name}" has been uploaded.`,
      });
    }
  };

  const handleDeleteFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
    toast({
      title: "File Deleted! 🗑️",
      description: `The file has been removed.`,
      variant: "destructive",
    });
  };

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 bg-gray-50 dark:bg-zinc-900 min-h-screen transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            File Management
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Upload and manage your team's files and documents.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="file-upload" className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", "bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 cursor-pointer")}>
            <Upload className="h-4 w-4 mr-2" /> Upload File
          </label>
          <Input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Files</CardTitle>
          <CardDescription>
            A list of all uploaded files.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">File Name</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.length > 0 ? (
                files.map(file => (
                  <TableRow key={file.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      {getFileIcon(file.type)}
                      {file.name}
                    </TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="mr-2">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-500" onClick={() => handleDeleteFile(file.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">No files uploaded yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileManagement;