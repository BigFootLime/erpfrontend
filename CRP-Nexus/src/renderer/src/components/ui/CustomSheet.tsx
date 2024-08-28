import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../@/componentsui/ui/sheet";
import { Button } from "../../@/componentsui/ui/button";

interface CustomSheetProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  triggerLabel?: string;
  triggerVariant?: string;
  title?: string;
  description?: string;
  onSaveChanges?: () => void;
  size?: string;
  closeOnSave?: boolean;
  children?: React.ReactNode;
  backgroundColor?: string; // New prop for background color
  titleColor?: string; // New prop for title color
}

const CustomSheet: React.FC<CustomSheetProps> = ({
  defaultOpen = false,
  open,
  onOpenChange,
  modal = true,
  triggerLabel = "Open",
  triggerVariant = "outline",
  title = "Edit profile",
  description = "Make changes to your profile here. Click save when you're done.",
  onSaveChanges,
  size = "w-[50%]",
  closeOnSave = true,
  children,
  backgroundColor = "bg-neutral-50",
  titleColor = "text-black",
}) => {
  return (
    <Sheet
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      modal={modal}
    >
      <SheetTrigger asChild>
        <Button variant={triggerVariant}>{triggerLabel}</Button>
      </SheetTrigger>
      <SheetContent className={`${size} ${backgroundColor}`}>
        <SheetHeader>
          <SheetTitle className={`${titleColor}`}>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {/* Separator */}
        <div className="border-b border-neutral-300 my-4"></div>
        <div className="grid gap-4 py-4">{children}</div>
        <SheetFooter>
          {closeOnSave ? (
            <SheetClose asChild>
              <Button type="submit" onClick={onSaveChanges}>
                Save changes
              </Button>
            </SheetClose>
          ) : (
            <Button type="submit" onClick={onSaveChanges}>
              Save changes
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CustomSheet;
