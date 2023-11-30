import { Button } from "@mui/material"

export const Notices = () => {
  return (
    <div className="flex flex-col w-full mt-4 space-y-2">
      <Button variant="contained" color="info" size="small">공지1</Button>
      <Button variant="contained" color="info" size="small">공지2</Button>
    </div>
  )
}