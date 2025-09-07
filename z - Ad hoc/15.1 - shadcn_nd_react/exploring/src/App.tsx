import { Button } from "./components/ui/button"
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


import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"


function App() {
  return (
    <>
      <div className="text-red-500 text-center font-bold text-3xl">shadcn</div>
      <div className="dark">
        <h1>Buttons</h1>
        <Button className="bg-purple-400 hover:bg-purple-800">Click me!</Button>
        <Button variant="destructive">Click me!</Button>
        <Button variant="ghost">Click me!</Button>
        <Button variant="link">Click me!</Button>
      </div>

      <div>
        <h1>dailog</h1>
        <AlertDialog>
          <AlertDialogTrigger className="bg-rose-300 px-8 py-2 rounded-3xl outline-accent">Open</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="h-[50vh] bg-red-300">
        <ContextMenu >
          <ContextMenuTrigger className="h-full w-full block bg-red-500">Right click</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Profile</ContextMenuItem>
            <ContextMenuItem>Billing</ContextMenuItem>
            <ContextMenuItem>Team</ContextMenuItem>
            <ContextMenuItem>Subscription</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </>

  )


}

export default App