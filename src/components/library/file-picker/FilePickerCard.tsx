"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { ComponentChildren } from "@/types";

interface FilePickerCardProps {
  header: string;
  description: string;
  children: ComponentChildren;
}

export const FilePickerCard = ({ header, description, children }: FilePickerCardProps): JSX.Element => {
  return (
    <Card className="w-[calc(100vw-4rem)] h-[calc(100vh-4rem]">
      <CardHeader>
        <CardTitle>{header}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {/* <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
          </CardFooter> */}
    </Card>
  );
};
