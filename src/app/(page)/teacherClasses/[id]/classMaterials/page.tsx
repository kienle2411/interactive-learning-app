// "use client";
// import React, { useState } from "react";
// import { usePathname } from "next/navigation";

// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@radix-ui/react-label";
// import { Input } from "@/components/ui/input";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { useClassById } from '@/hooks/useTeacherClasses';
// import ThreeDotsWave from "@/components/ui/three-dot-wave";

// export default function MaterialTable() {
//   const [open, setOpen] = useState(false);

//   const [editMaterialOpen, setEditMaterialOpen] = useState(false);
//   const [currentMaterial, setCurrentMaterial] = useState<{
//     id: string;
//     material: string;
//     link: string;
//   } | null>(null);

//   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
//   const [materialToDelete, setMaterialToDelete] = useState<string | null>(null);

//   const pathname = usePathname();
//   const id = pathname.split("/")[2]; // Assuming productId is always at the 3rd position

//   const [material, setMaterial] = useState("");
//   // const [Description, setDescription] = useState("");
//   const [link, setLink] = useState("");
//   // const [file, setFile] = useState("");

//   const [materials, setMaterials] = useState<
//     { id: string; material: string; link: string }[]
//   >([]);

//   const { classroom, isLoading, isError, error, refetch } = useClassById(id as string);


//   if (isLoading) {
//     // return <div>Loading class details...</div>;
//     return <ThreeDotsWave />;
//   }

//   if (isError) {
//     return (
//       <div>
//         <p>Error loading class details: {error?.message || "Unknown error"}</p>
//         <button onClick={() => refetch()}>Retry</button>
//       </div>
//     );
//   }

//   if (!classroom) {
//     return <div>No class details found.</div>;
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!material.trim()) return; // Prevent adding empty materials

//     // Validate link if it exists
//     if (link && !isValidUrl(link)) {
//       alert("Invalid URL. Please enter a valid URL.");
//       return;
//     }

//     const newMaterial = {
//       id: (materials.length + 1).toString(), // Sequential ID
//       material: material,
//       link: link,
//     };

//     setMaterials([...materials, newMaterial]);
//     setMaterial("");
//     setOpen(false);
//   };

//   const openEditGroupDialog = (mat: {
//     id: string;
//     material: string;
//     link: string;
//   }) => {
//     setCurrentMaterial(mat);
//     setEditMaterialOpen(true);
//   };

//   const handleUpdateGroup = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!currentMaterial) return;

//     // Validate link if it exists
//     if (currentMaterial.link && !isValidUrl(currentMaterial.link)) {
//       // Optional: You could use a toast or alert to show an error message
//       alert("Invalid URL. Please enter a valid web address.");
//       return;
//     }

//     setMaterials(
//       materials.map((std) =>
//         std.id === currentMaterial.id
//           ? {
//             ...std,
//             material: currentMaterial.material,
//             link: currentMaterial.link,
//           }
//           : std
//       )
//     );
//     setEditMaterialOpen(false);
//   };

//   const confirmDelete = (id: string) => {
//     setMaterialToDelete(id);
//     setDeleteConfirmOpen(true);
//   };

//   const handleDelete = () => {
//     if (materialToDelete) {
//       setMaterials(materials.filter((std) => std.id !== materialToDelete));
//       setDeleteConfirmOpen(false);
//       setMaterialToDelete(null);
//     }
//   };

//   //check valid link
//   const isValidUrl = (url: string): boolean => {
//     try {
//       // Regular expression for URL validation
//       const urlPattern = new RegExp(
//         "^(https?:\\/\\/)?" + // protocol
//         "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
//         "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
//         "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
//         "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
//         "(\\#[-a-z\\d_]*)?$",
//         "i" // fragment locator
//       );

//       return urlPattern.test(url);
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   };

//   return (
//     <>
//       <div className="col-span-2 flex justify-end pb-4 w-full">
//         <Dialog open={open} onOpenChange={setOpen}>
//           <DialogTrigger asChild>
//             <Button variant="default">Add new Material</Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[425px]">
//             <DialogHeader>
//               <DialogTitle>Add a new Material</DialogTitle>
//             </DialogHeader>
//             <form onSubmit={handleSubmit}>
//               <div className="grid gap-4 py-4">
//                 <div className="grid gap-2">
//                   <Label htmlFor="materialName">Material Name</Label>
//                   <Input
//                     id="materialName"
//                     value={material}
//                     onChange={(e) => setMaterial(e.target.value)}
//                     placeholder="Enter material's name"
//                     required
//                   />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="materialLink">Material Link</Label>
//                   <Input
//                     id="materialLink"
//                     value={link}
//                     onChange={(e) => setLink(e.target.value)}
//                     placeholder="Enter material's link"
//                     required
//                   />
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button type="submit">Create</Button>
//               </DialogFooter>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <Dialog open={editMaterialOpen} onOpenChange={setEditMaterialOpen}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Update Group</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleUpdateGroup}>
//             <div className="grid gap-4 py-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="group">Group</Label>
//                 <Input
//                   id="group"
//                   value={currentMaterial?.material || ""}
//                   onChange={(e) =>
//                     setCurrentMaterial({
//                       ...currentMaterial!,
//                       material: e.target.value || "null",
//                     })
//                   }
//                   placeholder="Enter new group"
//                   required
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="materialLink">Material Link</Label>
//                 <Input
//                   id="materialLink"
//                   value={currentMaterial?.link || ""}
//                   onChange={(e) =>
//                     setCurrentMaterial({
//                       ...currentMaterial!,
//                       link: e.target.value || "null",
//                     })
//                   }
//                   placeholder="Enter material's link"
//                   required
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               <Button type="submit">Update</Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* Delete Confirmation Alert Dialog */}
//       <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={handleDelete}>
//               Continue
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>

//       <Table>
//         <TableCaption>
//           There are {materials.length} materials in {classroom.classroomName} class
//         </TableCaption>
//         <TableHeader className="bg-slate-200 text-lg">
//           <TableRow>
//             <TableHead className="text-center font-bold text-black">
//               No.
//             </TableHead>
//             <TableHead className="text-center font-bold text-black">
//               Name
//             </TableHead>
//             <TableHead className="text-center font-bold text-black">
//               Description
//             </TableHead>
//             <TableHead className="text-center font-bold text-black">
//               Link
//             </TableHead>
//             <TableHead className="text-center font-bold text-black">
//               File
//             </TableHead>
//             <TableHead className="text-center font-bold text-black">
//               Action
//             </TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody className="text-base">
//           {materials.map((std) => (
//             <TableRow key={std.id}>
//               <TableCell className="text-center">{std.id}</TableCell>
//               <TableCell className="text-center">{std.material}</TableCell>
//               <TableCell className="text-center">
//                 <a href={std.link}>{std.link}</a>
//               </TableCell>
//               <TableCell className="text-center">
//                 <Button
//                   className="m-2"
//                   variant="secondary"
//                   size="sm"
//                   onClick={() => openEditGroupDialog(std)}
//                 >
//                   Update
//                 </Button>
//                 <Button
//                   variant="destructive"
//                   size="sm"
//                   onClick={() => confirmDelete(std.id)}
//                 >
//                   Delete
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </>
//   );
// }









"use client";
import React, { useRef, useState } from "react";
import { usePathname } from "next/navigation";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  // TableHead,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useClassById } from '@/hooks/useTeacherClasses';
import ThreeDotsWave from "@/components/ui/three-dot-wave";
import { LoadingButton } from "@/components/ui/loading-button";
import { useUploadFile } from "@/hooks/useDocfiles";
import { File, X } from "lucide-react";

interface Material {
  id: string;
  material: string;
  description: string;
  link: string;
  file: string;
}

export default function MaterialTable() {
  const [open, setOpen] = useState(false);
  const [editMaterialOpen, setEditMaterialOpen] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState<Material | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState<string | null>(null);

  const pathname = usePathname();
  const id = pathname.split("/")[2]; // Assuming productId is always at the 3rd position

  const [material, setMaterial] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState("");

  const [materials, setMaterials] = useState<Material[]>([]);

  const { classroom, isLoading, isError, error, refetch } = useClassById(id as string);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mutate: uploadFile, status } = useUploadFile();

  if (isLoading) {
    return <ThreeDotsWave />;
  }

  if (isError) {
    return (
      <div>
        <p>Error loading class details: {error?.message || "Unknown error"}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  if (!classroom) {
    return <div>No class details found.</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!material.trim() || !description.trim()) return;

    if (link == "") {

    } else {
      if (!isValidUrl(link)) {
        alert("Invalid URL. Please enter a valid URL.");
        return;
      }
    }

    const newMaterial: Material = {
      id: (materials.length + 1).toString(),
      material,
      description,
      link,
      file,
    };

    setMaterials([...materials, newMaterial]);
    setMaterial("");
    setDescription("");
    setLink("");
    setFile("");
    setOpen(false);
    setSelectedFile(null);
  };

  const openEditGroupDialog = (mat: Material) => {
    setCurrentMaterial(mat);
    setEditMaterialOpen(true);
  };

  const handleUpdateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMaterial) return;

    if (currentMaterial.link && !isValidUrl(currentMaterial.link)) {
      alert("Invalid URL. Please enter a valid web address.");
      return;
    }

    setMaterials(
      materials.map((mat) =>
        mat.id === currentMaterial.id
          ? {
            ...currentMaterial,
          }
          : mat
      )
    );
    setEditMaterialOpen(false);
  };

  const confirmDelete = (id: string) => {
    setMaterialToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = () => {
    if (materialToDelete) {
      setMaterials(materials.filter((mat) => mat.id !== materialToDelete));
      setDeleteConfirmOpen(false);
      setMaterialToDelete(null);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFile(file.name);
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
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    placeholder="Enter material's name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="materialDescription">Material Description</Label>
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
                        <div className="text-muted-foreground">{selectedFile.name}</div>
                        <X strokeWidth={1.5} color="#737373" onClick={handleClear} />
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
                    <LoadingButton loading={status === "pending"} onClick={handleUpload}>
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
          <form onSubmit={handleUpdateGroup}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="materialName">Material Name</Label>
                <Input
                  id="materialName"
                  value={currentMaterial?.material || ""}
                  onChange={(e) =>
                    setCurrentMaterial({
                      ...currentMaterial!,
                      material: e.target.value,
                    })
                  }
                  placeholder="Enter material's name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="materialDescription">Material Description</Label>
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
                  value={currentMaterial?.link || ""}
                  onChange={(e) =>
                    setCurrentMaterial({
                      ...currentMaterial!,
                      link: e.target.value,
                    })
                  }
                  placeholder="Enter material's link"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="materialFile">Material File</Label>
                <div
                  className="flex flex-col p-[20px] border-dashed border-2 border-gray-300 rounded-lg items-center space-y-2 cursor-pointer"
                  onClick={handleClick}
                >
                  {currentMaterial?.file ? (
                    <div className="flex space-x-5">
                      <div className="text-muted-foreground">{currentMaterial?.file}</div>
                      <X strokeWidth={1.5} color="#737373" onClick={handleClear} />
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
                    onChange={(e) =>
                      setCurrentMaterial({
                        ...currentMaterial!,
                        file: e.target.value,
                      })
                    }
                    className="hidden"
                  />
                  <LoadingButton loading={status === "pending"} onClick={handleUpload}>
                    Upload
                  </LoadingButton>
                </div>
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
          There are {materials.length} materials in {classroom.classroomName} class
        </TableCaption>
        <TableHeader className="bg-slate-200 text-lg">
          <TableRow>
            <TableCell className="text-center font-bold text-black">ID</TableCell>
            <TableCell className="text-center font-bold text-black">Material</TableCell>
            <TableCell className="text-center font-bold text-black">Description</TableCell>
            <TableCell className="text-center font-bold text-black">Link</TableCell>
            <TableCell className="text-center font-bold text-black">File</TableCell>
            <TableCell className="text-center font-bold text-black">Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.map((mat) => (
            <TableRow key={mat.id}>
              <TableCell className="text-center">{mat.id}</TableCell>
              <TableCell className="text-center">{mat.material}</TableCell>
              <TableCell className="text-center">{mat.description}</TableCell>
              <TableCell className="text-center"><a href={mat.link} className="underline text-blue-700">{mat.link}</a></TableCell>
              <TableCell className="text-center">{mat.file}</TableCell>
              <TableCell className="text-center">
                <Button className="m-2" variant="secondary" onClick={() => openEditGroupDialog(mat)}>Edit</Button>
                <Button variant="destructive" onClick={() => confirmDelete(mat.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Material</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this material? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>

            <AlertDialogCancel onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}





