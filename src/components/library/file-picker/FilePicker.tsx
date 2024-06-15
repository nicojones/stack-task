
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

export const FilePicker = (): JSX.Element => {
  return (
    <div className="grid place-content-center place-items-center">

      <Card className="w-[calc(100vw-4rem)] h-[calc(100vh-4rem]">
        <CardHeader>
          <CardTitle>Files</CardTitle>
          {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
        </CardHeader>
        <CardContent />
        {/* <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter> */}
      </Card>
    </div>
  );
};
