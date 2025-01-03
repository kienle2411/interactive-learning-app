"use client";
import React, { useRef, useState } from "react";
import { usePathname } from "next/navigation";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useClassById } from "@/hooks/useTeacherClasses";
import ThreeDotsWave from "@/components/ui/three-dot-wave";
import { LoadingButton } from "@/components/ui/loading-button";
import { useUploadFile } from "@/hooks/useDocfiles";
import { File, X } from "lucide-react";
import {
  useCreateMaterial,
  useTeacherMaterial_tanstack,
  useUpdateMaterial,
} from "@/hooks/useMaterials";
import { Material } from "@/types/material-response";

export default function MaterialTable() {
  const [open, setOpen] = useState(false);
  const [editMaterialOpen, setEditMaterialOpen] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState<Material | null>(null);

  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadFile, status } = useUploadFile({});

  const { classroom, isLoading, isError, refetch } = useClassById(id as string);
  // const { materials, loading, error, refetchMaterials } = useTeacherMaterial(id as string);
  const { materials, loading, error, refetchMaterials } =
    useTeacherMaterial_tanstack(id as string);

  const { mutate } = useUpdateMaterial(id);

  const { mutate: createMaterial } = useCreateMaterial(id as string, () => {
    setOpen(false);
    refetchMaterials();
  });

  if (isLoading) {
    return <ThreeDotsWave />;
  }

  if (isError) {
    return (
      <div>
        <p>Error loading class details</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  if (loading) {
    return <ThreeDotsWave />;
  }

  if (error) {
    return (
      <div>
        <p>Error loading class Materials</p>
        <button onClick={() => refetchMaterials()}>Retry</button>
      </div>
    );
  }

  if (!classroom) {
    return <div>No class details found.</div>;
  }

  const openEditDialog = (material: Material) => {
    setCurrentMaterial(material);
    setEditMaterialOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    if (link && !isValidUrl(link)) {
      alert("Invalid URL. Please enter a valid URL.");
      return;
    }
    try {
      await createMaterial({
        title,
        description,
        url: link || undefined,
        file: selectedFile || undefined,
      });
      setTitle("");
      setDescription("");
      setLink("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error creating material:", error);
    }
  };

  const handleUpdateMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMaterial) return;

    if (!currentMaterial.title.trim() || !currentMaterial.description.trim())
      return;

    if (currentMaterial.url && !isValidUrl(currentMaterial.url)) {
      alert("Invalid URL. Please enter a valid URL.");
      return;
    }

    try {
      await mutate(
        {
          id: currentMaterial.id,
          newMaterial: {
            title: currentMaterial.title,
            description: currentMaterial.description,
            url: currentMaterial.url || undefined,
          },
        },
        {
          onSuccess: () => {
            setEditMaterialOpen(false);
            setCurrentMaterial(null);
            setSelectedFile(null);
          },
          onError: (error) => {
            console.error("Failed to update material:", error);
          },
        }
      );
    } catch (error) {
      console.error("Error updating material:", error);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
    console.log("file: ", file);
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      console.log("upload");
      uploadFile(selectedFile);
    }
  };

  const handleClear = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.stopPropagation();
    setSelectedFile(null);
  };

  const isValidUrl = (url: string): boolean => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );

    return urlPattern.test(url);
  };

  return (
    <>
      <div className="col-span-2 flex justify-end pb-4 w-full">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Add new Material</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a new Material</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="materialName">Material Name</Label>
                  <Input
                    id="materialName"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter material's name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="materialDescription">
                    Material Description
                  </Label>
                  <Input
                    id="materialDescription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter material's description"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="materialLink">Material Link</Label>
                  <Input
                    id="materialLink"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Enter material's link"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="materialFile">Material File</Label>
                  <div
                    className="flex flex-col p-[20px] border-dashed border-2 border-gray-300 rounded-lg items-center space-y-2 cursor-pointer"
                    onClick={handleClick}
                  >
                    {selectedFile ? (
                      <div className="flex space-x-5">
                        <div className="text-muted-foreground">
                          {selectedFile.name}
                        </div>
                        <X
                          strokeWidth={1.5}
                          color="#737373"
                          onClick={handleClear}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <File color="#737373" />
                        <div className="text-muted-foreground">
                          Upload a file or drag and drop
                        </div>
                      </div>
                    )}
                    <Input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <LoadingButton
                      loading={status === "pending"}
                      onClick={handleUpload}
                    >
                      Upload
                    </LoadingButton>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={editMaterialOpen} onOpenChange={setEditMaterialOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Material</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateMaterial}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="materialName">Material Name</Label>
                <Input
                  id="materialName"
                  value={currentMaterial?.title || ""}
                  onChange={(e) =>
                    setCurrentMaterial({
                      ...currentMaterial!,
                      title: e.target.value,
                    })
                  }
                  placeholder="Enter material's name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="materialDescription">
                  Material Description
                </Label>
                <Input
                  id="materialDescription"
                  value={currentMaterial?.description || ""}
                  onChange={(e) =>
                    setCurrentMaterial({
                      ...currentMaterial!,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter material's description"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="materialLink">Material Link</Label>
                <Input
                  id="materialLink"
                  value={currentMaterial?.url || ""}
                  onChange={(e) =>
                    setCurrentMaterial({
                      ...currentMaterial!,
                      url: e.target.value,
                    })
                  }
                  placeholder="Enter material's link"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Table>
        <TableCaption>
          There are {materials.length} materials in {classroom.classroomName}{" "}
          class
        </TableCaption>
        <TableHeader className="bg-slate-200 text-lg">
          <TableRow>
            <TableCell className="text-center font-bold text-black">
              No.
            </TableCell>
            <TableCell className="text-center font-bold text-black">
              Material
            </TableCell>
            <TableCell className="text-center font-bold text-black">
              Description
            </TableCell>
            <TableCell className="text-center font-bold text-black">
              Link
            </TableCell>
            <TableCell className="text-center font-bold text-black">
              File
            </TableCell>
            <TableCell className="text-center font-bold text-black">
              Actions
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.map((mat, index) => (
            <TableRow key={mat.id}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="text-center">{mat.title}</TableCell>
              <TableCell className="text-center">{mat.description}</TableCell>
              {/* <TableCell className="text-center"><a href={mat.url} className="underline text-blue-700">{mat.url}</a></TableCell> */}
              <TableCell className="text-center">
                {mat.url && mat.url.trim() !== "" ? (
                  <a href={mat.url} className="underline text-blue-700">
                    {mat.url}
                  </a>
                ) : (
                  <p>-</p>
                )}
              </TableCell>
              <TableCell className="text-center">
                {mat.docFileId && mat.docFileId.trim() !== "" ? (
                  <a
                    className="underline text-blue-700"
                    href={`https://learn.kienle2411.id.vn/api/docfiles/${mat.docFileId}/download`}
                  >
                    {mat.title}
                  </a>
                ) : (
                  <p>-</p>
                )}
              </TableCell>
              <TableCell className="text-center">
                <Button
                  className="m-2"
                  variant="secondary"
                  onClick={() => openEditDialog(mat)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
