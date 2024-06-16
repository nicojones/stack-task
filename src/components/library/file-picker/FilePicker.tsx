"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { SelectedFilesWrapper } from "@/context";

import { FilePickerFiles } from "./FilePickerFiles";

export const FilePicker = (): JSX.Element => {
  return (
    <SelectedFilesWrapper>
      <div className="grid place-content-center place-items-center">
        <Card className="w-[calc(100vw-4rem)] h-[calc(100vh-4rem]">
          <CardHeader>
            <CardTitle>Files</CardTitle>
            <CardDescription>Index and de-index files in the Knowledge Base</CardDescription>
          </CardHeader>
          <CardContent>
            <FilePickerFiles />
          </CardContent>
          {/* <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
          </CardFooter> */}
        </Card>
      </div>
    </SelectedFilesWrapper>
  );
};
