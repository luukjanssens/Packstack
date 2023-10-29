import { useState } from "react"
import { Button, Input } from "@/components/ui"
import { InventoryTable } from "@/containers/Inventory/InventoryTable"
import { UpdateCategoryOrder } from "@/containers/UpdateCategoryOrder"
import { ItemForm } from "@/containers/ItemForm"
import { DialogTrigger } from "@/components/ui/Dialog"
import { useInventory } from "@/queries/item"
import { downloadInventory } from "@/lib/download"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { MoreHorizontal } from "lucide-react"

export const InventoryPage = () => {
  const { data: inventory } = useInventory()
  const [open, setOpen] = useState(false)
  const [openReorder, setOpenReorder] = useState(false)
  const [filter, setFilter] = useState("")
  return (
    <div className="px-4 py-2">
      <div className="flex justify-between mb-2">
        <Input
          placeholder="Search gear..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex justify-end items-center gap-2">
          <ItemForm
            title="New Item"
            open={open}
            onOpenChange={setOpen}
            onClose={() => setOpen(false)}
          >
            <DialogTrigger asChild>
              <Button>Add Gear</Button>
            </DialogTrigger>
          </ItemForm>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => downloadInventory(inventory)}>
                Export Items
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenReorder(true)}>
                Reorder Categories
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <UpdateCategoryOrder open={openReorder} onOpenChange={setOpenReorder} />
      <InventoryTable searchFilter={filter} />
    </div>
  )
}
