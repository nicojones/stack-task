"use client";

import { Cross1Icon } from "@radix-ui/react-icons";

import { Button, Card, CardContent, CardFooter, CardHeader } from "@/components/ui";
import { loadingMask } from "@/functions";
import { cn } from "@/lib/utils";
import { ComponentChildren } from "@/types";

interface FilePickerCardProps {
  header: ComponentChildren;
  description: ComponentChildren;
  cardHeader?: ComponentChildren;
  children: ComponentChildren;
  footer?: ComponentChildren;

  /**
   * Set to `true` if the card is in a loading, non-interactive state
   */
  loading?: boolean;

  /**
   * A (X) button will be shown if this is defined
   */
  onClose?: () => any;
}

export const FilePickerCard = ({
  header,
  description,
  children,
  cardHeader,
  onClose,
  loading,
  footer,
}: FilePickerCardProps): JSX.Element => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-3">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">{header}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
      <Card className={cn(
        "h-[calc(100vh-4rem] w-full relative",
        { "pt-10": !cardHeader },
        loadingMask(loading, false),
      )}
      >
        {
          onClose &&
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            className="absolute right-2 top-2"
          >
            <Cross1Icon />
          </Button>
        }
        {
          cardHeader &&
          <CardHeader>
            {cardHeader}
          </CardHeader>
        }
        <CardContent>
          {children}
        </CardContent>
        {
          footer &&
          <CardFooter className="flex justify-between">
            {footer}
          </CardFooter>
        }
      </Card>
    </div>
  );
};
